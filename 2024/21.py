raw_data = """341A
803A
149A
683A
208A"""

robot_1_coords = {
    "9": [0, 2],
    "8": [0, 1],
    "7": [0, 0],
    "6": [1, 2],
    "5": [1, 1],
    "4": [1, 0],
    "3": [2, 2],
    "2": [2, 1],
    "1": [2, 0],
    "0": [3, 1],
    "A": [3, 2]
}
robot_2_3_coords = {
    "^": [0, 1],
    "<": [1, 0],
    "v": [1, 1],
    ">": [1, 2],
    "A": [0, 2]
}

first_level_incoding = []

def encode(code, robot_initial_pos, coords, hole_id):
    possible_sequences = [""]
    robot = robot_initial_pos
    for i, char in enumerate(list(code)):
        new_possible_sequences = []

        char_coord = coords[char]
        move = [char_coord[0] - robot[0], char_coord[1] - robot[1]]
        vertical_seq = ("^" if move[0] < 0 else "v") * abs(move[0])
        horizontal_seq = (">" if move[1] > 0 else "<") * abs(move[1])

        if (hole_id == 0 and move[0] > 0 and robot[0] == 0) or (hole_id == 1 and move[0] < 0 and char_coord[1] == 0 and robot[0] == 3):
            for sequence in possible_sequences:
                if (sequence + vertical_seq + horizontal_seq + "A") not in new_possible_sequences:
                    new_possible_sequences.append(sequence + vertical_seq + horizontal_seq + "A")
        else:
            for sequence in possible_sequences:
                if (sequence + vertical_seq + horizontal_seq + "A") not in new_possible_sequences:
                new_possible_sequences.append(sequence + vertical_seq + horizontal_seq + "A")
                new_possible_sequences.append(sequence + horizontal_seq + vertical_seq + "A")
            
        possible_sequences = new_possible_sequences
        robot = char_coord
    return possible_sequences

sol = 0
for code in raw_data.split("\n"):
    print(code)
    smallest_length = float("inf")
    first_encoding_sequences = encode(code, [3, 2], robot_1_coords, 1)
    for sequence in first_encoding_sequences:
        second_encoding_sequences = encode(sequence, [0, 2], robot_2_3_coords, 0)

        for sequence_2 in second_encoding_sequences:
            third_encoding_sequences = encode(sequence_2, [0, 2], robot_2_3_coords, 0)
            for sequence_3 in third_encoding_sequences:
                if smallest_length > len(sequence_3):
                    smallest_length = len(sequence_3)

    sol += int(code.split("A")[0]) * smallest_length
print(sol)       

