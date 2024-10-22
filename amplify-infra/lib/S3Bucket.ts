import { Bucket, BucketProps, HttpMethods } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";

export class S3Bucket extends Bucket {

    /*
    * S3Bucket constructor
    * @constructor
    * @param scope - The scope of the construct
    * @param id - The id of the construct
    * @param props - The properties of the bucket
    * */
    constructor(scope: Construct, id: string, props?: BucketProps) {
        super(scope, id, props);
    }
}

/*
potential props for S3Bucket:

      bucketName: props?.bucketName || "bucket-name",
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      cors: [
        {
          allowedOrigins: ["http://localhost:3000"],
          allowedMethods: [
            HttpMethods.GET,
            HttpMethods.POST,
            HttpMethods.PUT,
            HttpMethods.DELETE,
          ],
          allowedHeaders: ["*"],
        },
      ]
*/