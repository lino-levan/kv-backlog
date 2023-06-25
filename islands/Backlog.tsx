import { useState } from "preact/hooks";
import { BacklogItem } from "@/utils/types.ts";

interface BacklogProps {
  backlog: BacklogItem[];
  editable: boolean;
}

const priority_color = ["red", "orange", "amber", "yellow", "lime", "green"];

const id = crypto.randomUUID();

export default function Backlog(props: BacklogProps) {
  const [backlog, setBacklog] = useState<BacklogItem[]>(props.backlog);
  const [priority, setPriority] = useState(0);
  const [name, setName] = useState("");

  return (
    <div class="w-full bg-blue-100 flex-grow flex flex-col gap-2 items-center p-2">
      {backlog.map((val, i) => (
        <div class="bg-blue-200 px-4 py-2 rounded max-w-screen-md w-full hover:scale-[101%] transition-all shadow flex items-center gap-2">
          <input
            type="checkbox"
            checked={val.done}
            disabled={!props.editable}
            onClick={(e) => {
              fetch("/api/set", {
                method: "POST",
                body: JSON.stringify({
                  ...val,
                  done: e.currentTarget.checked,
                }),
              });
            }}
            class="bg-white w-4 h-4 rounded-full accent-blue-900"
          />
          <button
            disabled={!props.editable}
            class={`bg-${priority_color[val.priority]}-500 text-${
              priority_color[val.priority]
            }-800 px-2 rounded-full bg-opacity-50 w-12`}
            onClick={() => {
              const copy: BacklogItem[] = JSON.parse(JSON.stringify(backlog));
              if (copy[i].priority !== 5) {
                copy[i].priority++;
              } else {
                copy[i].priority = 0;
              }

              fetch("/api/set", {
                method: "POST",
                body: JSON.stringify({
                  ...val,
                  priority: copy[i].priority,
                }),
              });

              setBacklog(copy);
            }}
          >
            P{val.priority}
          </button>
          {val.name}
          <div class="ml-auto"></div>
          {val.tags.map((tag) => (
            <span class="bg-red-500 text-red-700 px-2 rounded-full bg-opacity-40">
              #{tag}
            </span>
          ))}
          {props.editable && (
            <button
              class="bg-blue-300 hover:bg-red-500 hover:text-white rounded px-1"
              onClick={() => {
                fetch("/api/delete", {
                  method: "POST",
                  body: val.id,
                }).then((res) => res.json())
                  .then((res) => {
                    if (res.success) {
                      location.reload();
                    }
                  });
              }}
            >
              ⌫
            </button>
          )}
        </div>
      ))}
      {props.editable && (
        <div class="bg-blue-200 px-4 py-2 rounded max-w-screen-md w-full hover:scale-[101%] transition-all shadow flex items-center gap-2">
          <input
            disabled
            type="checkbox"
            class="bg-white w-4 h-4 rounded-full accent-blue-900"
          />
          <button
            class={`bg-${priority_color[priority]}-500 text-${
              priority_color[priority]
            }-800 px-2 rounded-full bg-opacity-50 w-12`}
            onClick={() => {
              if (priority !== 5) {
                setPriority(priority + 1);
              } else {
                setPriority(0);
              }
            }}
          >
            P{priority}
          </button>
          <input
            class="bg-transparent flex-grow outline-none"
            placeholder="task"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <button
            class="bg-blue-300 hover:bg-blue-400 hover:text-white rounded px-1"
            onClick={() => {
              fetch("/api/set", {
                method: "POST",
                body: JSON.stringify({
                  id,
                  name,
                  tags: [],
                  priority,
                  created: new Date().getTime(),
                  done: false,
                }),
              }).then((res) => res.json())
                .then((res) => {
                  if (res.success) {
                    location.reload();
                  }
                });
            }}
          >
            ⏎
          </button>
        </div>
      )}
    </div>
  );
}
