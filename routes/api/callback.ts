import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "auth";
import { provider } from "@/utils/provider.ts";

export const handler: Handlers = {
  async GET(req) {
    const { response } = await handleCallback(req, provider);
    return response;
  },
};
