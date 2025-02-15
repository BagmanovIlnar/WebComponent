export class BaseCtrl extends HTMLElement {
    #shadow = null;
    #fragment = null;
    #control = null;
    #controlText = null;


    static attributesFunction = {
        "value" : "ChangedCallbackValue",
        "caption" : "changedCallbackCaption",
        "visible" : "changedCallbackVisible",
        "enable" : "changedCallbackEnable"
    }

    /**
     * @param {DocumentFragment} fragment
     */
    constructor (fragment) {
        super();
        this.#shadow = this.attachShadow({ mode: "open" });
        this.#shadow.appendChild(fragment);
        this.initComponent();
    }

    setControl(dom) {
        this.#control = dom;
        return this;
    }

    getControl() {
        return this.#control;
    }

    setControlText(dom) {
        this.#controlText = dom;
        return this;
    }

    getControlText() {
        return this.#controlText;
    }

    /**
     * Событие когда компонент впервые добавляемся в DOM
     */
    async connectedCallback () {

    }

    /**
     * Событие когда компонент удаляется из DOM
     */
    async disconnectedCallback () {
        /*this.#caption = null;
        this.#shadow = null;
        this.#dom = null;
        this.#control = null;*/
    }


    /*async postInitComponent () {
        let control = this.getControl();
    }*/



    /**
     * События при изменении указанных аттрибутов
     * @returns {Array}
     */
    static get observedAttributes() {
        return Object.keys(this.attributesFunction)
    }


    /**
     *
     * @param {string} name Имя аттрибута
     * @param {string} oldValue предыдущее значение аттрибута
     * @param {string} newValue новое значение аттрибута
     */
    attributeChangedCallback(name, oldValue, newValue) {
        let attributes = this.constructor.attributesFunction;
        if (name in attributes) {
            if (attributes[name] in this) {
                this[attributes[name]](oldValue, newValue);
            } else {
                console.log(`Метод ${attributes[name]} не найден`);
            }
        } else {
            console.log(`Отслеживаемый аттрибут ${name} не найден`);
        }
    }

    adoptedCallback() {
        // вызывается, когда элемент перемещается в новый документ
        // (происходит в document.adoptNode, используется очень редко)
    }


    initComponent() {
        if (this.#shadow) {
            this.setControl(this.#shadow.querySelector('[cmptype]') ?? null);
            this.setControlText(this.#shadow.querySelector('[text]') ?? null);
        }
    }

    changedCallbackCaption (oldValue, newValue) {
        let control = this.getControlText();
        if (control) {
            if (control instanceof HTMLTextAreaElement) {
                control.value = newValue;
            } else if (control instanceof HTMLInputElement) {
                control.value = newValue;
            } else if (typeof control.setCaption === 'function') {
                control.setCaption(newValue);
            } else {
                control.innerHTML = newValue;
            }
        } else {
            console.log(`Элемент для вставки текста не найден`);
        }
        return this;
    }

    changedCallbackVisible(oldValue, newValue) {
        if (newValue === null) {

        } else {

        }
    }

    /**
     *
     * @param {string} value
     */
    setCaption(value) {
        if (value) {
            this.setAttribute('caption', value)
        }
    }

    /**
     * @returns {string|null}
     */
    getCaption() {
        this.getAttribute('caption') ?? null;
    }

    setValue(value) {
        //  this.#value = value ?? null;
    }

    getValue() {
        //  return this.#value;
    }

    setVisible (bool) {
        if (this.#control instanceof HTMLElement) {
            if (bool) {
                this.#control.removeAttribute('visible')
            } else {
                this.#control.setAttribute('visible', 'true')
            }
        }
        return this;
    }

    setDisable () {
        if (this.#control instanceof HTMLElement) {
            this.#control.setAttribute('disable', 'true')
        }
        return this;
    }

    setEnable () {
        if (this.#control instanceof HTMLElement) {
            this.#control.removeAttribute('disable')
        }
        return this;
    }
}