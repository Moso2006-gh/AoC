# Setup
class Ref:
    def __init__(self, value):
        self.value = value

A = Ref(0)
B = Ref(0)
C = Ref(0)
combo = [
    Ref(0),
    Ref(1),
    Ref(2),
    Ref(3),
    Ref(A),
    Ref(B),
    Ref(C)
]

program = []
pointer = 0

with open("./17.txt", "r") as file:
    for i, line in enumerate(file):
        if line == "\n":
            continue
        data = line.split(": ")[1]
        match i:
            case 0:
                A.value = int(data)
            case 1:
                B.value = int(data)
            case 2:
                C.value = int(data)
            case _:
                program = [int(x) for x in data.split(",")]

def adv(operand): # 0
    A.value = int(A.value / pow(2, combo[operand].value))

def bxl(operand): # 1
    B.value = B.value ^ operand

def bst(operand): # 2
    B.value = combo[operand].value

def jnz(operand): # 3
    global pointer

    if not A.value:
        return
    pointer = operand - 2

def bxc(operand): #4
    B.value = B.value ^ C.value

instruction = [
    adv,
    bxl,
    bst,
    jnz
]

while True:
    opcode = program[i]
    operand = program[i + 1]
    
    pointer += 2

    
