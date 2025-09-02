const input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 4 ore and 9 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 4 ore and 13 obsidian.`
//ore -> ore
//clay -> ore
//obsidian -> ore, clay
//geo -> ore, obsidian
/*
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 4 ore and 13 obsidian.
*/


let sum = 1;
input.split('\n').forEach((bluePrintS, w) => {
    console.log(w);

    const dataS = bluePrintS.replace(':', '.').split('. ');
    const data = {
        id: parseInt(dataS[0].split(' ')[1]),
        oreRobot: parseInt(dataS[1].split(' ')[4]),
        clayRobot: parseInt(dataS[2].split(' ')[4]),
        obsidianRobot: [parseInt(dataS[3].split(' ')[4]),parseInt(dataS[3].split(' ')[7])],
        geoDeRobot: [parseInt(dataS[4].split(' ')[4]),parseInt(dataS[4].split(' ')[7])]
    }

    let robotsToTest = [[[0, 0, 0, 0], [1, 0, 0, 0]]]
    let tested = {}
    let newRobotsToTest = [];
    function addRobot(newResources, newRobots) {
        const string = [newResources, newRobots].toString();
        if(tested[string] === undefined) {
            newRobotsToTest.push([newResources, newRobots])
            tested[string] = 1;
        }
    }

    let best = [0, 0];
    for (let e = 1; e <= 32; e++) {
        newRobotsToTest = [];

        for(let i = 0; i < robotsToTest.length; i++) {
            const [resorces, robots] = robotsToTest[i];
            const AddResources = resorces.map((x, i) => x += robots[i]);
            
            if(e === 25) tested = {};
            if(e === 28) tested = {};

            if(e !== 32){
                if(AddResources[3] + ((32 - e)/2)*(32 - e + 1) + robots[3] * (32 - e) >= best[0] + best[1] * (32 - e)) {
                    if(resorces[0] >= data.geoDeRobot[0] && resorces[2] >= data.geoDeRobot[1]) {
                        const newRobots = [robots[0], robots[1], robots[2], robots[3] + 1]
                        const newResources = [AddResources[0] - data.geoDeRobot[0], AddResources[1], AddResources[2]  - data.geoDeRobot[1], AddResources[3]]
                        
                        addRobot(newResources, newRobots)
                    }
                    
                    if(resorces[0] >= data.obsidianRobot[0] && resorces[1] >= data.obsidianRobot[1] && robots[2] < data.geoDeRobot[1]) {
                        const newRobots = [robots[0], robots[1], robots[2] + 1, robots[3]]
                        const newResources = [AddResources[0] - data.obsidianRobot[0], AddResources[1] - data.obsidianRobot[1], AddResources[2], AddResources[3]]
    
                        addRobot(newResources, newRobots)
                    }
    
                    if(resorces[0] >= data.clayRobot && robots[1] < data.obsidianRobot[1]) {
                        const newRobots = [robots[0], robots[1] + 1, robots[2], robots[3]]
                        const newResources = [AddResources[0] - data.clayRobot, AddResources[1], AddResources[2], AddResources[3]]
        
                        addRobot(newResources, newRobots)
                    }

                    if(resorces[0] >= data.oreRobot && (robots[0] < data.clayRobot || robots[0] < data.obsidianRobot[0] || robots[0] < data.geoDeRobot[0])) {
                        const newRobots = [robots[0] + 1, robots[1], robots[2], robots[3]]
                        const newResources = [AddResources[0] - data.oreRobot, AddResources[1], AddResources[2], AddResources[3]]
        
                        addRobot(newResources, newRobots)
                    }   
                    addRobot(AddResources, robots)
                }
            }

            if(AddResources[3] > best[0]) {
                best = [AddResources[3], robots[3]];
            }

        }

        robotsToTest = [];
        robotsToTest = [...newRobotsToTest]

        console.log(w, e, best);
    }

    console.log(best);
    sum *= best[0];
})

console.log(sum);

256