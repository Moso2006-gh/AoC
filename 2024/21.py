# Learned that many times is usefull to inver the problem (start from outside to in)
# Keep in mind what they are asking, in this case we where only interested in the length

import numpy as np
from pathlib import Path
from collections import defaultdict
from functools import cache

input = open(Path(__file__).parent / "21.txt").read().split("\n")

kepad_robot_coords = {
    "9": np.array([0, 2]),
    "8": np.array([0, 1]),
    "7": np.array([0, 0]),
    "6": np.array([1, 2]),
    "5": np.array([1, 1]),
    "4": np.array([1, 0]),
    "3": np.array([2, 2]),
    "2": np.array([2, 1]),
    "1": np.array([2, 0]),
    "0": np.array([3, 1]),
    "A": np.array([3, 2])
}
robot_coords = {
    "^": np.array([0, 1]),
    "<": np.array([1, 0]),
    "v": np.array([1, 1]),
    ">": np.array([1, 2]),
    "A": np.array([0, 2])
}

sequences = ['>^A', '^A', '>A', '>>^A', 'vA', 'A', '<A', 'v<<A', '<vA', 'v<A', '<^A', '^>A', '^<A', '>vA', 'v>A']

@cache
def get_move(diff):
    move_vertical = "^" if diff[0] < 0 else "v"
    move_vertical *= abs(diff[0])

    move_horizontal = "<" if diff[1] < 0 else ">"
    move_horizontal *= abs(diff[1])

    return move_vertical, move_horizontal

@cache
def get_robot_paths(path):    
    robot = "A"
    robot_paths = []
    for char in path:
        diff = tuple(robot_coords[char] - robot_coords[robot])  # Ensure it's a tuple
        move_vertical, move_horizontal = get_move(diff)
        
        char_paths = set()
        if not ((robot == "^" or robot == "A") and char == "<"):
            char_paths.add(move_horizontal + move_vertical + "A")
        if not ((char == "^" or char == "A") and robot == "<"):
            char_paths.add(move_vertical + move_horizontal + "A")
        
        robot_paths.append(list(char_paths))        
        robot = char
    return robot_paths

def get_cost(seg, sequences_cost):
    cost = 0
    for segment in get_robot_paths(seg):
        shortest = np.inf
        for posible in segment:
            cost_of_posible = sequences_cost[posible]
            if cost_of_posible < shortest:
                shortest = cost_of_posible
        cost += shortest
    return cost

def main(n_robots):
    sequences_cost = {x: len(x) for x in sequences}
    for n in range(n_robots - 1):
        new_sequence_cost = defaultdict(int)
        for sequence in sequences:
            new_sequence_cost[sequence] = get_cost(sequence, sequences_cost)
        sequences_cost = new_sequence_cost 

    sol = 0
    for code in input:
        kepad_robot = "A"
        length_of_seq = 0
        for char in code:
            diff = kepad_robot_coords[char] - kepad_robot_coords[kepad_robot]
            
            move_vertical, move_horizontal = get_move(tuple(diff))

            posible = set()
            if not (kepad_robot in ["7", "4", "1"] and char in ["0", "A"]):
                posible.add(move_vertical + move_horizontal + "A")
            if not (char in ["7", "4", "1"] and kepad_robot in ["0", "A"]):
                posible.add(move_horizontal + move_vertical + "A")
            kepad_robot = char

            shortest = np.inf
            for path in posible:
                cost = get_cost(path, sequences_cost)
                if cost < shortest:
                    shortest = cost

            length_of_seq += shortest
        sol += length_of_seq * int(code[:-1])

    return sol

print(main(2))
print(main(25))
