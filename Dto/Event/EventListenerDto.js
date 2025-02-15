class EventListenerDto {
    /** @type {Function} */
    #func;
    /** @type {boolean} */
    #once = false
    /** @type {string} */
    $uuid;
    /**
     *
     * @param {Function} _function
     * @param {boolean} _isOnce
     */
    constructor(_function, _isOnce) {
        if ((_function instanceof Function)) {
            this.#func = _function;
        } else {
            throw new Error("EventListenerDto: параметр _function в конструкторе должен быть функцией");
        }
        if (typeof _isOnce === 'boolean') {
            this.#once = _isOnce;
        } else {
            throw new Error("EventListenerDto: параметр _isOnce в конструкторе должен быть булевским типом");
        }
        this.$uuid = Uuid.v4();
    }

    /**
     *
     * @returns {string}
     */
    getUuid () {
        return this.$uuid;
    }

    /**
     *
     * @returns {Function}
     */
    getFunction () {
        return this.#func
    }

    destroy () {
        this.#func = null;
        this.#once = null;
        this.$uuid = null;
    }
}