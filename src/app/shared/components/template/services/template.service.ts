import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { GLOBAL, PLHDataService } from "src/app/shared/services/data/data.service";
import { DbService, IFlowEvent } from "src/app/shared/services/db/db.service";
import { FlowTypes } from "scripts/types";
import { booleanStringToBoolean, getNestedProperty } from "src/app/shared/utils";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  globals = {};
  private themeValue = new BehaviorSubject("passive");
  currentTheme = this.themeValue.asObservable();
  constructor(
    private localStorageService: LocalStorageService,
    private dataService: PLHDataService,
    private dbService: DbService
  ) {
    this.initialiseGlobals();
  }

  initialiseGlobals() {
    GLOBAL.forEach((flow) => {
      flow.rows?.forEach((row) => {
        if (row.type === "declare_field_default") {
          if (this.localStorageService.getString("rp-contact-field." + row.name) === null) {
            this.setField(row.name, row.value);
          }
        } else {
          this.setGlobal(row.name, row.value);
        }
      });
    });
  }

  /**
   * Retrieve fields from localstorage. These are automatically prefixed with 'rp-contact-field'
   * and will be returned as string or boolean
   */
  getField(key: string) {
    let val: any = this.localStorageService.getString("rp-contact-field." + key);
    // provide a fallback if the target variable does not exist in local storage
    if (val === null) {
      console.warn("field value not found for key:", key);
      val = undefined;
    }
    // convert boolean strings if required
    val = booleanStringToBoolean(val);
    // console.log("[Field Retrieved]", key, val);
    return val;
  }

  /**
   * Store a contact field in localstorage and create a backup also in the database
   *
   * @remark whilst writing to the db is an async event, the data will be immediately
   * available in local storage so does not require await for further processing
   * */
  setField(key: string, value: string) {
    if (typeof value === "object") {
      console.warn("Warning - expected string field but received", { key, value });
      try {
        value = JSON.stringify(value);
      } catch (error) {
        console.warn("string conversion failed", error);
      }
    }
    // write to local storage
    this.localStorageService.setString("rp-contact-field." + key, value);

    // write to db
    const evt: IFlowEvent = {
      ...this.dbService.generateDBMeta(),
      event: "set",
      value,
      name: key,
      type: "contact_field" as any,
    };
    return this.dbService.table("data_events").add(evt);
  }

  getGlobal(key: string): string {
    let val = this.globals[key];
    // provide a fallback if the target global variable has never been set
    if (!this.globals.hasOwnProperty(key)) {
      console.warn("global value not found for key:", key);
      val = undefined;
    }
    return val;
  }

  setGlobal(key: string, value: string) {
    this.globals[key] = value;
  }

  /** Get the value of a data_list item as defined within templates */
  getDataListByPath(path: string) {
    const data = getNestedProperty(this.dataService.dataLists, path);
    return data;
  }

  /** Record a template event to the database */
  recordEvent(template: FlowTypes.Template, event: "emit", value: any) {
    const { flow_name, db_ignore_events } = template;
    if (!db_ignore_events) {
      const evt: IFlowEvent = {
        ...this.dbService.generateDBMeta(),
        event,
        name: flow_name,
        type: "template",
        value,
      };
      return this.dbService.table("flow_events").add(evt);
    }
  }

  setTheme(template: FlowTypes.Template, event: "set_theme", value: any) {
    if (value && value.length) {
      const mainBgBodyColor = `var(--${
        value[0] === "active" ? "ion-main-bg-active" : "ion-main-bg-passive"
      })`;
      const dgBodyColor = `var(--${
        value[0] === "active" ? "ion-banner-secondary" : "ion-banner-primary"
      })`;
      document.body.style.setProperty("--ion-dg-bg-default", dgBodyColor);
      document.body.style.setProperty("--ion-background-color", mainBgBodyColor);
      this.themeValue.next(value[0]);
    }
  }
}
