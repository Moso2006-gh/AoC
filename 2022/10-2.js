const input = `noop
noop
addx 5
addx 1
noop
noop
addx 3
addx 1
addx 6
noop
addx -1
addx 5
addx 1
noop
addx 4
addx 1
noop
addx -6
addx 12
noop
addx 3
addx 1
addx -26
addx -12
addx 5
addx 19
addx -3
addx -13
addx 2
noop
addx 3
addx 2
noop
addx 3
addx 15
addx -8
addx 2
addx 6
noop
addx -23
addx 20
addx 3
addx 2
addx 5
addx -40
noop
noop
addx 3
addx 6
addx -2
noop
addx 5
noop
noop
addx 5
addx -2
addx 9
noop
noop
noop
addx -14
addx 17
noop
noop
addx 8
noop
noop
addx -2
addx 4
noop
noop
addx -35
noop
noop
noop
addx -1
addx 5
addx 6
noop
addx -4
addx 5
addx 2
addx 3
noop
addx 5
addx 14
addx -10
addx -25
addx 1
addx 38
addx -6
addx 2
addx 3
addx -2
addx -38
noop
addx 9
addx -4
noop
addx 25
addx -20
noop
addx 3
addx 2
addx 5
addx 2
addx -9
addx 14
addx -2
noop
noop
addx 7
addx 3
addx -2
addx 2
noop
addx 3
addx -38
noop
addx 7
noop
noop
addx 1
noop
addx 3
addx 1
noop
noop
addx 6
noop
addx 4
addx 1
noop
noop
addx 4
addx 1
addx 7
addx -3
addx 5
noop
noop
noop
noop
noop
noop
noop
`
let screen = [];

let cicle = 0;
let X = 1;

function screenHandler () {
    const pos = (cicle - 1) % 40; 

    if( pos === 0) {
        screen.push('');
    } 

    Math.abs(pos - X) <= 1 ? screen[screen.length - 1] += '#' : screen[screen.length - 1] += ' '  

    console.log('----------');
}

input.split('\n').forEach(commandLine => {
    let [command, value] = commandLine.split(' ');
    value = parseInt(value);
    
    switch (command) {
        case 'noop':
            cicle++;
            screenHandler(cicle, X);
            break;
    
        default:
            for (let i = 0; i < 2; i++) {
                cicle++;
                screenHandler(cicle, X);   
            }
            X += value;
            break;
    }
})

console.log(screen);