import {BaseCtrl} from "../Base/BaseCtrl.js";
import { importComponentContext } from "../importComponentContext.js";
let fragment = await importComponentContext('./Component/Document/{theme}/DocumentCtrl.html');


export class DocumentCtrl extends BaseCtrl {
    constructor () {
        super(fragment);
    }
}