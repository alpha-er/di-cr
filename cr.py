import argparse

level_cr_checkpoints = {
    1: 520,
    30: 1220,
    80: 2120,
    150: 3250,
    240: 5025,
    241: 5025
}

recommended_crs = []

level_checkpoints = list(level_cr_checkpoints.keys())
for lower_bound_level in level_checkpoints:
    if level_checkpoints.index(lower_bound_level) < len(level_checkpoints) - 1:
        higher_bound_level = level_checkpoints[level_checkpoints.index(lower_bound_level) + 1]
        levels = higher_bound_level - lower_bound_level

        lower_bound_cr = level_cr_checkpoints[lower_bound_level]
        upper_bound_cr = level_cr_checkpoints[higher_bound_level]
        cr_range = upper_bound_cr - lower_bound_cr
        cr_per_level = cr_range/levels

        for level in range(lower_bound_level, higher_bound_level):
            this_cr = lower_bound_cr + round((level - lower_bound_level) * cr_per_level)
            recommended_crs.append(this_cr)

def get_hell(level):
    if level < 30:
        return 'Hell I'
    elif level < 80:
        return 'Hell II'
    elif level < 150:
        return 'Hell III'
    elif level < 240:
        return 'Hell IV'
    else:
        return 'Hell V'

def get_cr(level):
    return recommended_crs[level - 1]
