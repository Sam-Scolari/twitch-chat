/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import App from "./App";

import Gun from "gun";

export const gun = new Gun();

const root = document.getElementById("root");

render(() => <App />, root);
