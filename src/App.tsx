import { For, Show, createSignal, onMount } from "solid-js";
import { gun } from "./";

type User = {
  id: string;
  name: string;
  color: string;
};

type Message = {
  user: User;
  body: string;
};

export default function App() {
  const [user, setUser] = createSignal<User>({
    id: "sam",
    name: "Sam",
    color: "red",
  });

  const [chat, setChat] = createSignal("");
  const [messages, setMessages] = createSignal<Message[]>([
    {
      user: { id: "sam", name: "Sam", color: "salmon" },
      body: "This is a test",
    },
  ]);

  onMount(() => {
    gun.get("chat").put(null);
    gun.get("chat").on((message) => {
      console.log(message);
      // setMessages([...messages(), message]);
    });
  });

  return (
    <Show when={user()} fallback={<div>Not logged in</div>}>
      <div class="w-[420px] p-2 h-[600px] flex flex-col bg-grey rounded-2xl border-lightgrey border-solid border-[1px]">
        <div class="w-full h-full flex flex-col-reverse overflow-hidden">
          <For each={messages()}>
            {(message) => (
              <div class="flex gap-2 text-white p-2">
                <span style={{ color: message.user.color }} class="font-bold">
                  {message.user.name}
                </span>
                {message.body}
              </div>
            )}
          </For>
        </div>
        <div class="w-full flex gap-2">
          <div class="w-full relative">
            <textarea
              onChange={(e) => setChat(e.currentTarget.value)}
              value={chat()}
              placeholder="Type chat here..."
              rows={1}
              class="w-full rounded-2xl h-full bg-darkgrey resize-none outline-none text-white py-2 px-4"
            />
            <div class="absolute right-4 bottom-2 text-white">Test</div>
          </div>
          <button
            onClick={() => {
              if (chat().length > 0) {
                gun.get("chat").put({ user: user(), body: chat() });

                setChat("");
              }
            }}
            class="bg-white text-black px-3.5 py-1.5 rounded-xl font-semibold"
          >
            Chat
          </button>
        </div>
      </div>
    </Show>
  );
}
