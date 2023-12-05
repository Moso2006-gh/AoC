const input = document.body.innerHTML.split(">")[1].split("<")[0]
const seedS = input.split("\n\n")[0];
const mapsS = input.split("\n\n").splice(1);

let maps = []
mapsS.forEach(mapS => {
    let map = [];
    mapS.split("\n").splice(1).forEach(cordS => {
        const [source, start, length] = cordS.split(" ").map(n => Number(n))
        map.push([source, start, length]) 
    })

    maps.push(map)
})

const part1 = () => {
    const transform = (map, number) => {
        for (let e = 0; e < map.length; e++) {
            const cord = map[e];
            if(cord[1] <= number && number < cord[1] + cord[2]) {
                return cord[0] + (number - cord[1])
            }
        }
    
        return number;
    }
    
    let sol = Number.MAX_SAFE_INTEGER;
    const seeds = seedS.split(": ")[1].split(" ").map(x => Number(x));
    seeds.forEach(seed => {
        let number = seed;
        for (let i = 0; i < maps.length; i++) {
            const map = maps[i];
            number = transform(map, number);
        }

        if (sol > number) sol = number;
    })

    return sol;
}

const part2 = () => {
    let sol = Number.MAX_SAFE_INTEGER;
    const seeds = seedS.split(": ")[1].split(" ").map(x => Number(x));
    for (let i = 0; i < seeds.length; i += 2) {
        let intervals = [[seeds[i], seeds[i + 1]]];
        for (let m = 0; m < maps.length; m++) {
            const map = maps[m];
            let newIntervals = [];
            for (let i_n = 0; i_n < intervals.length; i_n++) {
                const interval = intervals[i_n];
                let found = false;
                for (let e = 0; e < map.length; e++) {
                    const cord = map[e];
                    if(cord[1] <= interval[0] && interval[0] <= cord[1] + (cord[2] - 1)) {
                        found = true;
    
                        const overflow = interval[1] - (cord[2] - (interval[0] - cord[1]));
                        if(overflow <= 0) {
                            newIntervals.push([cord[0] + (interval[0] - cord[1]), interval[1]])
                        }
                        else {
                            newIntervals.push([cord[0] + (interval[0] - cord[1]), cord[2] - (interval[0] - cord[1])])
                            intervals.push([cord[1] + cord[2], overflow])
                        }
                    }
                }            
                if(!found) newIntervals.push([...interval]);
            }
            intervals = [...newIntervals];
        }
        intervals.forEach(interval => {if(interval[0] < sol) sol = interval[0]})
    }

    return sol;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());