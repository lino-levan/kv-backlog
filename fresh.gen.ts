// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_user_ from "./routes/[user].tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_callback from "./routes/api/callback.ts";
import * as $api_delete from "./routes/api/delete.ts";
import * as $api_login from "./routes/api/login.ts";
import * as $api_logout from "./routes/api/logout.ts";
import * as $api_set from "./routes/api/set.ts";
import * as $index from "./routes/index.tsx";
import * as $Backlog from "./islands/Backlog.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[user].tsx": $_user_,
    "./routes/_app.tsx": $_app,
    "./routes/api/callback.ts": $api_callback,
    "./routes/api/delete.ts": $api_delete,
    "./routes/api/login.ts": $api_login,
    "./routes/api/logout.ts": $api_logout,
    "./routes/api/set.ts": $api_set,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Backlog.tsx": $Backlog,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
