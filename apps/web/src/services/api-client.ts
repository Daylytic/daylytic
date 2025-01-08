import createClient from "openapi-fetch";
import type { paths } from "lib/api/schema.ts";

export const client = createClient<paths>({ baseUrl: "http://localhost:8084/",   headers: {
  Accept: "application/json",
},});