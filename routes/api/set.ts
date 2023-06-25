import { Handlers } from "$fresh/server.ts";
import { getUser } from "auth";

import { BacklogItem } from "@/utils/types.ts";
import { setBacklog } from "@/utils/db.ts";
import { provider } from "@/utils/provider.ts";

export const handler: Handlers = {
  async POST(req) {
    const user = await getUser(req, provider);
    const body: BacklogItem = await req.json();

    if (body.name.length === 0) {
      return Response.json({
        success: false,
      });
    }

    await setBacklog(user.login, body);

    return Response.json({
      success: true,
    });
  },
};
