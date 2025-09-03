import re
import itertools
import numpy as np
from pathlib import Path
from typing import List
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
    # posible_paths = []
    robot_path = ""
    for char in path:
        diff = tuple(robot_coords[char] - robot_coords[robot])  # Ensure it's a tuple
        move_vertical, move_horizontal = get_move(diff)
        # char_paths = set()
        # if not ((robot == "^" or robot == "A") and char == "<"):
        #     char_paths.add(move_horizontal + move_vertical + "A")
        # if not ((char == "^" or char == "A") and robot == "<"):
        #     char_paths.add(move_vertical + move_horizontal + "A")
        
        if not ((robot == "^" or robot == "A") and char == "<"):
            robot_path += move_horizontal + move_vertical + "A"
        else:
            robot_path += move_vertical + move_horizontal + "A"

        # posible_paths.append(list(char_paths))        
        robot = char
    return robot_path

def get_all_paths(posible_paths):
    return [''.join(p) for p in itertools.product(*posible_paths)]

def apply_robot(paths: List[str]):
    all_robot_paths = []
    shortest = np.inf
    for path in paths:
        robot_path = ""
        for sub_path in re.findall(r'.*?A', path):
            robot_path += get_robot_paths(sub_path)
        robot_paths = [robot_path]
        for robot_path in robot_paths:
            if len(robot_path) < shortest:
                all_robot_paths = [robot_path]
                shortest = len(robot_path)
            elif len(robot_path) == shortest:
                all_robot_paths.append(robot_path)
    return all_robot_paths

sol = 0
for code in input:
    print(code)
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

        robot_paths = posible
        for i in range(25):
            print(i)
            robot_paths = apply_robot(robot_paths)

        shortest = np.inf
        for path in robot_paths:
            if len(path) < shortest:
                shortest = len(path)

        length_of_seq += shortest
    sol += length_of_seq * int(code[:-1])

print(sol)

# <vA <A A >>^A vA A <^A >A   v<<A >>^A vA ^A     v<<A >>^A A <vA >A ^A ((vA<A^>A))<A>A  v<<A >A ^>A (<vA<A>>^A)AA<Av>A^AvA<^A>A
