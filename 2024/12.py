from collections import defaultdict

raw_data = """OOOOO
OXOXO
OOOOO
OXOXO
OOOOO"""

data = [list(x) for x in raw_data.split("\n")]
sol = 0
for m in range(len(data)):
    for n, ele in enumerate(data[m]):
        if ele == "#":
            continue
        
        area = 0
        sides = 0

        positions_to_check = defaultdict(set)
        positions_to_check[(m, n)] = set()
        visited_pos = set()

        while positions_to_check:
            new_positions = defaultdict(set)
            for position in positions_to_check:
                position
                carry_sides = positions_to_check[position]
                
                # Increment area
                area += 1

                # Mark the current position as visited
                visited_pos.add(position)

                new_posible_sides = []
                new_local_positions = []

                # Check all four directions
                for direction in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    new_pos = (position[0] + direction[0], position[1] + direction[1])

                    # Check if the new position is within bounds
                    if 0 <= new_pos[0] < len(data) and 0 <= new_pos[1] < len(data[0]):
                        if data[new_pos[0]][new_pos[1]] == ele:
                            # Add to new positions if it matches the element
                            if new_pos not in visited_pos:
                                new_local_positions.append(new_pos)
                        else:
                            # Increment perimeter if it's a boundary
                            new_posible_sides.append(direction)
                    else:
                        # Increment perimeter for out-of-bounds
                        new_posible_sides.append(direction)
                
                for side in new_posible_sides:
                    if side not in carry_sides:
                        sides += 1
                for pos in new_local_positions:
                    new_positions[pos].update(new_posible_sides)                
            # Update positions to check with the new positions
            positions_to_check = new_positions
        
        for pos in visited_pos:
            data[pos[0]][pos[1]] = "#"
        sol += area * sides
print(sol)

                        

