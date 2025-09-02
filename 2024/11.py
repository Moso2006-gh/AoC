from collections import Counter, defaultdict

raw_data = "70949 6183 4 3825336 613971 0 15 182"

# Preprocess data
stones = Counter(raw_data.split(" "))

for blink in range(75):
    new_stones = defaultdict(int)
    for stone in stones:
        stone_n = int(stone)
        if stone_n == 0:
            new_stones["1"] += stones[stone]  # Avoid string conversion
        elif len(stone) % 2 == 0:  # Check even length using modulo instead
            half = len(stone) // 2
            new_stones[str(int(stone[half:]))] += stones[stone]
            new_stones[str(int(stone[:half]))] += stones[stone]
        else:
            new_stones[str(stone_n * 2024)] += stones[stone]
    stones = new_stones

    # Optional: Monitor growth
print(sum(stones.values()))