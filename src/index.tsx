/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import App from "./App";

import Gun from "gun";

export const gun = new Gun(["http://localhost:8765/gun"]);

const root = document.getElementById("root");

render(() => <App />, root);
