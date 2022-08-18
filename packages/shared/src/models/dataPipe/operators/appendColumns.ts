import { DataFrame, toJSON } from "danfojs";
import { AppStringEvaluator } from "../../appStringEvaluator/appStringEvaluator";
import BaseOperator from "./base";

interface IParsedArg {
  key: string;
  valueExpression: string;
}

class AppendColumnsOperator extends BaseOperator {
  public args: IParsedArg[];
  constructor(df: DataFrame, args: any) {
    super(df, args);
  }
  // args are simply evaluated as JS statements and do not require additional parsing
  parseArg(arg: string): IParsedArg {
    const [key, valueExpression] = arg.split(":").map((a) => a.trim());
    return { key, valueExpression };
  }
  validateArg(arg: IParsedArg): boolean {
    return arg.key && arg.valueExpression !== undefined;
  }
  apply() {
    const evaluator = new AppStringEvaluator();
    for (const { key, valueExpression } of this.args) {
      const rows = toJSON(this.df) as any[];
      const appendValues = rows.map((row) => {
        evaluator.setExecutionContext({ row });
        const evaluated = evaluator.evaluate(valueExpression);
        return evaluated;
      });
      this.df.addColumn(key, appendValues, { inplace: true });
    }
    return this.df;
  }
}
export default AppendColumnsOperator;
