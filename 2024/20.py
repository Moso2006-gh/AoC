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
            path.append(new_pos)
            pos = new_pos

            i += 1
            break
mapa[tuple(new_pos)] = i - 1

cheats = {}
for pos in path[:-3]:
    n1 = mapa[tuple(pos)]
    for dir1 in directions:
        first_step = pos + np.array(dir1)
        if mapa[tuple(first_step)] != -1:
            continue

        for dir2 in directions:
            try:
                second_step = first_step + np.array(dir2)
                n2 = mapa[tuple(second_step)]

                cheat_value = (n2 - n1) - 2
                if cheat_value < 1:
                    continue

                cheats[tuple(np.array([pos, second_step]).flatten())] = cheat_value
            except:
                pass

def count_keys_with_same_value_obj(d):
    obj_to_keys = defaultdict(int)
    
    for _, val in d.items():
        obj_to_keys[val] += 1
    
    # Prepare a dict with counts for each value object
    
    return obj_to_keys

result = count_keys_with_same_value_obj(cheats)
print(mapa)
print(result)