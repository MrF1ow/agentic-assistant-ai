import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { authConfig } from "@/config/amplify-cognito-config";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session || !session.tokens) {
          return null;
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        user.isAdmin = Boolean(
          Array.isArray(groups) && groups.includes("Admin")
        );

        return user;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
}
