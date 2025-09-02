total_residues = cmd.count_atoms('name CA')  
outside_count = cmd.count_atoms('(not alpha) and (not beta) and name CA')
percentage_outside = (outside_count / total_residues) * 100

print(f"Percentage of residues outside alpha helices and beta strands: {percentage_outside:.2f}%")
