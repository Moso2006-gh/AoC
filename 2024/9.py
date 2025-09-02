raw_data = "2333133121414131402"

data = [int(x) for x in list(raw_data)]

only_numbers = []
complete_sequence = []
for i, ele in enumerate(data):
    if(i % 2 == 0):
        only_numbers.extend([i / 2] * ele)
        complete_sequence.extend(([i / 2] * ele))
    else:
        complete_sequence.extend(["."] * ele)

print(only_numbers)
print(complete_sequence)

sol = 0
for i in range(len(complete_sequence)):
    if complete_sequence[i] == ".":    
        sol += i * only_numbers[-1]
        only_numbers = only_numbers[:-1]
    else:
        sol += i * only_numbers[0]
        only_numbers = only_numbers[1:]

    if len(only_numbers) == 0:
        break

print(complete_sequence)
print(sol)