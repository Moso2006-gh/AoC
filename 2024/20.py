raw_data = """###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############"""

from itertools import product
from collections import defaultdict

mapa = [list(row) for row in raw_data.split("\n")]
start_pos = next(((i, j) for i, row in enumerate(mapa) for j, element in enumerate(row) if element == "S"), None)

directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]
pos = start_pos
steps = 0
path = {}
while mapa[pos[0]][pos[1]] != "E":
    mapa[pos[0]][pos[1]] = steps
    path[pos] = steps
    for direction in directions:
        new_pos = (pos[0] + direction[0], pos[1] + direction[1])
        if mapa[new_pos[0]][new_pos[1]] in  [".", "E"]:
            pos = new_pos
            break
    steps += 1
mapa[pos[0]][pos[1]] = steps
path[pos] = steps

sol = 0
cheats = defaultdict(int)
for pos, step in path.items():
    dif_saves = {}
    if pos == (7, 9):
        print("a")
    for dir in [(i, j) for i, j in product((-3, -2, -1, 0, 1, 2, 3), repeat=2) if abs(i) + abs(j) <= 3]:
        if dir == (2, 0):
            print("a")
        new_pos = (pos[0] + dir[0], pos[1] + dir[1])
        if new_pos in path:
            distance_traveled = abs(dir[0]) + abs(dir[1])
            save = (path[new_pos] - step - distance_traveled)
            for dif_save_value, dif_save_pos_steps in dif_saves.items():
                if dif_save_value == save:
                    if dif_save_pos_steps[1] > distance_traveled:
                        dif_saves[dif_save_value] = [new_pos, distance_traveled]

            if save > best_save[0] or (save == best_save[0] and best_save[2] > abs(dir[0]) + abs(dir[1])):
                best_save = (save, new_pos, abs(dir[0]) + abs(dir[1]))
    if cheats[best_save[1]] < best_save[0] and best_save[0] != 0:
        cheats[best_save[1]] = best_save[0]

sol = 0
for cheat, value in cheats.items():
    if value >= 20:
        sol += 1
        
print(cheats)
print(sol)

