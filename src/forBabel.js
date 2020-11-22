async function foo() {
    await setTimeout(() => {
        return Promise.resolve(console.log('**Babel await**'));
    }, 1000);
}

foo();

class Util {
    static utilId = Date.now();
}

console.log(Util.utilId);