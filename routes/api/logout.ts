import { Handlers } from "$fresh/server.ts";
import { signOut } from "auth";

export const handler: Handlers = {
  async GET(req) {
    return await signOut(req);
  },
};
