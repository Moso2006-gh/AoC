const fs = require('fs')


const calculateTiles = (processedInput, startingPos) => {
    let visitedPos = new Set();
    let visitedConditions = new Set();

    let posToVisit = [startingPos]; // 0 --> Right    1 --> Down     2 --> Left      3 --> Up
    while (posToVisit.length) {
        let pos = [...posToVisit[0]];
        posToVisit.splice(0, 1);

        try {
            if(processedInput[pos[0][0]][pos[0][1]] !== undefined) { 
                visitedPos.add(JSON.stringify(pos[0]));
                visitedConditions.add(JSON.stringify(pos));
            }
            else Error();
        } catch (error) {
            continue;
        }

        let newDir = pos[1];
            let newPos;

        switch(processedInput[pos[0][0]][pos[0][1]]) {
            case ".":
                newPos = [[pos[0][0] + newDir[0], pos[0][1] + newDir[1]], newDir];
                if(!visitedConditions.has(JSON.stringify(newPos))) posToVisit.push(newPos);
                break;

            case "/":
                newDir = [-pos[1][1], -pos[1][0]];
                newPos = [[pos[0][0] + newDir[0],  pos[0][1] + newDir[1]], newDir];
                if(!visitedConditions.has(JSON.stringify(newPos))) posToVisit.push(newPos);
                visitedConditions.add(JSON.stringify(newPos))
                break;

            case "\\":
                newDir = [pos[1][1], pos[1][0]];
                newPos = [[pos[0][0] + newDir[0], pos[0][1] + newDir[1]], newDir];
                if(!visitedConditions.has(JSON.stringify(newPos))) posToVisit.push(newPos);
                visitedConditions.add(JSON.stringify(newPos))
                break;

            case "|":
                newPos = [[pos[0][0] - 1, pos[0][1]], [-1, 0]];
                if(!visitedConditions.has(JSON.stringify(newPos))) posToVisit.push(newPos);
                visitedConditions.add(JSON.stringify(newPos))

                newPos = [[pos[0][0] + 1, pos[0][1]], [1, 0]];
                if(!visitedConditions.has(JSON.stringify(newPos)))posToVisit.push(newPos);
                visitedConditions.add(JSON.stringify(newPos))
                break;

            case "-":
                newPos = [[pos[0][0], pos[0][1] - 1], [0, -1]];
                if(!visitedConditions.has(JSON.stringify(newPos))) posToVisit.push(newPos);
                visitedConditions.add(JSON.stringify(newPos))

                newPos = [[pos[0][0], pos[0][1] + 1], [0, 1]];
                if(!visitedConditions.has(JSON.stringify(newPos))) posToVisit.push(newPos);
                visitedConditions.add(JSON.stringify(newPos))
                break; 
        }                   
    }

    return visitedPos.size;
}

const testSol = (currentSol, testValue) => testValue > currentSol ? testValue : currentSol;

let sol = 0;
fs.readFile('./16.txt', "utf8", (_, input) => {
    const processedInput = input.split("\n").map(x => x.replace("\\", "h").replace("\r", "").split("").map(x2 => x2.replace("h", "\\")));
    processedInput.forEach((line, i) => {
        if(i === 0) {
            line.forEach((_, j) => {
                sol = testSol(sol, calculateTiles(processedInput, [[i, j], [1, 0]]));
            })
        }

        sol = testSol(sol, calculateTiles(processedInput, [[i, 0], [0, 1]]));
        sol = testSol(sol, calculateTiles(processedInput, [[i, line.length - 1], [0, -1]]));

        if(i === processedInput.length - 1) {
            line.forEach((_, j) => {
                sol = testSol(sol, calculateTiles(processedInput, [[i, j], [0, -1]]));
            })
        }
    })

    console.log(sol);
});