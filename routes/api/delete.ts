import { Handlers } from "$fresh/server.ts";

import { deleteBacklog } from "@/utils/db.ts";
import { getUser } from "@/utils/provider.ts";

export const handler: Handlers = {
  async POST(req) {
    const user = await getUser(req);
    const id: string = await req.text();

    if (id.length === 0 || !user) {
      return Response.json({
        success: false,
      });
    }

    await deleteBacklog(user.login, id);

    return Response.json({
      success: true,
    });
  },
};
