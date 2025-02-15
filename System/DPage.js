import {DEvent} from "./Event";

export class DPage {
    //#queryOnEvent = '*[starts-with(name(@*), "on")]';
    #domEvents = [
        'onclick',
        'ondblclick',
        'onfocus',
        'onblur',
        'onmousemove',
        'onmousedown',
        'onmouseup',
        'onkeydown',
        'onkeyup',
        'onkeypress',
        'onmouseover',
        'onmouseout',
        'onselect',
        'onsubmit',
        'onreset',
        'onmouseleave',
        'onmouseenter',
        'oncontextmenu'
    ];

    #event;
    #queryOnEvent = '*[@onclick or @ondblclick]';
    #script = "";
    #vars = {};
    #dom = null;
    /**
     *
     * @param {HTMLElement} dom
     */
    constructor (dom) {
        this.#event = new DEvent();
        this.#dom = dom;
        /* ищем все скрипты вставки */
        const scripts = dom.querySelectorAll('script');
        for (let i = 0, len = scripts.length ; i < len; i++) {
            this.#script += scripts[i].textContent + ";\n";
        }
        debugger
        /* ищем все события  */
        const nodes= dom.queryXPath('*[' + this.#domEvents.map((item) => '@'+ item).join(' or ') + ']');
        for (let i = 0, ilen = nodes.length ; i < ilen; i++) {
            let attributes = nodes[i].attributes;
            for (let j = 0, jlen = attributes.length; j < jlen; j++) {
                let name = attributes[j].name;
                if (this.#domEvents.includes(name)) {
                    let event = name.replace(/^(?:on)(.+)/, '$1');
                    let value = attributes[j].value;
                    attributes.removeNamedItem(name);
                    --j;

                }
            }
        }
        this.#script  = `(function () {${this.#script}})()`;
    }

    run () {
        try {
            eval(this.#script);
        } catch (e) {
            console.error(e.message)
        }
    }

    /**
     * Установить переменную
     * @param {string} name
     * @param {*} value
     * @returns {Page}
     */
    setVar (name, value) {
        if (typeof name === 'string') {
            this.#vars[name] = value;
        }
        return this;
    }

    /**
     * Получить значение переменной
     * @param {string} name
     * @returns {*|null}
     */
    getVar (name) {
        if (typeof name === 'string') {
            return this.#vars[name] ?? null;
        }
        return null;
    }
}