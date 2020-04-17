const allKeysAndSymbols = (obj) => {
    const proto = Object.getPrototypeOf(obj);
    const props = proto ? allKeysAndSymbols(proto) : [];

    return [].concat(Object.getOwnPropertyNames(obj), Object.getOwnPropertySymbols(obj), props);
};

const ob1 = { asd: 23 };
ob1[Symbol('a')] = 'test';
const ob2 = { sdr: 3 };
ob2[Symbol('test')] = 'test3';
Object.setPrototypeOf(ob2, ob1);
const symbolsProps = allKeysAndSymbols(ob2);
console.log(symbolsProps);