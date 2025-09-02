from pathlib import Path

def part1(A_value=0, B_value=0, C_value=0, program=""):
    class Ref:
        def __init__(self, value):
            self.value = value

    A = Ref(A_value)
    B = Ref(B_value)
    C = Ref(C_value)
    combo = [
        Ref(0), # 0
        Ref(1), # 1
        Ref(2), # 2
        Ref(3), # 3
        A,      # 4
        B,      # 5
        C       # 6
    ]
    
    pointer = 0
    
    def adv(operand): # 0
        A.value = A.value >> combo[operand].value

    def bxl(operand): # 1
        B.value = B.value ^ operand

    def bst(operand): # 2
        B.value = combo[operand].value % 8

    def jnz(operand): # 3
        nonlocal pointer
        if not A.value:
            return
        pointer = operand - 2

    def bxc(operand): #4
        B.value = B.value ^ C.value % 8

    def out(operand): #5
        output.append(combo[operand].value % 8)

    def bdv(operand): #6
        B.value = (A.value >> combo[operand].value) % 8

    def cdv(operand): #7
        C.value = (A.value >> combo[operand].value) % 8

    instruction = [adv, bxl, bst, jnz, bxc, out, bdv, cdv]
    
    output = []
    while pointer < len(program):
        opcode = program[pointer]
        operand = program[pointer + 1]
        instruction[opcode](operand)
        
        pointer += 2
    return output
   
def part2(program):     
    posibilities = [0]
    for t, target in enumerate(program):
        new_posibilities = []
        for posible in posibilities:
            for b_org in range(8):  
                b = b_org
                b ^= 3
                C_pos = 3 * t + b
                b ^= 4
                c = target ^ b
                
                mask = ~(0b111 << C_pos)
                new_posible = (posible & mask) | (c << C_pos)

                mask = ~(0b111 << (3 * t))
                new_posible = (new_posible & mask) | (b_org << (3 * t))
                
                test = part1(new_posible, program=program)
                if test[:(t+1)] == program[:(t+1)] and len(test) <= len(program):
                    new_posibilities.append(new_posible)
        posibilities = new_posibilities

    return sorted(posibilities)[0]



program = a = b = c = 0

here = Path(__file__).parent 
file_path = here / "17.txt"
with open(file_path, "r") as file:
    for i, line in enumerate(file):
        if line == "\n":
            continue
        data = line.split(": ")[1]
        match i:
            case 0:
                a = int(data)
            case 1:
                b = int(data)
            case 2:
                c = int(data)
            case _:
                program = [int(x) for x in data.split(",")]      

print(",".join([str(x) for x in part1(a, b, c, program)]))
print(part2(program))