import { getTheme } from "./Theme.js";

let theme = getTheme();
let contextMap = new Map();

/**
 *
 * @param {string} src
 * @returns {DocumentFragment}
 */
export async function importComponentContext(src) {
    src = src.replace('{theme}', theme);
    if (contextMap.has(src)) {
        return contextMap.get(src);
    }
    let template = document.createElement('template');
    let response =  await fetch(src);
    if (response.status === 200) {
        let html = await response.text();
        html = html.replaceAll('{theme}', theme);
        template.innerHTML = html;
    }
    contextMap.set(src, template);
    return contextMap.get(src).content.cloneNode(true);
}