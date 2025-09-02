import numpy as np
from pathlib import Path
from collections import defaultdict

input = np.array([
    list(x) for x in 
    open(Path(__file__).parent / "20.txt", "r").read().split("\n")
])
start = np.argwhere(input == "S")[0]
end = np.argwhere(input == "E")[0]

directions = np.array([[-1, 0], [0, 1], [1, 0], [0, -1]])

# Add numbers
i = 1
pos = start.copy()
path = [start]
mapa = np.array([[-1 if n == "#" else 0 for n in m] for m in input])
while not np.array_equal(pos, end):
    for dir in directions:
        new_pos = pos + np.array(dir)
        if mapa[tuple(new_pos)] == 0:
            mapa[tuple(new_pos)] = i
            if i == 83:
                pass
            path.append(new_pos)
            pos = new_pos

            i += 1
            break

def main(n):
    y, x = np.ogrid[:mapa.shape[0], :mapa.shape[1]] 
    cheats = {}

    for pos in path:
        mask = np.zeros(mapa.shape, dtype=int)
        dist = abs(y - pos[0]) + abs(x - pos[1])  
        mask[dist <= n] = 1

        reachable = (mapa != -1) & (mask == 1)
        reachable = reachable.astype(int)
        
        n1 = mapa[tuple(pos)]
        for reachable_pos in np.argwhere(reachable):
            n2 = mapa[tuple(reachable_pos)]

            cheat_value = (n2 - n1) - (abs(reachable_pos[0] - pos[0]) + abs(reachable_pos[1] - pos[1]))
            if cheat_value < 1:
                continue
            
            cheats[tuple(np.array([pos, reachable_pos]).flatten())] = cheat_value
        

    def count_keys_with_same_value_obj(d):
        obj_to_keys = defaultdict(int)

        ge_100 = 0
        for _, val in d.items():
            if val >= 100:
                ge_100 += 1

            obj_to_keys[val] += 1

        return obj_to_keys, ge_100

    cheat_summary,ge_100 = count_keys_with_same_value_obj(cheats)
    return ge_100

print(main(2))  # Part 1
print(main(20)) # Part 2