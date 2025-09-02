from itertools import product

input = """....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX"""

matrix = [list(line) for line in input.split("\n")]

def check_direction(i, j, movement_dir, matrix):
    rows, cols = len(matrix), len(matrix[0])
    
    def is_within_bounds(x, y):
        return 0 <= x < rows and 0 <= y < cols

    target_sequence = "MAS"
    
    for step, target in enumerate(target_sequence, start=1):
        x, y = i + movement_dir[0] * step, j + movement_dir[1] * step
        if not is_within_bounds(x, y) or matrix[x][y] != target:
            return 0 
    return 1 

sol = 0
for i, line in enumerate(matrix):
    for j, element in enumerate(line):
        if element != "X":
            continue  # Skip non-"X" elements

        # Check all directions except the (0, 0) stationary direction
        for m, n in ((x, y) for x, y in product([-1, 0, 1], repeat=2) if (x, y) != (0, 0)):
            if check_direction(i, j, [m, n], matrix):
                sol += 1

print(sol)
