import {
  Runtime,
  Code,
  Function,
  StartingPosition,
} from "aws-cdk-lib/aws-lambda";
import { IRole } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { Duration } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

/*
 * Lambda class
 * @class
 * @classdesc This class extends the Function class from the aws-cdk-lib/aws-lambda module
 * */
export class Lambda extends NodejsFunction {
  /*
   * Lambda constructor
   * @constructor
   * @param scope - The scope of the construct
   * @param id - The id of the construct
   * @param functionName - The name of the function
   * @param role - The role of the function
   * */
  constructor(scope: Construct, id: string, functionName: string, role: IRole) {
    let lambdaProps: any = {
      runtime: Runtime.NODEJS_20_X,
      handler: `${functionName}.handler`,
      entry: `lambda/${functionName}.ts`,
      code: Code.fromAsset("lambda"),
      functionName: functionName,
      role: role,
      timeout: Duration.seconds(60),
      bundling: {
        minify: true,
        target: "node20",
        nodeModules: ["aws-sdk"],
        externalModules: [],
      },
    };

    super(scope, id, lambdaProps);
  }
}
