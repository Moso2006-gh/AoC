from pathlib import Path
from collections import defaultdict

input = open(Path(__file__).parent / "22.txt").read()

prune_mask = (1 << 24) - 1
def generate_next(num):
    num ^= (num << 6) & prune_mask
    num ^= (num >> 5) 
    num ^= (num << 11) & prune_mask
    return num

sum = 0
sequences_bananas = defaultdict(int)
for secret_number in [int(x) for x in input.split("\n")]:
    last_seq = []
    sequences_monkey = {}
    last_secret_number = secret_number
    for i in range(2000):
        secret_number = generate_next(secret_number)
        last_seq.append((secret_number % 10) - (last_secret_number % 10))
        if len(last_seq) == 4:
            sequence = tuple(last_seq)
            if sequence not in sequences_monkey:
                price = secret_number % 10
                sequences_monkey[sequence] = price
            last_seq.pop(0)
        last_secret_number = secret_number
    
    for key, value in sequences_monkey.items():
        sequences_bananas[key] += value
max_key = max(sequences_bananas, key=sequences_bananas.get)
print(max_key, sequences_bananas[max_key])