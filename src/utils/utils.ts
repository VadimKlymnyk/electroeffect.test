import {history} from "./history";

export function forwardTo(path: string) {
    history.push(path);
}