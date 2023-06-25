import { Handlers } from "$fresh/server.ts";
import { signIn } from "auth";
import { provider } from "@/utils/provider.ts";

export const handler: Handlers = {
  async GET(_req) {
    return await signIn(provider);
  },
};
