import { BacklogItem } from "./types.ts";

const BACKLOG_KV_KEY = "backlog";
const kv = await Deno.openKv();

export async function setBacklog(user: string, item: BacklogItem) {
  await kv.set([BACKLOG_KV_KEY, user, item.id], item);
}

export async function listBacklog(user?: string) {
  const entries = user
    ? await kv.list({ prefix: [BACKLOG_KV_KEY, user] })
    : await kv.list({ prefix: [BACKLOG_KV_KEY] });
  const backlog: BacklogItem[] = [];

  for await (const entry of entries) {
    backlog.push(entry.value);
  }

  return backlog;
}
