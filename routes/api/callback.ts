import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "auth";
import { provider } from "@/utils/provider.ts";

export const handler: Handlers = {
  async GET(req) {
    return await handleCallback(req, provider);
  },
};
