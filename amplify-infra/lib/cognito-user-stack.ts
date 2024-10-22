import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class CognitoUserStack extends cdk.Stack {
    // declare the user pool and user pool client as public readonly properties
    public readonly userPool: cognito.UserPool;
    public readonly userPoolClient: cognito.UserPoolClient;

    /*
    * CognitoUserStack constructor
    * @constructor
    * @param scope - The scope of the construct
    * @param id - The id of the construct
    * @param props - The stack properties
    * */
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.userPool = new cognito.UserPool(this, 'user-pool', {
            userPoolName: 'agentic-ai-user-pool',
            // email is the only sign-in method for now
            signInAliases: { email: true },
            selfSignUpEnabled: true,
            autoVerify: { email: true },

            // verification email settings
            userVerification: {
                emailSubject: "Verify your email for our Agentic AI App!",
                emailBody: "Thanks for signing up to our Agentic AI App! Your verification code is {####}",
                emailStyle: cognito.VerificationEmailStyle.CODE,
            },
            // these attributes are required for sign-up
            standardAttributes: {
                familyName: {
                    required: true,
                    mutable: false,
                }
            },
            // these attributes are created by the app
            customAttributes: {
                'createdAt': new cognito.DateTimeAttribute(),
                'userID': new cognito.NumberAttribute({
                    min: 1,
                    max: 10000,
                    mutable: false,
                }),
                // 'userType': maybe add this later (different roles and such for users)
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: true,
                requireUppercase: true,
                requireDigits: true,
                requireSymbols: true,
            },
            accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        this.userPoolClient = this.userPool.addClient('user-pool-app-client', {
            userPoolClientName: 'agentic-ai-user-pool-client',
            generateSecret: false,
            authFlows: {
                userPassword: true,
            },
        });

        new cdk.CfnOutput(this, 'UserPoolId', {
            value: this.userPool.userPoolId,
            exportName: 'UserPoolId',
        });

        new cdk.CfnOutput(this, 'UserPoolClientId', {
            value: this.userPoolClient.userPoolClientId,
            exportName: 'UserPoolClientId',
        });
    }
}