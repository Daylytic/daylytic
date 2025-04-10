import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "~/lib/api/schema.ts";
import { staticNotificationApi } from "~/providers/notification";

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});
const attachRetryDataMiddleware: Middleware = {
  async onRequest({ request }) {
    if (request.method !== "GET" && request.method !== "HEAD" && request.body) {
      try {
        // If I try to use request.clone in onError middleware I get an error
        // Keeping it here makes it just simple
        const requestBodyText = await request.clone().text();
        // eslint-disable-next-line
        (request as any).__retryBody = requestBodyText;
      } catch (e) {
        console.error("Failed to capture request body for retry:", e);
      }
    }
    return request;
  },
};

const errorHandlingMiddleware: Middleware = {
  async onError({ error, request }) {
    if (!staticNotificationApi) {
      return;
    }

    const retryRequest = async () => {
      try {
        const newRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body:
            // eslint-disable-next-line
            request.method !== "GET" && request.method !== "HEAD" && (request as any).__retryBody
              ? // eslint-disable-next-line
                (request as any).__retryBody
              : undefined,
          credentials: request.credentials,
        });

        const response = await fetch(newRequest);
        staticNotificationApi!.success({
          message: "Retry Succeeded",
          description: "The request succeeded on retry.",
          duration: 5,
        });
        return response;
      } catch (_) {
        staticNotificationApi!.error({
          message: "Retry Failed",
          description:
            "Retrying the request also failed. Please check your internet connection and refresh the site. If you ignore this any new changes may not save!",
          duration: 0,
        });
      }
    };

    staticNotificationApi!.error({
      key: "APIError",
      message: "Server Error",
      description: "A problem occured while sending request to our servers. Retrying now...",
      duration: 3,
      onClose: retryRequest,
    });

    throw error;
  },
};

client.use(attachRetryDataMiddleware);
client.use(errorHandlingMiddleware);
