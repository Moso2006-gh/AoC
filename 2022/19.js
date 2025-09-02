const input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 4 ore and 9 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 4 ore and 13 obsidian.`
//ore -> ore
//clay -> ore
//obsidian -> ore, clay
//geo -> ore, obsidian


let sum = 1;
input.split('\n').forEach(bluePrintS => {
    const dataS = bluePrintS.replace(':', '.').split('. ');
    const data = {
        id: parseInt(dataS[0].split(' ')[1]),
        oreRobot: parseInt(dataS[1].split(' ')[4]),
        clayRobot: parseInt(dataS[2].split(' ')[4]),
        obsidianRobot: [parseInt(dataS[3].split(' ')[4]),parseInt(dataS[3].split(' ')[7])],
        geoDeRobot: [parseInt(dataS[4].split(' ')[4]),parseInt(dataS[4].split(' ')[7])]
    }

    let resorces = [0, 0, 0, 0];
    let robots = [1, 0, 0, 0]; 

    let robotsToTest = [[resorces, robots]]
    let best = 0;
    for (let e = 0; e < 32; e++) {
        let newRobotsToTest = [];
        console.log(e, best);
        robotsToTest.forEach(Srobot => {
            let [resorces, robots] = Srobot;
            let newRobots = [0, 0, 0, 0]
            let newResourcesPlan = resorces.map((x, i) => x += robots[i]);
            
            
            if(best !== 0 && robots[2] === 0 || best > 3 && robots[3] === 0) return;

            if(robots[0] < data.clayRobot || robots[0] < data.obsidianRobot[0] || robots[0] < data.geoDeRobot[0]) {
                if(resorces[0] >= data.oreRobot) {
                    let newResources = [...newResourcesPlan]
                    newResources[0] -= data.oreRobot;
                    newRobotsToTest.push([newResources, [robots[0] + 1, robots[1], robots[2], robots[3]]])
                }
            }
            if(robots[1] === 0) {
                if(resorces[0] >= data.clayRobot) {
                    resorces[0] -= data.clayRobot;
                    newRobots[1]++;
                }
            }
            else if (robots[2] === 0) {
                if(resorces[0] >= data.obsidianRobot[0] && resorces[1] >= data.obsidianRobot[1]) {
                    resorces[0] -= data.obsidianRobot[0];
                    resorces[1] -= data.obsidianRobot[1];
                    newRobots[2]++;
                }
                else if((data.obsidianRobot[0] - (resorces[0] - data.clayRobot) / robots[0]) <= (data.obsidianRobot[1] - resorces[1]) / robots[1] && (resorces[0] >= data.clayRobot) && robots[1] < data.obsidianRobot[1]) {
                    let newResources = [...newResourcesPlan]
                    newResources[0] -= data.clayRobot;
                    newRobotsToTest.push([newResources, [robots[0], robots[1] + 1, robots[2], robots[3]]])
                }
            }
            else {
                if(resorces[0] >= data.geoDeRobot[0] && resorces[2] >= data.geoDeRobot[1]) {
                    let newResources = [...newResourcesPlan]

                    newResources[0] -= data.geoDeRobot[0];
                    newResources[2] -= data.geoDeRobot[1];
    
                    newRobotsToTest.push([newResources, [robots[0], robots[1], robots[2], robots[3] + 1]])
                }
                else { 
                    if((data.geoDeRobot[0] - (resorces[0] - data.obsidianRobot[0]) / robots[0]) <= (data.geoDeRobot[1] - resorces[2]) / robots[2] && (resorces[0] >= data.obsidianRobot[0] && resorces[1] >= data.obsidianRobot[1]) && robots[2] < data.geoDeRobot[1]) {
                        let newResources = [...newResourcesPlan]
                        newResources[0] -= data.obsidianRobot[0];
                        newResources[1] -= data.obsidianRobot[1];

                        newRobotsToTest.push([newResources, [robots[0], robots[1], robots[2] + 1, robots[3]]])
                    }
                    else if((data.obsidianRobot[0] - (resorces[0] - data.clayRobot) / robots[0]) <= (data.obsidianRobot[1] - resorces[1]) / robots[1] && (resorces[0] >= data.clayRobot) && robots[1] < data.obsidianRobot[1]) {
                        let newResources = [...newResourcesPlan]
                        newResources[0] -= data.clayRobot;
                        newRobotsToTest.push([newResources, [robots[0], robots[1] + 1, robots[2], robots[3]]])
                    }
                }
            }
            newRobotsToTest.push([resorces.map((x, i) => x += robots[i]), robots.map((x, i) => x += newRobots[i])])
            if(resorces[3] + robots[3] > best) best = resorces[3] + robots[3];
        })

        robotsToTest = [...newRobotsToTest];
    }

    sum *= best;
})

console.log(sum);
