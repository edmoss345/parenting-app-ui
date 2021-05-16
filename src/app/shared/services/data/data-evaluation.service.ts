import { Injectable } from "@angular/core";
import { differenceInHours } from "date-fns";
import { FlowTypes } from "src/app/shared/model";
import { arrayToHashmapArray } from "../../utils";
import { AppEventService } from "../app-events/app-events.service";
import { DbService, IDBTable } from "../db/db.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = true;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

@Injectable({ providedIn: "root" })
export class DataEvaluationService {
  public data: ICacheData;
  constructor(private dbService: DbService, private appEventService: AppEventService) {
    this.init();
  }

  private async init() {
    await this.refreshDBCache();
  }

  /**
   * load all the data that will be required for processing conditions
   * TODO - CC 2021-05-16 - should re-evaluate whether this is still required or could be passed to
   * db service itself
   * */
  public async refreshDBCache() {
    await this.appEventService.ready();
    const taskActions = await this.dbService.table("task_actions").orderBy("_created").toArray();
    // get event histories
    const task_actions = arrayToHashmapArray(taskActions, "task_id");
    const appEvents = await this.dbService.table("app_events").orderBy("_created").toArray();
    const app_events = arrayToHashmapArray(appEvents, "event_id");
    const dataEvents = await this.dbService.table("data_events").orderBy("_created").toArray();
    const data_events = arrayToHashmapArray(dataEvents, "name");
    const app_day = this.appEventService.summary.app_day;
    // TODO - add db bindings for reminder_events
    const reminder_events = {};
    this.data = { app_day, dbCache: { task_actions, app_events, reminder_events, data_events } };
  }

  /**
   *
   *
   * TODO - ideally these should be merged with template condition evaluation
   */
  public async evaluateReminderCondition(
    condition: FlowTypes.DataEvaluationCondition
  ): Promise<boolean> {
    const { condition_type, condition_args } = condition;
    const evaluators: {
      [key in FlowTypes.DataEvaluationCondition["condition_type"]]: () => boolean | undefined;
    } = {
      db_lookup: () => this.processDBLookupCondition(condition),
      field_evaluation: () => this.processFieldEvaluationCondition(condition_args.field_evaluation),
    };
    return evaluators[condition_type]();
  }

  private processDBLookupCondition(condition: FlowTypes.DataEvaluationCondition) {
    const { table_id, filter, evaluate, order } = condition.condition_args.db_lookup;
    if (!this.data.dbCache.hasOwnProperty(table_id)) {
      console.error(
        `[${table_id}] has not been included in reminders.service lookup condition`,
        condition
      );
      return undefined;
    }
    // the action history is already organised by filter field (e.g. event_id, task_id etc.), so select child collection (if entries exist)
    if (!this.data.dbCache[table_id][filter.field]) {
      return false;
    }
    const results = this.data.dbCache[table_id][filter.field];
    // TODO - assumes filtering on 'value' field - may want way to specify which field to compare
    let filteredResults = results.filter((res) => res.value === filter.value);
    // TODO - assumes standard sort order fine, - may need in future (e.g. by _created)
    if (order === "asc") {
      filteredResults = filteredResults.reverse();
    }
    log("process db condition", { filteredResults, evaluate, results, filter, table_id });
    if (evaluate) {
      // TODO - Assumes all evaluations are based on creation date, possible future syntax to allow more options
      const evaulateValue = filteredResults[0]?._created;
      return this.evaluateDBLookupCondition(evaulateValue, evaluate);
    }
    // default - return if entries exist
    return true;
  }

  private evaluateDBLookupCondition(
    evaluateValue: string | number,
    evaluate: FlowTypes.DataEvaluationCondition["condition_args"]["db_lookup"]["evaluate"]
  ) {
    const { operator, value, unit } = evaluate;
    let result = false;
    switch (unit) {
      case "day":
        const dayDiff = differenceInHours(new Date(), new Date(evaluateValue)) / 24;
        result = this._compare(dayDiff, operator, value);
        break;
      case "app_day":
        const appDayToday = this.data.app_day;
        const appDayDiff = appDayToday - (evaluateValue as number);
        result = this._compare(appDayDiff, operator, value);
        break;
      default:
        console.error("No evaluation function for unit:", unit);
    }
    log("evaluate", { evaluateValue, evaluate, result });
    return result;
  }

  processFieldEvaluationCondition(
    args: FlowTypes.DataEvaluationCondition["condition_args"]["field_evaluation"]
  ) {
    console.error("Field evaluation not currently implemented");
    return undefined;
  }

  /** As comparison functions are generated as string parse the relevant cases and evaluate */
  private _compare(
    a: string | number,
    operator: FlowTypes.DataEvaluationCondition["condition_args"]["db_lookup"]["evaluate"]["operator"],
    b: string | number
  ) {
    switch (operator) {
      case ">":
        return a > b;
      case "<=":
        return a <= b;
      default:
        console.error("operator not included:", operator);
        break;
    }
  }
}

interface ICacheData {
  app_day: number;
  /** As database lookups are async and inefficient, store key results in memory (keyed by target field) */
  dbCache: { [table_id in IDBTable]?: { [filter_id: string]: any[] } };
  // taskdbCache: { [action_id: string]: ITaskAction[] };
  // appEventHistory: { [event_id in IAppEvent["event_id"]]?: IAppEvent[] };
  // reminderHistory: { [reminder_id: string]: IReminder[] };
}
