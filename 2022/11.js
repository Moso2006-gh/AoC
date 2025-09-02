const input = `Monkey 0:
Starting items: 66, 79
Operation: new = old * 11
Test: divisible by 7
  If true: throw to monkey 6
  If false: throw to monkey 7

Monkey 1:
Starting items: 84, 94, 94, 81, 98, 75
Operation: new = old * 17
Test: divisible by 13
  If true: throw to monkey 5
  If false: throw to monkey 2

Monkey 2:
Starting items: 85, 79, 59, 64, 79, 95, 67
Operation: new = old + 8
Test: divisible by 5
  If true: throw to monkey 4
  If false: throw to monkey 5

Monkey 3:
Starting items: 70
Operation: new = old + 3
Test: divisible by 19
  If true: throw to monkey 6
  If false: throw to monkey 0

Monkey 4:
Starting items: 57, 69, 78, 78
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 0
  If false: throw to monkey 3

Monkey 5:
Starting items: 65, 92, 60, 74, 72
Operation: new = old + 7
Test: divisible by 11
  If true: throw to monkey 3
  If false: throw to monkey 4

Monkey 6:
Starting items: 77, 91, 91
Operation: new = old * old
Test: divisible by 17
  If true: throw to monkey 1
  If false: throw to monkey 7

Monkey 7:
Starting items: 76, 58, 57, 55, 67, 77, 54, 99
Operation: new = old + 6
Test: divisible by 3
  If true: throw to monkey 2
  If false: throw to monkey 1`

const monkeysMostTouchedItems = [0, 0];

const monkeys = [];
let mod = 1;

input.split('\n\n').forEach(monkeyInput => {

    const monkeyLines = monkeyInput.split('\n')
    
    const id = parseInt(monkeyLines[0].slice(0, -1).split(' ')[1])
    const startingItems = monkeyLines[1].split(':')[1].replace(/ /g, '').split(',').map(x => (parseInt(x)))
    const operationArray = (monkeyLines[2].split(' = ')[1].split(' '))
    const divisionCondition = parseInt(monkeyLines[3].split(' ')[3]); mod *= divisionCondition;
    const trueMonkey = parseInt(monkeyLines[4].split(' ')[7]), falseMonkey = parseInt(monkeyLines[5].split(' ')[7]);

    function operation (item) {
        const firstNumber = (operationArray[0] === 'old' ? item : parseInt(operationArray[0]));
        const secondNumber = (operationArray[2] === 'old' ? item : parseInt(operationArray[2]));

        switch (operationArray[1]) {
            case '+':
                return (firstNumber + secondNumber) % mod;
            case '*':
                return (firstNumber * secondNumber) % mod;
        }
    }

    function test (item) {
        const newItem = operation(item)
        monkeys[newItem % (divisionCondition) === 0 ? trueMonkey : falseMonkey].items.push(newItem)
    }

    monkeys.push({
        id,
        items: startingItems,
        operation,
        test,
        itemsTouched: 0
    })
})

for (let i = 0; i < 10000 ; i++) {
    monkeys.forEach(monkey => {
        monkey.items.forEach(item => {
            monkey.itemsTouched++;
            monkey.test(item);

        });
        monkey.items = [];
    });

    monkeys.forEach(monkey => {
        if(monkey.itemsTouched > monkeysMostTouchedItems[0]) {
            monkeysMostTouchedItems[1] = monkeysMostTouchedItems[0];
            monkeysMostTouchedItems[0] = monkey.itemsTouched;
        }
        else if (monkey.itemsTouched > monkeysMostTouchedItems[1]) {
            monkeysMostTouchedItems[1] = monkey.itemsTouched;
        }
    })
}
console.log(monkeysMostTouchedItems[0] * monkeysMostTouchedItems[1]);
