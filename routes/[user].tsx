import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Backlog from "@/islands/Backlog.tsx";
import { getUser } from "@/utils/provider.ts";
import { BacklogItem } from "@/utils/types.ts";
import { listBacklog } from "@/utils/db.ts";

interface Props {
  viewing: string;
  user: null | {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
  };
  backlog: BacklogItem[];
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const user = await getUser(req);
    const backlog = await listBacklog(ctx.params.user);
    return ctx.render({
      viewing: ctx.params.user,
      user,
      backlog: backlog.sort((a, b) => a.priority - b.priority),
    });
  },
};

export default function Home({ data }: PageProps<Props>) {
  return (
    <>
      <Head>
        <title>{data.viewing}'s Backlog</title>
      </Head>
      <div class="flex flex-col h-screen">
        <header class="px-4 py-2 bg-blue-200 flex items-center gap-2">
          <a href={`/${data.viewing}`} class="font-bold text-xl text-blue-900">
            {data.viewing}'s Backlog
          </a>
          <div class="ml-auto" />
          {data.user !== null && (
            <>
              <img class="h-8 w-8" src={data.user.avatar_url} />
              <a
                href="/api/logout"
                class="bg-blue-100 px-4 py-2 rounded text-blue-900"
              >
                Log Out
              </a>
            </>
          )}
          {data.user === null && (
            <>
              <a
                href="/api/login"
                class="bg-blue-100 px-4 py-2 rounded text-blue-900"
              >
                Log In
              </a>
            </>
          )}
        </header>
        <Backlog
          backlog={data.backlog}
          editable={data.user?.login === data.viewing}
        />
      </div>
    </>
  );
}
