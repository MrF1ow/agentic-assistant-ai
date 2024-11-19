import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { authConfig } from "@/config/amplify-cognito-config";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

function hasCircularReference(obj: any) {
  try {
    JSON.stringify(obj);
    return false;
  } catch (e) {
    return true;
  }
}

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        // Get the current session
        const session = await fetchAuthSession(contextSpec);

        if (hasCircularReference(session)) {
          console.log("Session object has a circular reference.");
        }

        console.log(`sesssion: \n${session}`);

        // If there is no session or tokens, return null
        if (!session.tokens) {
          return;
        }

        // Get the current user
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
        };

        if (hasCircularReference(user)) {
          console.log("User object has a circular reference.");
        }

        console.log(`user: \n${user}`);

        // Check if the user is an admin
        const groups = session.tokens.accessToken.payload["cognito:groups"];

        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes("Admins"));

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  });
}
