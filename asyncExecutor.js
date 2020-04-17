// Написать функцию, которая позволит использовать внутри генератора асинхронные вызовы.
//Реализация на Promise, async/await использовать запрещено.
function asyncExecutor (generator) {
    // реализация
    const iterator = generator();
    const processIteratorElement = (iterator, element) => {
        const done = element ? element.done : false;
        let value = element ? element.value : undefined;

        if(!done) {
            if(!(value instanceof Promise)) {
                value = Promise.resolve(value);
            }

            value.then((val) => {
                processIteratorElement(iterator, iterator.next(val));
            })
        }
    };

    processIteratorElement(iterator);
}

// тесты
const ID = 42;
const delayMS = 1000;

function getId () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ID);
        }, delayMS);
    });
}

function getDataById (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            id === ID ? resolve('🍎') : reject('💥');
        }, delayMS);
    });
}

asyncExecutor(function* () {
    console.time("Time");

    const id = yield getId();
    const data = yield getDataById(id);
    console.log('Data', data);

    console.timeEnd("Time");
});