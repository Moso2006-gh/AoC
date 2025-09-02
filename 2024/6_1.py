raw_data = """....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#..."""

matrix = []

pos = ()
directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
current_dir_idx = 0  # Index for the current direction

# Parse the input into a matrix
raw_data = raw_data.strip().split("\n")
for i in range(len(raw_data)):
    row = list(raw_data[i])
    if "^" in row:
        pos = (i, row.index("^"))
    matrix.append(row)

sol = 0
visited_pos = set([pos])
visited_pos_direcion = set([(directions[current_dir_idx], pos)])

inbounds = True
while inbounds:
    dir = directions[current_dir_idx]
    visited_pos.add(pos)

    # Calculate the next position
    next_row, next_col = pos[0] + dir[0], pos[1] + dir[1]

    # Check if the next position is within bounds and valid
    if 0 <= next_row < len(matrix) and 0 <= next_col < len(matrix[0]):
        if matrix[next_row][next_col] != "#":
            if (directions[(current_dir_idx + 1) % 4], pos) in visited_pos_direcion:
                sol += 1
            visited_pos_direcion.add((dir, pos))
            pos = (next_row, next_col)  # Move forward
        else:
            # Rotate direction 90 degrees to the right
            visited_pos_direcion.add((dir, pos))
            current_dir_idx = (current_dir_idx + 1) % 4
    else:
        inbounds = False

print(len(visited_pos))
print(sol)