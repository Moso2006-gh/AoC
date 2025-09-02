#include <iostream>
#include <vector>
#include <string>

int main() {
    std::string raw_data = "70949 6183 4 3825336 613971 0 15 182";

    // Preprocess data
    std::vector<int> stones;
    size_t start = 0, end;
    while ((end = raw_data.find(" ", start)) != std::string::npos) {
        stones.push_back(std::stoi(raw_data.substr(start, end - start)));
        start = end + 1;
    }
    stones.push_back(std::stoi(raw_data.substr(start)));

    for (int blink = 0; blink < 75; ++blink) {
        std::vector<int> new_stones;
        for (int stone : stones) {
            if (stone == 0) {
                new_stones.push_back(1);
            } else {
                std::string str_stone = std::to_string(stone);
                if (str_stone.length() % 2 == 0) {
                    int half = str_stone.length() / 2;
                    new_stones.push_back(std::stoi(str_stone.substr(half)));
                    new_stones.push_back(std::stoi(str_stone.substr(0, half)));
                } else {
                    new_stones.push_back(stone * 2024);
                }
            }
        }
        stones = std::move(new_stones);

        // Optional: Monitor growth
        std::cout << "Iteration " << blink + 1 << ": " << stones.size() << " stones\n";
    }

    std::cout << stones.size() << std::endl;
    return 0;
}