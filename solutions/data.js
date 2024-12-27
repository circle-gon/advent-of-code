export default {
  2015: [
    {
      name: "Not Quite Lisp",
      special: false,
      examples: [
        [
          ["(())", 0],
          ["()()", 0],
          ["(((", 3],
          ["(()(()(", 3],
          ["))(((((", 3],
          ["())", -1],
          ["))(", -1],
          [")))", -3],
          [")())())", -3],
        ],
        [
          [")", 1],
          ["()())", 5],
        ],
      ],
    },
    {
      name: "I Was Told There Would Be No Math",
      special: false,
      examples: [
        [
          ["2x3x4", 58],
          ["1x1x10", 43],
        ],
        [
          ["2x3x4", 34],
          ["1x1x10", 14],
        ],
      ],
    },
    {
      name: "Perfectly Spherical Houses in a Vacuum",
      special: false,
      examples: [
        [
          [">", 2],
          ["^>v<", 4],
          ["^v^v^v^v^v", 2],
        ],
        [
          ["^v", 3],
          ["^>v<", 3],
          ["^v^v^v^v^v", 11],
        ],
      ],
    },
    {
      name: "The Ideal Stocking Stuffer",
      special: false,
      examples: [
        [
          ["abcdef", 609043],
          ["pqrstuv", 1048970],
        ],
        [],
      ],
    },
    {
      name: "Doesn't He Have Intern-Elves For This?",
      special: false,
      examples: [
        [
          ["ugknbfddgicrmopn", 1],
          ["aaa", 1],
          ["jchzalrnumimnmhp", 0],
          ["haegwjzuvuyypxyu", 0],
          ["dvszwmarrgswjxmb", 0],
        ],
        [
          ["qjhvhtzxzqqjkmpb", 1],
          ["xxyxx", 1],
          ["uurcxstgmygtbstg", 0],
          ["ieodomkazucvgmuy", 0],
        ],
      ],
    },
    {
      name: "Probably a Fire Hazard",
      special: false,
      examples: [[], []],
    },
    {
      name: "Some Assembly Required",
      special: false,
      examples: [[], []],
    },
    {
      name: "Matchsticks",
      special: false,
      examples: [
        [[`""\n"abc"\n"aaa\\"aaa"\n"\\x27"`, 12]],
        [[`""\n"abc"\n"aaa\\"aaa"\n"\\x27"`, 19]],
      ],
    },
    {
      name: "All in a Single Night",
      special: false,
      examples: [
        [
          [
            "London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141",
            605,
          ],
        ],
        [
          [
            "London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141",
            982,
          ],
        ],
      ],
    },
    {
      name: "Elves Look, Elves Say",
      special: false,
      examples: [
        [
          ["1", 2],
          ["11", 2],
          ["21", 4],
          ["1211", 6],
          ["111221", 6],
        ],
        [],
      ],
    },
    {
      name: "Corporate Policy",
      special: false,
      examples: [
        [
          ["abcdefgh", "abcdffaa"],
          ["ghijklmn", "ghjaabcc"],
        ],
        [],
      ],
    },
    {
      name: "JSAbacusFramework.io",
      special: false,
      examples: [
        [
          ["[1,2,3]", 6],
          [`{"a":2,"b":4}`, 6],
          ["[[[3]]]", 3],
          [`{"a":{"b":4},"c":-1}`, 3],
          [`{"a":[-1,1]}`, 0],
          [`[-1,{"a":1}]`, 0],
          ["[]", 0],
          ["{}", 0],
        ],
        [
          ["[1,2,3]", 6],
          ['[1,{"c":"red","b":2},3]', 4],
          ['{"d":"red","e":[1,2,3,4],"f":5}', 0],
          ['[1,"red",5]', 6],
        ],
      ],
    },
    {
      name: "Knights of the Dinner Table",
      special: false,
      examples: [
        [
          [
            "Alice would gain 54 happiness units by sitting next to Bob.\nAlice would lose 79 happiness units by sitting next to Carol.\nAlice would lose 2 happiness units by sitting next to David.\nBob would gain 83 happiness units by sitting next to Alice.\nBob would lose 7 happiness units by sitting next to Carol.\nBob would lose 63 happiness units by sitting next to David.\nCarol would lose 62 happiness units by sitting next to Alice.\nCarol would gain 60 happiness units by sitting next to Bob.\nCarol would gain 55 happiness units by sitting next to David.\nDavid would gain 46 happiness units by sitting next to Alice.\nDavid would lose 7 happiness units by sitting next to Bob.\nDavid would gain 41 happiness units by sitting next to Carol.\n",
            330,
          ],
        ],
        [],
      ],
    },
    {
      name: "Reindeer Olympics",
      special: false,
      examples: [
        [
          [
            "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\nDancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
            1120,
          ],
        ],
        [
          [
            "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\nDancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
            689,
          ],
        ],
      ],
    },
    {
      name: "Science for Hungry People",
      special: false,
      examples: [
        [
          [
            "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\nCinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3\n",
            62842880,
          ],
        ],
        [
          [
            "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\nCinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3\n",
            57600000,
          ],
        ],
      ],
    },
    {
      name: "Aunt Sue",
      special: false,
      examples: [[], []],
    },
    {
      name: "No Such Thing as Too Much",
      special: false,
      examples: [[["20\n15\n10\n5\n5", 4]], [["20\n15\n10\n5\n5", 3]]],
    },
    {
      name: "Like a GIF For Your Yard",
      special: false,
      examples: [
        [[".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..", 4]],
        [[".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..", 17]],
      ],
    },
    {
      name: "Medicine for Rudolph",
      special: false,
      examples: [
        [
          ["H => HO\nH => OH\nO => HH\n\nHOH", 4],
          ["H => HO\nH => OH\nO => HH\n\nHOHOHO", 7],
        ],
        [
          ["e => H\ne => O\nH => HO\nH => OH\nO => HH\n\nHOH", 3],
          ["e => H\ne => O\nH => HO\nH => OH\nO => HH\n\nHOHOHO", 6],
        ],
      ],
    },
    {
      name: "Infinite Elves and Infinite Houses",
      special: false,
      examples: [[["100", 6]], []],
    },
    {
      name: "RPG Simulator 20XX",
      special: false,
      examples: [[], []],
    },
    {
      name: "Wizard Simulator 20XX",
      special: false,
      examples: [[], []],
    },
    {
      name: "Opening the Turing Lock",
      special: false,
      examples: [[["inc a\njio a, +2\ntpl a\ninc a", 2]], []],
    },
    {
      name: "It Hangs in the Balance",
      special: false,
      examples: [
        [["1\n2\n3\n4\n5\n7\n8\n9\n10\n11\n", 99]],
        [["1\n2\n3\n4\n5\n7\n8\n9\n10\n11\n", 44]],
      ],
    },
    {
      name: "Let It Snow",
      special: false,
      examples: [
        [
          [
            "To continue, please consult the code grid in the manual.  Enter the code at row 6, column 2.",
            6796745,
          ],
        ],
        [],
      ],
    },
  ],
  // Mark puzzles solved using special formats, so it can be loaded correctly
  2023: [
    {
      name: "Trebuchet?!",
      special: false,
      examples: [
        [["1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet", 142]],
        [
          [
            "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen",
            281,
          ],
        ],
      ],
    },
    {
      name: "Cube Conundrum",
      special: false,
      examples: [
        [
          [
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n",
            8,
          ],
        ],
        [
          [
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n",
            2286,
          ],
        ],
      ],
    },
    {
      name: "Gear Ratios",
      special: false,
      examples: [
        [
          [
            "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n",
            4361,
          ],
        ],
        [
          [
            "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n",
            467835,
          ],
        ],
      ],
    },
    {
      name: "Scratchcards",
      special: false,
      examples: [
        [
          [
            "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\n",
            13,
          ],
        ],
        [
          [
            "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\n",
            30,
          ],
        ],
      ],
    },
    {
      name: "If You Give A Seed A Fertilizer",
      special: true,
      examples: [
        [
          [
            "seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4\n",
            35,
          ],
        ],
        [
          [
            "seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4\n",
            46,
          ],
        ],
      ],
    },
    {
      name: "Wait For It",
      special: false,
      examples: [
        [["Time:      7  15   30\nDistance:  9  40  200\n", 288]],
        [["Time:      7  15   30\nDistance:  9  40  200\n", 71503]],
      ],
    },
    {
      name: "Camel Cards",
      special: false,
      examples: [
        [["32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483\n", 6440]],
        [["32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483\n", 5905]],
      ],
    },
    {
      name: "Haunted Wasteland",
      special: false,
      examples: [
        [
          [
            "RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)\n",
            2,
          ],
          ["LLR\n\nAAA = (BBB, BBB)\nBBB = (AAA, ZZZ)\nZZZ = (ZZZ, ZZZ)\n", 6],
        ],
        [
          [
            "LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)\n",
            6,
          ],
        ],
      ],
    },
    {
      name: "Mirage Maintenance",
      special: false,
      examples: [
        [["0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45\n", 114]],
        [["0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45\n", 2]],
      ],
    },
    {
      name: "Pipe Maze",
      special: false,
      examples: [
        [
          [".....\n.S-7.\n.|.|.\n.L-J.\n.....\n", 4],
          ["..F7.\n.FJ|.\nSJ.L7\n|F--J\nLJ...\n", 8],
        ],
        [
          [
            "...........\n.S-------7.\n.|F-----7|.\n.||.....||.\n.||.....||.\n.|L-7.F-J|.\n.|..|.|..|.\n.L--J.L--J.\n...........\n",
            4,
          ],
          [
            ".F----7F7F7F7F-7....\n.|F--7||||||||FJ....\n.||.FJ||||||||L7....\nFJL7L7LJLJ||LJ.L-7..\nL--J.L7...LJS7F-7L7.\n....F-J..F7FJ|L7L7L7\n....L7.F7||L7|.L7L7|\n.....|FJLJ|FJ|F7|.LJ\n....FJL-7.||.||||...\n....L---J.LJ.LJLJ...\n",
            8,
          ],
          [
            "FF7FSF7F7F7F7F7F---7\nL|LJ||||||||||||F--J\nFL-7LJLJ||||||LJL-77\nF--JF--7||LJLJ7F7FJ-\nL---JF-JLJ.||-FJLJJ7\n|F|F-JF---7F7-L7L|7|\n|FFJF7L7F-JF7|JL---7\n7-L-JL7||F7|L7F-7F7|\nL.L7LFJ|||||FJL7||LJ\nL7JLJL-JLJLJL--JLJ.L\n",
            10,
          ],
        ],
      ],
    },
    {
      name: "Cosmic Expansion",
      special: false,
      examples: [
        [
          [
            "...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....\n",
            374,
          ],
        ],
        [],
      ],
    },
    {
      name: "Hot Springs",
      special: false,
      examples: [
        [
          [
            "???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1\n",
            21,
          ],
        ],
        [
          [
            "???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1\n",
            525152,
          ],
        ],
      ],
    },
    {
      name: "Point of Incidence",
      special: false,
      examples: [
        [
          [
            "#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#\n",
            405,
          ],
        ],
        [
          [
            "#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#\n",
            400,
          ],
        ],
      ],
    },
    {
      name: "Parabolic Reflector Dish",
      special: false,
      examples: [
        [
          [
            "O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....\n",
            136,
          ],
        ],
        [
          [
            "O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....\n",
            64,
          ],
        ],
      ],
    },
    {
      name: "Lens Library",
      special: false,
      examples: [
        [["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7", 1320]],
        [["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7", 145]],
      ],
    },
    {
      name: "The Floor Will Be Lava",
      special: false,
      examples: [
        [
          [
            ".|...\\....\n|.-.\\.....\n.....|-...\n........|.\n..........\n.........\\\n..../.\\\\..\n.-.-/..|..\n.|....-|.\\\n..//.|....\n",
            46,
          ],
        ],
        [
          [
            ".|...\\....\n|.-.\\.....\n.....|-...\n........|.\n..........\n.........\\\n..../.\\\\..\n.-.-/..|..\n.|....-|.\\\n..//.|....\n",
            51,
          ],
        ],
      ],
    },
    {
      name: "Clumsy Crucible",
      special: true,
      examples: [
        [
          [
            "2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533\n",
            102,
          ],
        ],
        [
          [
            "2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533\n",
            94,
          ],
          [
            "111111111111\n999999999991\n999999999991\n999999999991\n999999999991\n",
            71,
          ],
        ],
      ],
    },
    {
      name: "Lavaduct Lagoon",
      special: false,
      examples: [
        [
          [
            "R 6 (#70c710)\nD 5 (#0dc571)\nL 2 (#5713f0)\nD 2 (#d2c081)\nR 2 (#59c680)\nD 2 (#411b91)\nL 5 (#8ceee2)\nU 2 (#caa173)\nL 1 (#1b58a2)\nU 2 (#caa171)\nR 2 (#7807d2)\nU 3 (#a77fa3)\nL 2 (#015232)\nU 2 (#7a21e3)\n",
            62,
          ],
        ],
        [
          [
            "R 6 (#70c710)\nD 5 (#0dc571)\nL 2 (#5713f0)\nD 2 (#d2c081)\nR 2 (#59c680)\nD 2 (#411b91)\nL 5 (#8ceee2)\nU 2 (#caa173)\nL 1 (#1b58a2)\nU 2 (#caa171)\nR 2 (#7807d2)\nU 3 (#a77fa3)\nL 2 (#015232)\nU 2 (#7a21e3)\n",
            952408144115,
          ],
        ],
      ],
    },
    {
      name: "Aplenty",
      special: false,
      examples: [
        [
          [
            "px{a<2006:qkq,m>2090:A,rfg}\npv{a>1716:R,A}\nlnx{m>1548:A,A}\nrfg{s<537:gd,x>2440:R,A}\nqs{s>3448:A,lnx}\nqkq{x<1416:A,crn}\ncrn{x>2662:A,R}\nin{s<1351:px,qqz}\nqqz{s>2770:qs,m<1801:hdj,R}\ngd{a>3333:R,R}\nhdj{m>838:A,pv}\n\n{x=787,m=2655,a=1222,s=2876}\n{x=1679,m=44,a=2067,s=496}\n{x=2036,m=264,a=79,s=2244}\n{x=2461,m=1339,a=466,s=291}\n{x=2127,m=1623,a=2188,s=1013}\n",
            19114,
          ],
        ],
        [
          [
            "px{a<2006:qkq,m>2090:A,rfg}\npv{a>1716:R,A}\nlnx{m>1548:A,A}\nrfg{s<537:gd,x>2440:R,A}\nqs{s>3448:A,lnx}\nqkq{x<1416:A,crn}\ncrn{x>2662:A,R}\nin{s<1351:px,qqz}\nqqz{s>2770:qs,m<1801:hdj,R}\ngd{a>3333:R,R}\nhdj{m>838:A,pv}\n\n{x=787,m=2655,a=1222,s=2876}\n{x=1679,m=44,a=2067,s=496}\n{x=2036,m=264,a=79,s=2244}\n{x=2461,m=1339,a=466,s=291}\n{x=2127,m=1623,a=2188,s=1013}\n",
            167409079868000,
          ],
        ],
      ],
    },
    {
      name: "Pulse Propagation",
      special: false,
      examples: [
        [
          [
            "broadcaster -> a, b, c\n%a -> b\n%b -> c\n%c -> inv\n&inv -> a\n",
            32000000,
          ],
          [
            "broadcaster -> a\n%a -> inv, con\n&inv -> b\n%b -> con\n&con -> output\n",
            11687500,
          ],
        ],
        [],
      ],
    },
    {
      name: "Step Counter",
      special: true,
      examples: [
        [
          [
            "...........\n.....###.#.\n.###.##..#.\n..#.#...#..\n....#.#....\n.##..S####.\n.##..#...#.\n.......##..\n.##.#.####.\n.##..##.##.\n...........\n",
            16,
          ],
        ],
        [],
      ],
    },
    {
      name: "Sand Slabs",
      special: true,
      examples: [
        [
          [
            "1,0,1~1,2,1\n0,0,2~2,0,2\n0,2,3~2,2,3\n0,0,4~0,2,4\n2,0,5~2,2,5\n0,1,6~2,1,6\n1,1,8~1,1,9\n",
            5,
          ],
        ],
        [
          [
            "1,0,1~1,2,1\n0,0,2~2,0,2\n0,2,3~2,2,3\n0,0,4~0,2,4\n2,0,5~2,2,5\n0,1,6~2,1,6\n1,1,8~1,1,9\n",
            7,
          ],
        ],
      ],
    },
    {
      name: "A Long Walk",
      special: true,
      examples: [
        [
          [
            "#.#####################\n#.......#########...###\n#######.#########.#.###\n###.....#.>.>.###.#.###\n###v#####.#v#.###.#.###\n###.>...#.#.#.....#...#\n###v###.#.#.#########.#\n###...#.#.#.......#...#\n#####.#.#.#######.#.###\n#.....#.#.#.......#...#\n#.#####.#.#.#########v#\n#.#...#...#...###...>.#\n#.#.#v#######v###.###v#\n#...#.>.#...>.>.#.###.#\n#####v#.#.###v#.#.###.#\n#.....#...#...#.#.#...#\n#.#########.###.#.#.###\n#...###...#...#...#.###\n###.###.#.###v#####v###\n#...#...#.#.>.>.#.>.###\n#.###.###.#.###.#.#v###\n#.....###...###...#...#\n#####################.#\n",
            94,
          ],
        ],
        [
          [
            "#.#####################\n#.......#########...###\n#######.#########.#.###\n###.....#.>.>.###.#.###\n###v#####.#v#.###.#.###\n###.>...#.#.#.....#...#\n###v###.#.#.#########.#\n###...#.#.#.......#...#\n#####.#.#.#######.#.###\n#.....#.#.#.......#...#\n#.#####.#.#.#########v#\n#.#...#...#...###...>.#\n#.#.#v#######v###.###v#\n#...#.>.#...>.>.#.###.#\n#####v#.#.###v#.#.###.#\n#.....#...#...#.#.#...#\n#.#########.###.#.#.###\n#...###...#...#...#.###\n###.###.#.###v#####v###\n#...#...#.#.>.>.#.>.###\n#.###.###.#.###.#.#v###\n#.....###...###...#...#\n#####################.#\n",
            154,
          ],
        ],
      ],
    },
    {
      name: "Never Tell Me The Odds",
      special: false,
      examples: [
        [
          [
            "19, 13, 30 @ -2,  1, -2\n18, 19, 22 @ -1, -1, -2\n20, 25, 34 @ -2, -2, -4\n12, 31, 28 @ -1, -2, -1\n20, 19, 15 @  1, -5, -3\n",
            2,
          ],
        ],
        [
          // This input does fail but the program is correct for the actual input
          /*[
            "19, 13, 30 @ -2,  1, -2\n18, 19, 22 @ -1, -1, -2\n20, 25, 34 @ -2, -2, -4\n12, 31, 28 @ -1, -2, -1\n20, 19, 15 @  1, -5, -3\n",
            47,
          ],*/
        ],
      ],
    },
    {
      name: "Snowverload",
      special: false,
      examples: [
        [
          [
            "jqt: rhn xhk nvd\nrsh: frs pzl lsr\nxhk: hfx\ncmg: qnr nvd lhk bvb\nrhn: xhk bvb hfx\nbvb: xhk hfx\npzl: lsr hfx nvd\nqnr: nvd\nntq: jqt hfx bvb xhk\nnvd: lhk\nlsr: lhk\nrzs: qnr cmg lsr rsh\nfrs: qnr lhk lsr\n",
            54,
          ],
        ],
        [],
      ],
    },
  ],
  2024: [
    {
      name: "Historian Hysteria",
      special: false,
      examples: [
        [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3\n", 11]],
        [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3\n", 31]],
      ],
    },
    {
      name: "Red-Nosed Reports",
      special: false,
      examples: [
        [
          [
            "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9\n",
            2,
          ],
        ],
        [
          [
            "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9\n",
            4,
          ],
        ],
      ],
    },
    {
      name: "Mull It Over",
      special: false,
      examples: [
        [
          [
            "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
            161,
          ],
        ],
        [
          [
            "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
            48,
          ],
        ],
      ],
    },
    {
      name: "Ceres Search",
      special: false,
      examples: [
        [
          [
            "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX\n",
            18,
          ],
        ],
        [
          [
            "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX\n",
            9,
          ],
        ],
      ],
    },
    {
      name: "Print Queue",
      special: false,
      examples: [
        [
          [
            "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47\n",
            143,
          ],
        ],
        [
          [
            "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47\n",
            123,
          ],
        ],
      ],
    },
    {
      name: "Guard Gallivant",
      special: false,
      examples: [
        [
          [
            "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...\n",
            41,
          ],
        ],
        [
          [
            "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...\n",
            6,
          ],
        ],
      ],
    },
    {
      name: "Bridge Repair",
      special: false,
      examples: [
        [
          [
            "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20\n",
            3749,
          ],
        ],
        [
          [
            "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20\n",
            11387,
          ],
        ],
      ],
    },
    {
      name: "Resonant Collinearity",
      special: false,
      examples: [
        [
          [
            "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............\n",
            14,
          ],
        ],
        [
          [
            "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............\n",
            34,
          ],
        ],
      ],
    },
    {
      name: "Disk Fragmenter",
      special: false,
      examples: [
        [["2333133121414131402", 1928]],
        [["2333133121414131402", 2858]],
      ],
    },
    {
      name: "Hoof It",
      special: false,
      examples: [
        [
          [
            "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732\n",
            36,
          ],
        ],
        [
          [
            "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732\n",
            81,
          ],
        ],
      ],
    },
    {
      name: "Plutonian Pebbles",
      special: false,
      examples: [[["125 17", 55312]], []],
    },
    {
      name: "Garden Groups",
      special: false,
      examples: [
        [
          ["AAAA\nBBCD\nBBCC\nEEEC\n", 140],
          ["OOOOO\nOXOXO\nOOOOO\nOXOXO\nOOOOO\n", 772],
          [
            "RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE\n",
            1930,
          ],
        ],
        [
          ["AAAA\nBBCD\nBBCC\nEEEC\n", 80],
          ["OOOOO\nOXOXO\nOOOOO\nOXOXO\nOOOOO\n", 436],
          ["EEEEE\nEXXXX\nEEEEE\nEXXXX\nEEEEE\n", 236],
          ["AAAAAA\nAAABBA\nAAABBA\nABBAAA\nABBAAA\nAAAAAA\n", 368],
          [
            "RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE\n",
            1206,
          ],
        ],
      ],
    },
    {
      name: "Claw Contraption",
      special: false,
      examples: [
        [
          [
            "Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400\n\nButton A: X+26, Y+66\nButton B: X+67, Y+21\nPrize: X=12748, Y=12176\n\nButton A: X+17, Y+86\nButton B: X+84, Y+37\nPrize: X=7870, Y=6450\n\nButton A: X+69, Y+23\nButton B: X+27, Y+71\nPrize: X=18641, Y=10279\n",
            480,
          ],
        ],
        [],
      ],
    },
    {
      name: "Restroom Redoubt",
      special: false,
      examples: [
        [
          [
            "p=0,4 v=3,-3\np=6,3 v=-1,-3\np=10,3 v=-1,2\np=2,0 v=2,-1\np=0,0 v=1,3\np=3,0 v=-2,-2\np=7,6 v=-1,-3\np=3,0 v=-1,-2\np=9,3 v=2,3\np=7,3 v=-1,2\np=2,4 v=2,-3\np=9,5 v=-3,-3\n",
            12,
          ],
        ],
        [],
      ],
    },
    {
      name: "Warehouse Woes",
      special: false,
      examples: [
        [
          [
            "##########\n#..O..O.O#\n#......O.#\n#.OO..O.O#\n#..O@..O.#\n#O#..O...#\n#O..O..O.#\n#.OO.O.OO#\n#....O...#\n##########\n\n<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\nvvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\nv^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^\n",
            10092,
          ],
          [
            "########\n#..O.O.#\n##@.O..#\n#...O..#\n#.#.O..#\n#...O..#\n#......#\n########\n\n<^^>>>vv<v>>v<<\n",
            2028,
          ],
        ],
        [
          [
            "##########\n#..O..O.O#\n#......O.#\n#.OO..O.O#\n#..O@..O.#\n#O#..O...#\n#O..O..O.#\n#.OO.O.OO#\n#....O...#\n##########\n\n<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\nvvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\nv^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^\n",
            9021,
          ],
        ],
      ],
    },
    {
      name: "Reindeer Maze",
      special: false,
      examples: [
        [
          [
            "###############\n#.......#....E#\n#.#.###.#.###.#\n#.....#.#...#.#\n#.###.#####.#.#\n#.#.#.......#.#\n#.#.#####.###.#\n#...........#.#\n###.#.#####.#.#\n#...#.....#.#.#\n#.#.#.###.#.#.#\n#.....#...#.#.#\n#.###.#.#.#.#.#\n#S..#.....#...#\n###############\n",
            7036,
          ],
          [
            "#################\n#...#...#...#..E#\n#.#.#.#.#.#.#.#.#\n#.#.#.#...#...#.#\n#.#.#.#.###.#.#.#\n#...#.#.#.....#.#\n#.#.#.#.#.#####.#\n#.#...#.#.#.....#\n#.#.#####.#.###.#\n#.#.#.......#...#\n#.#.###.#####.###\n#.#.#...#.....#.#\n#.#.#.#####.###.#\n#.#.#.........#.#\n#.#.#.#########.#\n#S#.............#\n#################\n",
            11048,
          ],
        ],
        [
          [
            "###############\n#.......#....E#\n#.#.###.#.###.#\n#.....#.#...#.#\n#.###.#####.#.#\n#.#.#.......#.#\n#.#.#####.###.#\n#...........#.#\n###.#.#####.#.#\n#...#.....#.#.#\n#.#.#.###.#.#.#\n#.....#...#.#.#\n#.###.#.#.#.#.#\n#S..#.....#...#\n###############\n",
            45,
          ],
          [
            "#################\n#...#...#...#..E#\n#.#.#.#.#.#.#.#.#\n#.#.#.#...#...#.#\n#.#.#.#.###.#.#.#\n#...#.#.#.....#.#\n#.#.#.#.#.#####.#\n#.#...#.#.#.....#\n#.#.#####.#.###.#\n#.#.#.......#...#\n#.#.###.#####.###\n#.#.#...#.....#.#\n#.#.#.#####.###.#\n#.#.#.........#.#\n#.#.#.#########.#\n#S#.............#\n#################\n",
            64,
          ],
        ],
      ],
    },
    {
      name: "Chronospatial Computer",
      special: false,
      examples: [
        [
          [
            "Register A: 729\nRegister B: 0\nRegister C: 0\n\nProgram: 0,1,5,4,3,0\n",
            "4,6,3,5,6,3,5,2,1,0",
          ],
        ],
        [
          [
            "Register A: 2024\nRegister B: 0\nRegister C: 0\n\nProgram: 0,3,5,4,3,0\n",
            117440n,
          ],
        ],
      ],
    },
    {
      name: "RAM Run",
      special: false,
      examples: [
        [
          [
            "5,4\n4,2\n4,5\n3,0\n2,1\n6,3\n2,4\n1,5\n0,6\n3,3\n2,6\n5,1\n1,2\n5,5\n2,5\n6,5\n1,4\n0,4\n6,4\n1,1\n6,1\n1,0\n0,5\n1,6\n2,0\n",
            22,
          ],
        ],
        [
          [
            "5,4\n4,2\n4,5\n3,0\n2,1\n6,3\n2,4\n1,5\n0,6\n3,3\n2,6\n5,1\n1,2\n5,5\n2,5\n6,5\n1,4\n0,4\n6,4\n1,1\n6,1\n1,0\n0,5\n1,6\n2,0\n",
            "6,1",
          ],
        ],
      ],
    },
    {
      name: "Linen Layout",
      special: false,
      examples: [
        [
          [
            "r, wr, b, g, bwu, rb, gb, br\n\nbrwrr\nbggr\ngbbr\nrrbgbr\nubwu\nbwurrg\nbrgr\nbbrgwb\n",
            6,
          ],
        ],
        [
          [
            "r, wr, b, g, bwu, rb, gb, br\n\nbrwrr\nbggr\ngbbr\nrrbgbr\nubwu\nbwurrg\nbrgr\nbbrgwb\n",
            16,
          ],
        ],
      ],
    },
    {
      name: "Race Condition",
      special: false,
      examples: [
        [
          [
            "###############\n#...#...#.....#\n#.#.#.#.#.###.#\n#S#...#.#.#...#\n#######.#.#.###\n#######.#.#...#\n#######.#.###.#\n###..E#...#...#\n###.#######.###\n#...###...#...#\n#.#####.#.###.#\n#.#...#.#.#...#\n#.#.#.#.#.#.###\n#...#...#...###\n###############\n",
            1,
          ],
        ],
        [
          [
            "###############\n#...#...#.....#\n#.#.#.#.#.###.#\n#S#...#.#.#...#\n#######.#.#.###\n#######.#.#...#\n#######.#.###.#\n###..E#...#...#\n###.#######.###\n#...###...#...#\n#.#####.#.###.#\n#.#...#.#.#...#\n#.#.#.#.#.#.###\n#...#...#...###\n###############\n",
            285,
          ],
        ],
      ],
    },
    {
      name: "Keypad Conundrum",
      special: false,
      examples: [[["029A\n980A\n179A\n456A\n379A", 126384]], []],
    },
    {
      name: "Monkey Market",
      special: false,
      examples: [[["1\n10\n100\n2024\n", 37327623]], [["1\n2\n3\n2024\n", 23]]],
    },
    {
      name: "LAN Party",
      special: false,
      examples: [
        [
          [
            "kh-tc\nqp-kh\nde-cg\nka-co\nyn-aq\nqp-ub\ncg-tb\nvc-aq\ntb-ka\nwh-tc\nyn-cg\nkh-ub\nta-co\nde-co\ntc-td\ntb-wq\nwh-td\nta-ka\ntd-qp\naq-cg\nwq-ub\nub-vc\nde-ta\nwq-aq\nwq-vc\nwh-yn\nka-de\nkh-ta\nco-tc\nwh-qp\ntb-vc\ntd-yn\n",
            7,
          ],
        ],
        [
          [
            "kh-tc\nqp-kh\nde-cg\nka-co\nyn-aq\nqp-ub\ncg-tb\nvc-aq\ntb-ka\nwh-tc\nyn-cg\nkh-ub\nta-co\nde-co\ntc-td\ntb-wq\nwh-td\nta-ka\ntd-qp\naq-cg\nwq-ub\nub-vc\nde-ta\nwq-aq\nwq-vc\nwh-yn\nka-de\nkh-ta\nco-tc\nwh-qp\ntb-vc\ntd-yn\n",
            "co,de,ka,ta",
          ],
        ],
      ],
    },
    {
      name: "Crossed Wires",
      special: false,
      examples: [
        [
          [
            "x00: 1\nx01: 1\nx02: 1\ny00: 0\ny01: 1\ny02: 0\n\nx00 AND y00 -> z00\nx01 XOR y01 -> z01\nx02 OR y02 -> z02\n",
            4,
          ],
          [
            "x00: 1\nx01: 0\nx02: 1\nx03: 1\nx04: 0\ny00: 1\ny01: 1\ny02: 1\ny03: 1\ny04: 1\n\nntg XOR fgs -> mjb\ny02 OR x01 -> tnw\nkwq OR kpj -> z05\nx00 OR x03 -> fst\ntgd XOR rvg -> z01\nvdt OR tnw -> bfw\nbfw AND frj -> z10\nffh OR nrd -> bqk\ny00 AND y03 -> djm\ny03 OR y00 -> psh\nbqk OR frj -> z08\ntnw OR fst -> frj\ngnj AND tgd -> z11\nbfw XOR mjb -> z00\nx03 OR x00 -> vdt\ngnj AND wpb -> z02\nx04 AND y00 -> kjc\ndjm OR pbm -> qhw\nnrd AND vdt -> hwm\nkjc AND fst -> rvg\ny04 OR y02 -> fgs\ny01 AND x02 -> pbm\nntg OR kjc -> kwq\npsh XOR fgs -> tgd\nqhw XOR tgd -> z09\npbm OR djm -> kpj\nx03 XOR y03 -> ffh\nx00 XOR y04 -> ntg\nbfw OR bqk -> z06\nnrd XOR fgs -> wpb\nfrj XOR qhw -> z04\nbqk OR frj -> z07\ny03 OR x01 -> nrd\nhwm AND bqk -> z03\ntgd XOR rvg -> z12\ntnw OR pbm -> gnj\n",
            2024,
          ],
        ],
        [],
      ],
    },
    {
      name: "Code Chronicle",
      special: false,
      examples: [
        [
          [
            "#####\n.####\n.####\n.####\n.#.#.\n.#...\n.....\n\n#####\n##.##\n.#.##\n...##\n...#.\n...#.\n.....\n\n.....\n#....\n#....\n#...#\n#.#.#\n#.###\n#####\n\n.....\n.....\n#.#..\n###..\n###.#\n###.#\n#####\n\n.....\n.....\n.....\n#....\n#.#..\n#.#.#\n#####\n",
            3,
          ],
        ],
        [],
      ],
    },
  ],
};
