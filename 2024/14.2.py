from itertools import product

raw_data = """p=2,4 v=2,-3"""

import time

robots = [
    [
        [int(n) for n in robot[0].split("=")[1].split(",")],
        [int(n) for n in robot[1].split("=")[1].split(",")],
    ] for robot in [r.split(" ") for r in raw_data.split("\n")]
]

height, width = 7, 11


matrix = [["⬛" for _ in range(width)] for _ in range(height)]

step = 0
while (True):
    step += 1
    
    matrix = [["⬛" for _ in range(width)] for _ in range(height)]
    for pos, vel in robots:
        # Update position based on velocity and wrap around the boundaries
        for i in range(2):
            pos[i] = (pos[i] + vel[i]) % [width, height][i]
        matrix[pos[1]][pos[0]] = "⬜"
        
    print(step)
    print("\n".join("".join(row) for row in matrix))
    print("\n")
    time.sleep(1)
    


