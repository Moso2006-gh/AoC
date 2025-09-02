const input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 4 ore and 9 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 4 ore and 13 obsidian.`
//ore -> ore
//clay -> ore
//obsidian -> ore, clay
//geo -> ore, obsidian


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
    let best = 0;

    function addRobot(newResources, newRobots) {
        const string = [newResources, newRobots].toString();
        if(tested[string] === undefined) {
            newRobotsToTest.push([newResources, newRobots])
            tested[string] = 1;
        }
    }

    for (let e = 0; e < 32; e++) {
        console.log(e);
        newRobotsToTest = [];

        for(let i = 0; i < robotsToTest.length; i++) {
            const [resorces, robots] = robotsToTest[i];
            const AddResources = resorces.map((x, i) => x += robots[i]);
            if(AddResources[3] > best) best = AddResources[3];

            console.log();
            if(e !== 32 - 1 && ((31 - e)/2)*(31 - e + 1) > best) {
                if(resorces[0] >= data.oreRobot && (robots[0] < data.clayRobot || robots[0] < data.obsidianRobot[0] || robots[0] < data.geoDeRobot[0]) ) {
                    const newRobots = [robots[0] + 1, robots[1], robots[2], robots[3]]
                    const newResources = [AddResources[0] - data.oreRobot, AddResources[1], AddResources[2], AddResources[3]]
    
                    addRobot(newResources, newRobots)
                }   

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
    
                addRobot(AddResources, robots)
            }

        }

        robotsToTest = [...newRobotsToTest]
    }

    sum *= best;
})

console.log(sum);
