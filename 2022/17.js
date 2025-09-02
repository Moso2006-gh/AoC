const input = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>"
let useInput = input;

const rocksString = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`
let RockShapes = rocksString.split('\n\n').map(rockS => {
    let RockShape = [];

    rockS.split('\n').forEach((rockRow, m) => {
        rockRow.split('').forEach((chr, n) => {
            if(!(chr === '#')) return;
            RockShape.push([(rockS.split('\n').length - 1) - m,n]);
        })
    })

    return RockShape;
})

console.log(RockShapes);
let highest = 0;

const nRock = 100;

let ocupatedSpaces = [];
for (let e = 0; e < nRock; e++) {

    console.log(e % (RockShapes.length));
    let rockToFall = RockShapes[e % (RockShapes.length)].map(cord => {
        const newCord = [cord[0] + highest + 4, cord[1] + 2];
        while(ocupatedSpaces[newCord[0]] === undefined) ocupatedSpaces.push([]) 
        return newCord;
    });

    let stop = false;
    while(!stop) {    
        const movement = useInput[0];
        useInput = useInput.slice(1);
        if(!useInput.length) useInput = input;

        // console.log(rockToFall);
        if(movement === '>') {
            let move = true;
            for (let i = 0; i < rockToFall.length; i++) {
                const cord = rockToFall[i];
                if(ocupatedSpaces[cord[0]].find(occupied => occupied === cord[1] + 1) || cord[1] === 6) move = false;
            }

            if(move) rockToFall = rockToFall.map(cord => [cord[0], cord[1] + 1])
        }
        else if (movement === '<') { 
            let move = true;
            for (let i = 0; i < rockToFall.length; i++) {
                const cord = rockToFall[i];
                if(ocupatedSpaces[cord[0]].find(occupied => occupied === cord[1] - 1) || cord[1] === 0) move = false;
            }

            if(move) rockToFall = rockToFall.map(cord => [cord[0], cord[1] - 1])
        }


        for (let i = 0; i < rockToFall.length; i++) {
            const cord = rockToFall[i];

            if(ocupatedSpaces[cord[0] - 1].find(ocupates => ocupates === cord[1]) || cord[0] - 1 === 0) {
                stop = true;
                break;
            }
        }
        if(stop) rockToFall.forEach(cord => ocupatedSpaces[cord[0]].push(cord[1]));
        else rockToFall = rockToFall.map(cord => [cord[0] - 1, cord[1]]);
    } 
    
    highest = rockToFall[0][0] > highest ? rockToFall[0][0] : highest;
}

console.log(highest);