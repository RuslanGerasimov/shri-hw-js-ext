class MySet {
    constructor(arr) {
        if (!Array.isArray(arr)) {
            throw new Error('argument must be an array');
        }

        Object.defineProperty(this, 'data', {
            value: arr.filter((item, index) => arr.indexOf(item) === index),
            enumerable: false,
            writable: false,
            configurable: false
        })
    }

    [Symbol.toStringTag]() {
        return this.constructor.name;
    };

    valueOf() {
        return this
    };

    *[Symbol.iterator]() {
        for (let i = 0; i < this.data.length; i++) {
            yield this.data[i];
        }
    }

    *entries () {
        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];
            yield [item, item];
        }
    }

    values() {
        return this[Symbol.iterator]();
    };

    keys() {
        return this[Symbol.iterator]();
    };

    get size() {
        return this.data.length;
    }

    clear() {
        this.data.splice(0, this.size);
    }

    add(item) {
        if(!this.data.includes(item)) {
            this.data.push(item);
        }
    }

    delete(item) {
        if(this.data.includes(item)) {
            this.data.splice(this.data.indexOf(item), 1);
        }
    }

    has(item) {
        return this.data.includes(item);
    }

    forEach(cb, self) {
        this.data.forEach(cb.bind(self));
    }
}
// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);
// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue() {
        return this.value
    }
};

const data = {
    value: 42
};

// есть метод add
set.add(object);
set.add(data);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()); // true
console.log(String(set)); // [object MySet]
console.log(Object.prototype.toString.call(set)); // [object MySet]

// задание со звездочкой *
// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data);