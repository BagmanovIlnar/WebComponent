export class DEvent {
    /** @type {Object}*/
    #events = {}

    /**
     * Создать Событие
     * @param {string} eventName
     * @param {Function} listener
     * @returns {string}
     */
    addEvent (eventName, listener) {
        return this.#addEvent(eventName, listener, false);
    }

    /**
     * Создать разовое событие
     * @param {string} eventName
     * @param {Function} listener
     * @returns {string}
     */
    addEventOnce (eventName, listener) {
        return this.#addEvent(eventName, listener, true);
    }

    /**
     *
     * @param {string} eventName
     * @returns {boolean}
     */
    callEvent (eventName) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (eventName in this.#events) {
            if (this.#events[eventName] instanceof Array) {
                for (let i = 0, len = this.#events[eventName].length; i < len; i++) {
                    /** @type EventListenerDto */
                    let listener = this.#events[eventName][i];
                    let resultEvent = listener.getFunction().apply(this, args);
                    if (typeof resultEvent === 'boolean' && resultEvent === false) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * Вызвать событие по идентификатору
     * @param {string} uuid
     */
    callEventUuid (uuid) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (let eventName in this.#events) {
            if (this.#events.hasOwnProperty(eventName)) {
                if (this.#events[eventName] instanceof Array) {
                    for (let i = 0, len = this.#events[eventName].length; i < len; i++) {
                        /** @type EventListenerDto */
                        let listener = this.#events[eventName][i];
                        if (listener.getUuid() === uuid) {
                            let resultEvent = listener.getFunction().apply(this, args);
                            if (!(typeof resultEvent === 'boolean' && resultEvent === false)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     *
     * @param {string} eventName
     * @param {string=} uuid
     * @returns {Event}
     */
    removeEvent (eventName, uuid) {
        if (eventName in this.#events) {
            if (this.#events[eventName] instanceof Array) {
                for (let i = this.#events[eventName].length - 1; i >= 0; i--) {
                    let listener = this.#events[eventName][i];
                    let isRemove = true;
                    if (typeof uuid !== 'undefined') {
                        if (listener.getUuid() !== uuid) {
                            isRemove = false;
                        }
                    }
                    if (isRemove) {
                        /* удаляем элемент со смещением. */
                        listener.destroy();
                        this.#events[eventName].splice(i, 1);
                    }
                }
            }
        }
        return this;
    }

    /**
     * Системный метод добавление событий
     * @param eventName
     * @param listener
     * @param isOnce
     * @returns {string}
     */
    #addEvent (eventName, listener, isOnce) {
        if (typeof isOnce === 'undefined') {
            isOnce = false;
        }
        if (typeof eventName !== 'string') {
            throw new Error("Добавление события: Наименование событие должно быть строкой");
        }
        if (!(listener instanceof Function)) {
            throw new Error("Добавление события: колбэк вызова должно быть функцией");
        }
        let event = new EventListenerDto(listener, isOnce);
        if (!(eventName in this.#events)) {
            this.#events[eventName] = [];
        }
        this.#events[eventName].push(event);
        return event.getUuid();
    }

    destroy () {
        for (let eventName in this.#events) {
            this.removeEvent(eventName);
        }
    }
}