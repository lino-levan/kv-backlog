// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[user].tsx";
import * as $1 from "./routes/api/callback.ts";
import * as $2 from "./routes/api/login.ts";
import * as $3 from "./routes/api/logout.ts";
import * as $4 from "./routes/api/set.ts";
import * as $5 from "./routes/index.tsx";
import * as $$0 from "./islands/Backlog.tsx";

const manifest = {
  routes: {
    "./routes/[user].tsx": $0,
    "./routes/api/callback.ts": $1,
    "./routes/api/login.ts": $2,
    "./routes/api/logout.ts": $3,
    "./routes/api/set.ts": $4,
    "./routes/index.tsx": $5,
  },
  islands: {
    "./islands/Backlog.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
