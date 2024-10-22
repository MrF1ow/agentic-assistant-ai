import { AttributeType, StreamViewType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";

/*
 * Dynamo class
 * @class
 * @classdesc This class extends the Table class from the aws-cdk-lib/aws-dynamodb module
 * */
export class Dynamo extends Table {

    /*
    * Dynamo constructor
    * @constructor
    * @param scope - The scope of the construct
    * @param id - The id of the construct
    * @param tableName - The name of the table
    * @param name - The name of the partition key
    * */
  constructor(scope: Construct, id: string, tableName: string, name: string) {
    super(scope, id, {
      tableName: tableName,
      partitionKey: { name: name, type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
    });
  }
}
