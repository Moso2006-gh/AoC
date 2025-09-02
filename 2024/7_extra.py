raw_data = """190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20"""

sol = 0
for line in raw_data.split("\n"):
    objective, numbers = int(line.split(":")[0]), line.split(":")[1].split()
    
    for i in range(pow(2, len(numbers) - 1)):
        binary = format(i, f'0{len(numbers) - 1}b')
        
        posibility = numbers[0]
        for i in range(1, len(numbers)):
            if binary[i - 1] == "0":
                posibility += "+"
            if binary[i - 1] == "1":
                posibility += "*"
            
            posibility += numbers[i]
        
        if(eval(posibility) == objective):
            sol += objective
            break

print(sol)