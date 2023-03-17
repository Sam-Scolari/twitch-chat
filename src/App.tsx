// @refresh reload

import { For, Show, createSignal, onMount } from "solid-js";
import { gun } from "./";
import { z } from "zod";

const Message = z.object({
  sender: z.string(),
  color: z.string(),
  body: z.string(),
});

const random = {
  sender: [
    "aventme",
    "Capscho",
    "cozync",
    "myallet",
    "reallySolid",
    "Blacket",
    "YuiDr",
    "Cannonis",
    "redst",
    "wearepa",
    "Sensepest",
    "Cymarbu",
    "ludwig",
    "cyr",
    "nmplol",
    "hasanabi",
    "sodapoppin",
    "xqcow",
  ],
  color: ["#32a852", "#4099bd", "#763ead", "#cf6b32", "#d62735"],
  message: [
    "AHH I SEE",
    "AYOO",
    "FeelsLagMan",
    "OMEGALUL",
    "thats such a banger",
    "THIS DUDE IS A REAL PIECE OF SHIT",
    "This actually looks promising. Very exciting",
    "is missed the stream. is the game good ?",
    "that voice though",
    "No thats about right",
    "BUILT DIFFERENT LIKE A DEFECTIVE TOY",
    "hard stuck in plat allready KEKW",
    "you win this stfu and focus up",
    "nopenopenopenopenope",
    "I tuned in. THis was my first clip. I lost",
    " im cringing so hard",
    "sweat home alabama",
    "No more pausing",
    "LETHIMCOOK",
    "yea",
  ],
};

export default function App() {
  const [name, setName] = createSignal("");
  const [color, setColor] = createSignal("#BA84FF");

  const [chat, setChat] = createSignal("");

  const [messages, setMessages] = createSignal<z.infer<typeof Message>[]>([]);

  onMount(() => {
    gun.get("twitch-chat").on((message) => {
      if (Message.safeParse(message).success) {
        setMessages([
          { color: message.color, body: message.body, sender: message.sender },
          ...messages(),
        ]);
      }
    });

    for (let i = 0; i < 10; i++) {
      setInterval(
        () =>
          setMessages([
            {
              body: random.message[
                Math.floor(Math.random() * random.message.length)
              ],
              color:
                random.color[Math.floor(Math.random() * random.color.length)],
              sender:
                random.sender[Math.floor(Math.random() * random.sender.length)],
            },
            ...messages(),
          ]),
        Math.floor(Math.random() * 10000)
      );
    }
  });

  function send() {
    if (chat().length > 0) {
      gun.get("twitch-chat").put({
        sender: name(),
        color: color(),
        body: chat(),
      });
      setChat("");
    }
  }

  return (
    <div class="w-[420px] p-2 h-[600px] flex flex-col bg-grey rounded-2xl border-lightgrey border-solid border-[1px]">
      <div class="w-full h-full flex flex-col-reverse overflow-hidden">
        <For each={messages()}>
          {(message) => (
            <div class="flex gap-2 text-white px-2 pb-4">
              <span style={{ color: message.color }} class="font-bold">
                {message.sender}
              </span>
              {message.body}
            </div>
          )}
        </For>
      </div>
      <div class="w-full items-center flex bg-darkgrey rounded-2xl p-2">
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          onChange={(e) => setChat(e.currentTarget.value)}
          value={chat()}
          placeholder={name() ? "Type chat here..." : "Enter your name..."}
          class="w-full h-full bg-transparent resize-none outline-none text-white px-2"
        />
        <Show when={!name()}>
          <label
            class="w-6 h-6 rounded-full mr-4 ml-2 cursor-pointer"
            style={{
              "background-color": color(),
            }}
          >
            <input
              type="color"
              value={color()}
              onInput={(e) => setColor(e.currentTarget.value)}
              class="invisible"
            />
          </label>
        </Show>
        <button
          onClick={() => {
            if (name()) send();
            else {
              setName(chat());
              setChat("");
            }
          }}
          style={{ "background-color": color() }}
          class="py-2 px-4 rounded-xl whitespace-nowrap text-white font-semibold"
        >
          {name() ? "Send" : "Confirm"}
        </button>
      </div>
    </div>
  );
}
