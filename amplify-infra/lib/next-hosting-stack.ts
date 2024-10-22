import { CfnOutput, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import {
  App,
  GitHubSourceCodeProvider,
  RedirectStatus,
} from "@aws-cdk/aws-amplify-alpha";
import { CfnApp } from "aws-cdk-lib/aws-amplify";

interface HostingStackProps extends StackProps {
  readonly owner: string;
  readonly repository: string;
  readonly githubOAuthToken: string;
  readonly environmentVariables: { [key: string]: string };
}

// resource: https://aws.amazon.com/blogs/mobile/deploy-a-nextjs-13-application-to-amplify-with-the-aws-cdk/

export class NextHostingStack extends Stack {
  constructor(scope: Construct, id: string, props: HostingStackProps) {
    super(scope, id, props);
    const amplifyApp = new App(this, "ProductViewer", {
      appName: "AgenticApp",
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: props.owner,
        repository: props.repository,
        oauthToken: SecretValue.secretsManager(props.githubOAuthToken),
      }),
      autoBranchDeletion: true,
      customRules: [
        {
          source: "/<*>",
          target: "	/index.html",
          status: RedirectStatus.NOT_FOUND_REWRITE,
        },
      ],
      environmentVariables: props.environmentVariables,
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: ["cd frontend", "npm ci"],
            },
            build: {
              commands: ["npm run build"],
            },
          },
          artifacts: {
            baseDirectory: "frontend/.next",
            files: ["**/*"],
          },
          cache: {
            paths: ["frontend/node_modules/**/*"],
          },
        },
      }),
    });

    amplifyApp.addBranch("main", {
      stage: "DEVELOPMENT",
    });

    // drop down to L1 to allow new NextJS architecture
    const cfnAmplifyApp = amplifyApp.node.defaultChild as CfnApp;
    cfnAmplifyApp.platform = "WEB_COMPUTE";

    new CfnOutput(this, "appId", {
      value: amplifyApp.appId,
    });
  }
}
