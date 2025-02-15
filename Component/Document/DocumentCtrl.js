import {BaseCtrl} from "../Base/BaseCtrl.js";
import { importComponentContext } from "../importComponentContext.js";
import {Page} from "../../System/Page.js";
import {DPage} from "../../System/DPage";
let fragment = await importComponentContext('./Component/Document/{theme}/DocumentCtrl.html');

export class DocumentCtrl extends BaseCtrl {
    /** @type {Page} */
    #page = null;
    constructor () {
        super(fragment);
    }

    initComponent () {
        super.initComponent();
    }

    async connectedCallback () {
        this.#page = new Page(super.getControl() ?? null);
        this.page.run();
        return super.connectedCallback();
    }
}