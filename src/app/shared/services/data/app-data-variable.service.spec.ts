import { TestBed } from "@angular/core/testing";

import { AppDataVariableService } from "./app-data-variable.service";
import { DbService } from "../db/db.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AppDataHandlerBase } from "./variable-handlers";
import { MockDbService } from "../db/db.service.spec";
import { MockLocalStorageService } from "../local-storage/local-storage.service.spec";

class MockHandler extends AppDataHandlerBase {
  constructor() {
    super("mock" as any);
  }
}

const fieldHandler = new MockHandler();

const MockHandlers: AppDataVariableService["handlers"] = {
  field: fieldHandler,
  fields: fieldHandler,
};

/** Mock calls for sheets from the appData service to return test data */
export class MockAppDataVariableService implements Partial<AppDataVariableService> {}

describe("AppDataVariableService", () => {
  let service: AppDataVariableService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DbService, useValue: new MockDbService() },
        { provide: LocalStorageService, useValue: new MockLocalStorageService() },
      ],
    });

    service = TestBed.inject(AppDataVariableService);
    TestBed.inject(AppDataVariableService);
    await service.ready();
    service.handlers = MockHandlers;
  });

  it("@field - set and get", async () => {
    await service.set("field", "test_field_1", "value_test_field_1");
    const fieldValue = await service.get("field", "test_field_1");
    expect(fieldValue).toEqual("value_test_field_1");
  });
  it("@fields - use interoperably with @field", async () => {
    await service.set("fields", "test_field_2", "value_test_fields_2");
    const fieldValue = await service.get("field", "test_field_2");
    expect(fieldValue).toEqual("value_test_fields_2");
  });

  it("parses expressions", async () => {
    await service.set("field", "expression_field_1", "value_expression_field_1");
    const evaluated = await service.parseExpression("hello @field.expression_field_1");
    expect(evaluated).toEqual("hello value_expression_field_1");
  });

  it("evaluates expressions", async () => {
    await service.set("field", "test_value", "2");
    const evaluated = await service.evaluateExpression("@field.test_value < 3");
    expect(evaluated).toEqual(true);
  });

  //   TODO - requires mock error logger pending refactor in open #2019

  // it("logs error on unknown prefix", async () => {
  //   await service.set("unkown" as any, "test", "value_1");
  //   expect(true).toEqual(false);
  // });
});
