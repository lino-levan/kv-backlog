import { Handlers } from "$fresh/server.ts";

import { BacklogItem } from "@/utils/types.ts";
import { setBacklog } from "@/utils/db.ts";
import { getUser } from "@/utils/provider.ts";

export const handler: Handlers = {
  async POST(req) {
    const user = await getUser(req);
    const body: BacklogItem = await req.json();

    if (body.name.length === 0 || !user) {
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
