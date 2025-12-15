export default {
  2015: [
    {
      name: "Not Quite Lisp",
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
      examples: [[], []],
    },
    {
      name: "Some Assembly Required",
      examples: [[], []],
    },
    {
      name: "Matchsticks",
      examples: [
        [[`""\n"abc"\n"aaa\\"aaa"\n"\\x27"`, 12]],
        [[`""\n"abc"\n"aaa\\"aaa"\n"\\x27"`, 19]],
      ],
    },
    {
      name: "All in a Single Night",
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
      examples: [[], []],
    },
    {
      name: "No Such Thing as Too Much",
      examples: [[["20\n15\n10\n5\n5", 4]], [["20\n15\n10\n5\n5", 3]]],
    },
    {
      name: "Like a GIF For Your Yard",
      examples: [
        [[".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..", 4]],
        [[".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..", 17]],
      ],
    },
    {
      name: "Medicine for Rudolph",
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
      examples: [[["100", 6]], []],
    },
    {
      name: "RPG Simulator 20XX",
      examples: [[], []],
    },
    {
      name: "Wizard Simulator 20XX",
      examples: [[], []],
    },
    {
      name: "Opening the Turing Lock",
      examples: [[["inc a\njio a, +2\ntpl a\ninc a", 2]], []],
    },
    {
      name: "It Hangs in the Balance",
      examples: [
        [["1\n2\n3\n4\n5\n7\n8\n9\n10\n11\n", 99]],
        [["1\n2\n3\n4\n5\n7\n8\n9\n10\n11\n", 44]],
      ],
    },
    {
      name: "Let It Snow",
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
  2016: [
    {
      name: "No Time for a Taxicab",
      examples: [
        [
          ["R2, L3", 5],
          ["R2, R2, R2", 2],
          ["R5, L5, R5, R3", 12],
        ],
        [["R8, R4, R4, R8", 4]],
      ],
    },
    {
      name: "Bathroom Security",
      examples: [
        [["ULL\nRRDDD\nLURDL\nUUUUD", "1985"]],
        [["ULL\nRRDDD\nLURDL\nUUUUD", "5DB3"]],
      ],
    },
    {
      name: "Squares With Three Sides",
      examples: [[["5 10 25", 0]], []],
    },
    {
      name: "Security Through Obscurity",
      examples: [
        [
          [
            "aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]",
            1514,
          ],
        ],
        [],
      ],
    },
    {
      name: "How About a Nice Game of Chess?",
      special: true,
      examples: [[["abc", "18f47a30"]], [["abc", "05ace8e3"]]],
    },
    {
      name: "Signals and Noise",
      examples: [
        [
          [
            "eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar",
            "easter",
          ],
        ],
        [
          [
            "eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar",
            "advent",
          ],
        ],
      ],
    },
    {
      name: "Internet Protocol Version 7",
      examples: [
        [
          [
            "abba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\nioxxoj[asdfgh]zxcvbn",
            2,
          ],
        ],
        [["aba[bab]xyz\nxyx[xyx]xyx\naaa[kek]eke\nzazbz[bzb]cdb", 3]],
      ],
    },
    {
      name: "Two-Factor Authentication",
      examples: [
        [
          [
            "rect 3x2\nrotate column x=1 by 1\nrotate row y=0 by 4\nrotate column x=1 by 1",
            6,
          ],
        ],
        [],
      ],
    },
    {
      name: "Explosives in Cyberspace",
      examples: [
        [
          ["ADVENT", 6],
          ["A(1x5)BC", 7],
          ["(3x3)XYZ", 9],
          ["A(2x2)BCD(2x2)EFG", 11],
          ["(6x1)(1x3)A", 6],
          ["X(8x2)(3x3)ABCY", 18],
        ],
        [
          ["(3x3)XYZ", 9],
          ["X(8x2)(3x3)ABCY", 20],
          ["(27x12)(20x12)(13x14)(7x10)(1x12)A", 241920],
          ["(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN", 445],
        ],
      ],
    },
    {
      name: "Balance Bots",
      examples: [
        [
          [
            "value 5 goes to bot 2\nbot 2 gives low to bot 1 and high to bot 0\nvalue 3 goes to bot 1\nbot 1 gives low to output 1 and high to bot 0\nbot 0 gives low to output 2 and high to output 0\nvalue 2 goes to bot 2",
            2,
          ],
        ],
        [],
      ],
    },
    {
      name: "Radioisotope Thermoelectric Generators",
      examples: [
        [
          [
            "The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.\nThe second floor contains a hydrogen generator.\nThe third floor contains a lithium generator.\nThe fourth floor contains nothing relevant.",
            11,
          ],
        ],
        [],
      ],
    },
    {
      name: "Leonardo's Monorail",
      examples: [[["cpy 41 a\ninc a\ninc a\ndec a\njnz a 2\ndec a", 42]], []],
    },
    {
      name: "A Maze of Twisty Little Cubicles",
      examples: [[["10", 11]], []],
    },
    {
      name: "One-Time Pad",
      special: true,
      examples: [[["abc", 22728]], [["abc", 22551]]],
    },
    {
      name: "Timing is Everything",
      examples: [
        [
          [
            "Disc #1 has 5 positions; at time=0, it is at position 4.\nDisc #2 has 2 positions; at time=0, it is at position 1.",
            5,
          ],
        ],
        [],
      ],
    },
    {
      name: "Dragon Checksum",
      examples: [[["10000", "01100"]], []],
    },
    {
      name: "Two Steps Forward",
      examples: [
        [
          ["ihgpwlah", "DDRRRD"],
          ["kglvqrro", "DDUDRLRRUDRD"],
          ["ulqzkmiv", "DRURDRUDDLLDLUURRDULRLDUUDDDRR"],
        ],
        [
          ["ihgpwlah", 370],
          ["kglvqrro", 492],
          ["ulqzkmiv", 830],
        ],
      ],
    },
    {
      name: "Like a Rogue",
      examples: [[[".^^.^.^^^^", 38]], []],
    },
    {
      name: "An Elephant Named Joseph",
      examples: [[["5", 3]], [["5", 2]]],
    },
    {
      name: "Firewall Rules",
      examples: [[["5-8\n0-2\n4-7", 3]], [["5-8\n0-2\n4-7", 2]]],
    },
    {
      name: "Scrambled Letters and Hash",
      examples: [
        [
          [
            "swap position 4 with position 0\nswap letter d with letter b\nreverse positions 0 through 4\nrotate left 1 step\nmove position 1 to position 4\nmove position 3 to position 0\nrotate based on position of letter b\nrotate based on position of letter d\n",
            "decab",
          ],
        ],
        [
          [
            "swap position 4 with position 0\nswap letter d with letter b\nreverse positions 0 through 4\nrotate left 1 step\nmove position 1 to position 4\nmove position 3 to position 0\nrotate based on position of letter b\nrotate based on position of letter d\n",
            "abcde",
          ],
        ],
      ],
    },
    {
      name: "Grid Computing",
      examples: [[], []],
    },
    {
      name: "Safe Cracking",
      examples: [
        [["cpy 2 a\ntgl a\ntgl a\ntgl a\ncpy 1 a\ndec a\ndec a", 3]],
        [],
      ],
    },
    {
      name: "Air Duct Spelunking",
      examples: [
        [
          [
            "###########\n#0.1.....2#\n#.#######.#\n#4.......3#\n###########",
            14,
          ],
        ],
        [],
      ],
    },
    {
      name: "Clock Signal",
      examples: [[], []],
    },
  ],
  2017: [
    {
      name: "Inverse Captcha",
      examples: [
        [
          ["1122", 3],
          ["1111", 4],
          ["1234", 0],
          ["91212129", 9],
        ],
        [
          ["1212", 6],
          ["1221", 0],
          ["123425", 4],
          ["123123", 12],
          ["12131415", 4],
        ],
      ],
    },
    {
      name: "Corruption Checksum",
      examples: [
        [["5 1 9 5\n7 5 3\n2 4 6 8", 18]],
        [["5 9 2 8\n9 4 7 3\n3 8 6 5", 9]],
      ],
    },
    {
      name: "Spiral Memory",
      examples: [
        [
          ["1", 0],
          ["12", 3],
          ["23", 2],
          ["1024", 31],
        ],
        [],
      ],
    },
    {
      name: "High-Entropy Passphrases",
      examples: [
        [["aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa", 2]],
        [
          [
            "abcde fghij\nabcde xyz ecdab\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio",
            3,
          ],
        ],
      ],
    },
    {
      name: "A Maze of Twisty Trampolines, All Alike",
      examples: [[["0\n3\n0\n1\n-3", 5]], [["0\n3\n0\n1\n-3", 10]]],
    },
    {
      name: "Memory Reallocation",
      examples: [[["0 2 7 0", 5]], [["0 2 7 0", 4]]],
    },
    {
      name: "Recursive Circus",
      examples: [
        [
          [
            "pbga (66)\nxhth (57)\nebii (61)\nhavc (66)\nktlj (57)\nfwft (72) -> ktlj, cntj, xhth\nqoyq (66)\npadx (45) -> pbga, havc, qoyq\ntknk (41) -> ugml, padx, fwft\njptl (61)\nugml (68) -> gyxo, ebii, jptl\ngyxo (61)\ncntj (57)",
            "tknk",
          ],
        ],
        [
          [
            "pbga (66)\nxhth (57)\nebii (61)\nhavc (66)\nktlj (57)\nfwft (72) -> ktlj, cntj, xhth\nqoyq (66)\npadx (45) -> pbga, havc, qoyq\ntknk (41) -> ugml, padx, fwft\njptl (61)\nugml (68) -> gyxo, ebii, jptl\ngyxo (61)\ncntj (57)",
            60,
          ],
        ],
      ],
    },
    {
      name: "I Heard You Like Registers",
      examples: [
        [
          [
            "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10",
            1,
          ],
        ],
        [
          [
            "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10",
            10,
          ],
        ],
      ],
    },
    {
      name: "Stream Processing",
      examples: [
        [
          [
            "{}{{{}}}{{},{}}{{{},{},{{}}}}{<a>,<a>,<a>,<a>}{{<ab>},{<ab>},{<ab>},{<ab>}}{{<!!>},{<!!>},{<!!>},{<!!>}}{{<a!>},{<a!>},{<a!>},{<ab>}}",
            50,
          ],
        ],
        [['<><random characters><<<<><{!>}><!!><!!!>><{o"i!a,<{i<a>', 32]],
      ],
    },
    {
      name: "Knot Hash",
      examples: [
        [["3,4,1,5", 12]],
        [
          ["", "a2582a3a0e66e6e86e3812dcb672a272"],
          ["AoC 2017", "33efeb34ea91902bb2f59c9920caa6cd"],
          ["1,2,3", "3efbe78a8d82f29979031a4aa0b16a9d"],
          ["1,2,4", "63960835bcdc130f0b66d7ff4f6a5a8e"],
        ],
      ],
    },
    {
      name: "Hex Ed",
      examples: [
        [
          ["ne,ne,ne", 3],
          ["ne,ne,sw,sw", 0],
          ["ne,ne,s,s", 2],
          ["se,sw,se,sw,sw", 3],
        ],
        [],
      ],
    },
    {
      name: "Digital Plumber",
      examples: [
        [
          [
            "0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5",
            6,
          ],
        ],
        [
          [
            "0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5",
            2,
          ],
        ],
      ],
    },
    {
      name: "Packet Scanners",
      examples: [
        [["0: 3\n1: 2\n4: 4\n6: 4", 24]],
        [["0: 3\n1: 2\n4: 4\n6: 4", 10]],
      ],
    },
    {
      name: "Disk Defragmentation",
      examples: [[["flqrgnkx", 8108]], [["flqrgnkx", 1242]]],
    },
    {
      name: "Dueling Generators",
      examples: [
        [["Generator A starts with 65\nGenerator B starts with 8921", 588]],
        [["Generator A starts with 65\nGenerator B starts with 8921", 309]],
      ],
    },
    {
      name: "Permutation Promenade",
      examples: [[["s1,x3/4,pe/b", "baedc"]], []],
    },
    {
      name: "Spinlock",
      examples: [[["3", 638]], []],
    },
    {
      name: "Duet",
      examples: [
        [
          [
            "set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2",
            4,
          ],
        ],
        [["snd 1\nsnd 2\nsnd p\nrcv a\nrcv b\nrcv c\nrcv d", 3]],
      ],
    },
    {
      name: "A Series of Tubes",
      examples: [
        [
          [
            "     |          \n     |  +--+    \n     A  |  C    \n F---|----E|--+ \n     |  |  |  D \n     +B-+  +--+ \n",
            "ABCDEF",
          ],
        ],
        [
          [
            "     |          \n     |  +--+    \n     A  |  C    \n F---|----E|--+ \n     |  |  |  D \n     +B-+  +--+ \n",
            38,
          ],
        ],
      ],
    },
    {
      name: "Particle Swarm",
      examples: [
        [
          [
            "p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>\np=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>",
            0,
          ],
        ],
        [
          [
            "p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>\np=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>\np=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>\np=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>",
            1,
          ],
        ],
      ],
    },
    {
      name: "Fractal Art",
      examples: [
        [["../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#", 12]],
        [],
      ],
    },
    {
      name: "Sporifica Virus",
      examples: [[["..#\n#..\n...", 5587]], [["..#\n#..\n...", 2511944]]],
    },
    {
      name: "Coprocessor Conflagration",
      examples: [[], []],
    },
    {
      name: "Electromagnetic Moat",
      examples: [
        [["0/2\n2/2\n2/3\n3/4\n3/5\n0/1\n10/1\n9/10", 31]],
        [["0/2\n2/2\n2/3\n3/4\n3/5\n0/1\n10/1\n9/10", 19]],
      ],
    },
    {
      name: "The Halting Problem",
      examples: [
        [
          [
            "Begin in state A.\nPerform a diagnostic checksum after 6 steps.\n\nIn state A:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the right.\n    - Continue with state B.\n  If the current value is 1:\n    - Write the value 0.\n    - Move one slot to the left.\n    - Continue with state B.\n\nIn state B:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the left.\n    - Continue with state A.\n  If the current value is 1:\n    - Write the value 1.\n    - Move one slot to the right.\n    - Continue with state A.",
            3,
          ],
        ],
        [],
      ],
    },
  ],
  2018: [
    {
      name: "Chronal Calibration",
      examples: [
        [
          ["+1\n-2\n+3\n+1", 3],
          ["+1\n+1\n+1", 3],
          ["+1\n+1\n-2", 0],
          ["-1\n-2\n-3", -6],
        ],
        [
          ["+1\n-2\n+3\n+1", 2],
          ["+1\n-1", 0],
          ["+3\n+3\n+4\n-2\n-4", 10],
          ["-6\n+3\n+8\n+5\n-6", 5],
          ["+7\n+7\n-2\n-7\n-4", 14],
        ],
      ],
    },
    {
      name: "Inventory Management System",
      examples: [
        [["abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab", 12]],
        [["abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz", "fgij"]],
      ],
    },
    {
      name: "No Matter How You Slice It",
      examples: [
        [["#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2", 4]],
        [["#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2", 3]],
      ],
    },
    {
      name: "Repose Record",
      examples: [
        [
          [
            "[1518-11-01 00:00] Guard #10 begins shift\n[1518-11-01 00:05] falls asleep\n[1518-11-01 00:25] wakes up\n[1518-11-01 00:30] falls asleep\n[1518-11-01 00:55] wakes up\n[1518-11-01 23:58] Guard #99 begins shift\n[1518-11-02 00:40] falls asleep\n[1518-11-02 00:50] wakes up\n[1518-11-03 00:05] Guard #10 begins shift\n[1518-11-03 00:24] falls asleep\n[1518-11-03 00:29] wakes up\n[1518-11-04 00:02] Guard #99 begins shift\n[1518-11-04 00:36] falls asleep\n[1518-11-04 00:46] wakes up\n[1518-11-05 00:03] Guard #99 begins shift\n[1518-11-05 00:45] falls asleep\n[1518-11-05 00:55] wakes up",
            240,
          ],
        ],
        [
          [
            "[1518-11-01 00:00] Guard #10 begins shift\n[1518-11-01 00:05] falls asleep\n[1518-11-01 00:25] wakes up\n[1518-11-01 00:30] falls asleep\n[1518-11-01 00:55] wakes up\n[1518-11-01 23:58] Guard #99 begins shift\n[1518-11-02 00:40] falls asleep\n[1518-11-02 00:50] wakes up\n[1518-11-03 00:05] Guard #10 begins shift\n[1518-11-03 00:24] falls asleep\n[1518-11-03 00:29] wakes up\n[1518-11-04 00:02] Guard #99 begins shift\n[1518-11-04 00:36] falls asleep\n[1518-11-04 00:46] wakes up\n[1518-11-05 00:03] Guard #99 begins shift\n[1518-11-05 00:45] falls asleep\n[1518-11-05 00:55] wakes up",
            4455,
          ],
        ],
      ],
    },
    {
      name: "Alchemical Reduction",
      examples: [
        [
          ["aA", 0],
          ["abBA", 0],
          ["abAB", 4],
          ["aabAAB", 6],
          ["dabAcCaCBAcCcaDA", 10],
        ],
        [["dabAcCaCBAcCcaDA", 4]],
      ],
    },
    {
      name: "Chronal Coordinates",
      examples: [
        [["1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9", 17]],
        [["1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9", 16]],
      ],
    },
    {
      name: "The Sum of Its Parts",
      examples: [
        [
          [
            "Step C must be finished before step A can begin.\nStep C must be finished before step F can begin.\nStep A must be finished before step B can begin.\nStep A must be finished before step D can begin.\nStep B must be finished before step E can begin.\nStep D must be finished before step E can begin.\nStep F must be finished before step E can begin.",
            "CABDFE",
          ],
        ],
        [
          [
            "Step C must be finished before step A can begin.\nStep C must be finished before step F can begin.\nStep A must be finished before step B can begin.\nStep A must be finished before step D can begin.\nStep B must be finished before step E can begin.\nStep D must be finished before step E can begin.\nStep F must be finished before step E can begin.",
            15,
          ],
        ],
      ],
    },
    {
      name: "Memory Maneuver",
      examples: [
        [["2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2", 138]],
        [["2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2", 66]],
      ],
    },
    {
      name: "Marble Mania",
      examples: [
        [
          ["9 players; last marble is worth 25 points", 32],
          ["10 players; last marble is worth 1618 points", 8317],
          ["13 players; last marble is worth 7999 points", 146373],
          ["17 players; last marble is worth 1104 points", 2764],
          ["21 players; last marble is worth 6111 points", 54718],
          ["30 players; last marble is worth 5807 point", 37305],
        ],
        [],
      ],
    },
    {
      name: "The Stars Align",
      examples: [[], []],
    },
    {
      name: "Chronal Charge",
      examples: [
        [
          ["18", "33,45"],
          ["42", "21,61"],
        ],
        [
          ["18", "90,269,16"],
          ["42", "232,251,12"],
        ],
      ],
    },
    {
      name: "Subterranean Sustainability",
      examples: [
        [
          [
            "initial state: #..#.#..##......###...###\n\n...## => #\n..#.. => #\n.#... => #\n.#.#. => #\n.#.## => #\n.##.. => #\n.#### => #\n#.#.# => #\n#.### => #\n##.#. => #\n##.## => #\n###.. => #\n###.# => #\n####. => #\n..... => .\n#.... => .\n##... => .\n#.#.. => .\n...#. => .\n#..#. => .\n..##. => .\n#.##. => .\n.###. => .\n....# => .\n#...# => .\n.#..# => .\n##..# => .\n..#.# => .\n.##.# => .\n#..## => .\n..### => .\n##### => .",
            325,
          ],
        ],
        [],
      ],
    },
    {
      name: "Mine Cart Madness",
      examples: [
        [
          [
            "/->-\\        \n|   |  /----\\\n| /-+--+-\\  |\n| | |  | v  |\n\\-+-/  \\-+--/\n  \\------/   ",
            "7,3",
          ],
        ],
        [
          [
            "/>-<\\  \n|   |  \n| /<+-\\\n| | | v\n\\>+</ |\n  |   ^\n  \\<->/",
            "6,4",
          ],
        ],
      ],
    },
    {
      name: "Chocolate Charts",
      examples: [
        [
          ["9", "5158916779"],
          ["5", "0124515891"],
          ["18", "9251071085"],
          ["2018", "5941429882"],
        ],
        [
          ["51589", 9],
          ["01245", 5],
          ["92510", 18],
          ["59414", 2018],
        ],
      ],
    },
    {
      name: "Beverage Bandits",
      examples: [
        [
          [
            "#######\n#.G...#\n#...EG#\n#.#.#G#\n#..G#E#\n#.....#\n#######",
            27730,
          ],
          [
            "#######\n#G..#E#\n#E#E.E#\n#G.##.#\n#...#E#\n#...E.#\n#######",
            36334,
          ],
          [
            "#######\n#E..EG#\n#.#G.E#\n#E.##E#\n#G..#.#\n#..E#.#\n#######",
            39514,
          ],
          [
            "#######\n#E.G#.#\n#.#G..#\n#G.#.G#\n#G..#.#\n#...E.#\n#######",
            27755,
          ],
          [
            "#######\n#.E...#\n#.#..G#\n#.###.#\n#E#G#G#\n#...#G#\n#######",
            28944,
          ],
          [
            "#########\n#G......#\n#.E.#...#\n#..##..G#\n#...##..#\n#...#...#\n#.G...G.#\n#.....G.#\n#########",
            18740,
          ],
        ],
        [
          [
            "#######\n#.G...#\n#...EG#\n#.#.#G#\n#..G#E#\n#.....#\n#######",
            4988,
          ],
          [
            "#######\n#E..EG#\n#.#G.E#\n#E.##E#\n#G..#.#\n#..E#.#\n#######",
            31284,
          ],
          [
            "#######\n#E.G#.#\n#.#G..#\n#G.#.G#\n#G..#.#\n#...E.#\n#######",
            3478,
          ],
          [
            "#######\n#.E...#\n#.#..G#\n#.###.#\n#E#G#G#\n#...#G#\n#######",
            6474,
          ],
          [
            "#########\n#G......#\n#.E.#...#\n#..##..G#\n#...##..#\n#...#...#\n#.G...G.#\n#.....G.#\n#########",
            1140,
          ],
        ],
      ],
    },
    {
      name: "Chronal Classification",
      examples: [
        [["Before: [3, 2, 1, 1]\n9 2 1 2\nAfter:  [3, 2, 2, 1]\n\n\n\n1", 1]],
        [],
      ],
    },
    {
      name: "Reservoir Research",
      examples: [
        [
          [
            "x=495, y=2..7\ny=7, x=495..501\nx=501, y=3..7\nx=498, y=2..4\nx=506, y=1..2\nx=498, y=10..13\nx=504, y=10..13\ny=13, x=498..504",
            57,
          ],
        ],
        [
          [
            "x=495, y=2..7\ny=7, x=495..501\nx=501, y=3..7\nx=498, y=2..4\nx=506, y=1..2\nx=498, y=10..13\nx=504, y=10..13\ny=13, x=498..504",
            29,
          ],
        ],
      ],
    },
    {
      name: "Settlers of The North Pole",
      examples: [
        [
          [
            ".#.#...|#.\n.....#|##|\n.|..|...#.\n..|#.....#\n#.#|||#|#|\n...#.||...\n.|....|...\n||...#|.#|\n|.||||..|.\n...#.|..|.",
            1147,
          ],
        ],
        [],
      ],
    },
    {
      name: "Go With The Flow",
      examples: [
        [
          [
            "#ip 0\nseti 5 0 1\nseti 6 0 2\naddi 0 1 0\naddr 1 2 3\nsetr 1 0 0\nseti 8 0 4\nseti 9 0 5",
            6,
          ],
        ],
        [],
      ],
    },
    {
      name: "A Regular Map",
      examples: [
        [
          ["^WNE$", 3],
          ["^ENWWW(NEEE|SSE(EE|N))$", 10],
          ["^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$", 18],
          ["^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$", 23],
          [
            "^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$",
            31,
          ],
        ],
        [],
      ],
    },
    {
      name: "Chronal Conversion",
      special: true,
      examples: [[], []],
    },
    {
      name: "Mode Maze",
      examples: [
        [["depth: 510\ntarget: 10,10", 114]],
        [["depth: 510\ntarget: 10,10", 45]],
      ],
    },
    {
      name: "Experimental Emergency Teleportation",
      examples: [
        [
          [
            "pos=<0,0,0>, r=4\npos=<1,0,0>, r=1\npos=<4,0,0>, r=3\npos=<0,2,0>, r=1\npos=<0,5,0>, r=3\npos=<0,0,3>, r=1\npos=<1,1,1>, r=1\npos=<1,1,2>, r=1\npos=<1,3,1>, r=1",
            7,
          ],
        ],
        [
          [
            "pos=<10,12,12>, r=2\npos=<12,14,12>, r=2\npos=<16,12,12>, r=4\npos=<14,14,14>, r=6\npos=<50,50,50>, r=200\npos=<10,10,10>, r=5",
            36,
          ],
        ],
      ],
    },
    {
      name: "Immune System Simulator 20XX",
      examples: [
        [
          [
            "Immune System:\n17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2\n989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3\n\nInfection:\n801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1\n4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4",
            5216,
          ],
        ],
        [],
      ],
    },
    {
      name: "Four-Dimensional Adventure",
      examples: [
        [
          [
            " 0,0,0,0\n3,0,0,0\n0,3,0,0\n0,0,3,0\n0,0,0,3\n0,0,0,6\n9,0,0,0\n12,0,0,0",
            2,
          ],
          [
            "-1,2,2,0\n0,0,2,-2\n0,0,0,-2\n-1,2,0,0\n-2,-2,-2,2\n3,0,2,-1\n-1,3,2,2\n-1,0,-1,0\n0,2,1,-2\n3,0,0,0",
            4,
          ],
          [
            "1,-1,0,1\n2,0,-1,0\n3,2,-1,0\n0,0,3,1\n0,0,-1,-1\n2,3,-2,0\n-2,2,0,0\n2,-2,0,-1\n1,-1,0,-1\n3,2,0,2",
            3,
          ],
          [
            "1,-1,-1,-2\n-2,-2,0,1\n0,2,1,3\n-2,3,-2,1\n0,2,3,-2\n-1,-1,1,-2\n0,-2,-1,0\n-2,2,3,-1\n1,2,2,0\n-1,-2,0,-2",
            8,
          ],
        ],
        [],
      ],
    },
  ],
  2019: [
    {
      name: "The Tyranny of the Rocket Equation",
      examples: [
        [
          ["12", 2],
          ["14", 2],
          ["1969", 654],
          ["100756", 33583],
        ],
        [
          ["14", 2],
          ["1969", 966],
          ["100756", 50346],
        ],
      ],
    },
    {
      name: "1202 Program Alarm",
      examples: [[], []],
    },
    {
      name: "Crossed Wires",
      examples: [
        [
          ["R8,U5,L5,D3\nU7,R6,D4,L4", 6],
          [
            "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83",
            159,
          ],
          [
            "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
            135,
          ],
        ],
        [
          ["R8,U5,L5,D3\nU7,R6,D4,L4", 30],
          [
            "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83",
            610,
          ],
          [
            "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
            410,
          ],
        ],
      ],
    },
    {
      name: "Secure Container",
      examples: [
        [
          ["111111-111111", 1],
          ["223450-223450", 0],
          ["123789-123789", 0],
        ],
        [
          ["112233-112233", 1],
          ["123444-123444", 0],
          ["111122-111122", 1],
        ],
      ],
    },
    {
      name: "Sunny with a Chance of Asteroids",
      examples: [[], []],
    },
    {
      name: "Universal Orbit Map",
      examples: [
        [["COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L", 42]],
        [
          [
            "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN",
            4,
          ],
        ],
      ],
    },
    {
      name: "Amplification Circuit",
      examples: [
        [
          ["3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", 43210],
          [
            "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
            54321,
          ],
          [
            "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
            65210,
          ],
        ],
        [
          [
            "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
            139629729,
          ],
          [
            "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10",
            18216,
          ],
        ],
      ],
    },
    {
      name: "Space Image Format",
      examples: [[], []],
    },
    {
      name: "Sensor Boost",
      examples: [
        [
          // 64bit is represented as BigInts in js
          ["1102,34915192,34915192,7,4,7,99,0", 1219070632396864n],
          ["104,1125899906842624,99", 1125899906842624n],
        ],
        [],
      ],
    },
    {
      name: "Monitoring Station",
      examples: [
        [
          [".#..#\n.....\n#####\n....#\n...##", 8],
          [
            "......#.#.\n#..#.#....\n..#######.\n.#.#.###..\n.#..#.....\n..#....#.#\n#..#....#.\n.##.#..###\n##...#..#.\n.#....####",
            33,
          ],
          [
            "#.#...#.#.\n.###....#.\n.#....#...\n##.#.#.#.#\n....#.#.#.\n.##..###.#\n..#...##..\n..##....##\n......#...\n.####.###.",
            35,
          ],
          [
            ".#..#..###\n####.###.#\n....###.#.\n..###.##.#\n##.##.#.#.\n....###..#\n..#.#..#.#\n#..#.#.###\n.##...##.#\n.....#.#..",
            41,
          ],
          [
            ".#..##.###...#######\n##.############..##.\n.#.######.########.#\n.###.#######.####.#.\n#####.##.#.##.###.##\n..#####..#.#########\n####################\n#.####....###.#.#.##\n##.#################\n#####.##.###..####..\n..######..##.#######\n####.##.####...##..#\n.#####..#.######.###\n##...#.##########...\n#.##########.#######\n.####.#.###.###.#.##\n....##.##.###..#####\n.#.#.###########.###\n#.#.#.#####.####.###\n###.##.####.##.#..##",
            210,
          ],
        ],
        [
          [
            ".#..##.###...#######\n##.############..##.\n.#.######.########.#\n.###.#######.####.#.\n#####.##.#.##.###.##\n..#####..#.#########\n####################\n#.####....###.#.#.##\n##.#################\n#####.##.###..####..\n..######..##.#######\n####.##.####...##..#\n.#####..#.######.###\n##...#.##########...\n#.##########.#######\n.####.#.###.###.#.##\n....##.##.###..#####\n.#.#.###########.###\n#.#.#.#####.####.###\n###.##.####.##.#..##",
            802,
          ],
        ],
      ],
    },
    {
      name: "Space Police",
      examples: [[], []],
    },
    {
      name: "The N-Body Problem",
      examples: [
        [],
        [
          [
            "<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>",
            2772n,
          ],
          [
            "<x=-8, y=-10, z=0>\n<x=5, y=5, z=10>\n<x=2, y=-7, z=3>\n<x=9, y=-8, z=-3>",
            4686774924n,
          ],
        ],
      ],
    },
    {
      name: "Care Package",
      interactive: 1,
      examples: [[], []],
    },
    {
      name: "Space Stoichiometry",
      examples: [
        [
          [
            "10 ORE => 10 A\n1 ORE => 1 B\n7 A, 1 B => 1 C\n7 A, 1 C => 1 D\n7 A, 1 D => 1 E\n7 A, 1 E => 1 FUEL",
            31,
          ],
          [
            "9 ORE => 2 A\n8 ORE => 3 B\n7 ORE => 5 C\n3 A, 4 B => 1 AB\n5 B, 7 C => 1 BC\n4 C, 1 A => 1 CA\n2 AB, 3 BC, 4 CA => 1 FUEL",
            165,
          ],
          [
            "157 ORE => 5 NZVS\n165 ORE => 6 DCFZ\n44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL\n12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ\n179 ORE => 7 PSHF\n177 ORE => 5 HKGWZ\n7 DCFZ, 7 PSHF => 2 XJWVT\n165 ORE => 2 GPVTF\n3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT",
            13312,
          ],
          [
            "2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG\n17 NVRVD, 3 JNWZP => 8 VPVL\n53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL\n22 VJHF, 37 MNCFX => 5 FWMGM\n139 ORE => 4 NVRVD\n144 ORE => 7 JNWZP\n5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC\n5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV\n145 ORE => 6 MNCFX\n1 NVRVD => 8 CXFTF\n1 VJHF, 6 MNCFX => 4 RFSQX\n176 ORE => 6 VJHF",
            180697,
          ],
          [
            "171 ORE => 8 CNZTR\n7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL\n114 ORE => 4 BHXH\n14 VRPVC => 6 BMBT\n6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL\n6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT\n15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW\n13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW\n5 BMBT => 4 WPTQ\n189 ORE => 9 KTJDG\n1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP\n12 VRPVC, 27 CNZTR => 2 XDBXC\n15 KTJDG, 12 BHXH => 5 XCVML\n3 BHXH, 2 VRPVC => 7 MZWV\n121 ORE => 7 VRPVC\n7 XCVML => 6 RJRHP\n5 BHXH, 4 VRPVC => 5 LTCX",
            2210736,
          ],
        ],
        [
          [
            "157 ORE => 5 NZVS\n165 ORE => 6 DCFZ\n44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL\n12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ\n179 ORE => 7 PSHF\n177 ORE => 5 HKGWZ\n7 DCFZ, 7 PSHF => 2 XJWVT\n165 ORE => 2 GPVTF\n3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT",
            82892753,
          ],
          [
            "2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG\n17 NVRVD, 3 JNWZP => 8 VPVL\n53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL\n22 VJHF, 37 MNCFX => 5 FWMGM\n139 ORE => 4 NVRVD\n144 ORE => 7 JNWZP\n5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC\n5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV\n145 ORE => 6 MNCFX\n1 NVRVD => 8 CXFTF\n1 VJHF, 6 MNCFX => 4 RFSQX\n176 ORE => 6 VJHF",
            5586022,
          ],
          [
            "171 ORE => 8 CNZTR\n7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL\n114 ORE => 4 BHXH\n14 VRPVC => 6 BMBT\n6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL\n6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT\n15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW\n13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW\n5 BMBT => 4 WPTQ\n189 ORE => 9 KTJDG\n1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP\n12 VRPVC, 27 CNZTR => 2 XDBXC\n15 KTJDG, 12 BHXH => 5 XCVML\n3 BHXH, 2 VRPVC => 7 MZWV\n121 ORE => 7 VRPVC\n7 XCVML => 6 RJRHP\n5 BHXH, 4 VRPVC => 5 LTCX",
            460664,
          ],
        ],
      ],
    },
    {
      name: "Oxygen System",
      examples: [[], []],
    },
    {
      name: "Flawed Frequency Transmission",
      examples: [
        [
          ["80871224585914546619083218645595", "24176176"],
          ["19617804207202209144916044189917", "73745418"],
          ["69317163492948606335995924319873", "52432133"],
        ],
        [
          ["03036732577212944063491565474664", "84462026"],
          ["02935109699940807407585447034323", "78725270"],
          ["03081770884921959731165446850517", "53553731"],
        ],
      ],
    },
    {
      name: "Set and Forget",
      interactive: 1,
      examples: [[], []],
    },
    {
      name: "Many-Worlds Interpretation",
      examples: [
        [
          ["#########\n#b.A.@.a#\n#########", 8],
          [
            "########################\n#f.D.E.e.C.b.A.@.a.B.c.#\n######################.#\n#d.....................#\n########################",
            86,
          ],
          [
            "########################\n#...............b.C.D.f#\n#.######################\n#.....@.a.B.c.d.A.e.F.g#\n########################",
            132,
          ],
          [
            "#################\n#i.G..c...e..H.p#\n########.########\n#j.A..b...f..D.o#\n########@########\n#k.E..a...g..B.n#\n########.########\n#l.F..d...h..C.m#\n#################",
            136,
          ],
          [
            "########################\n#@..............ac.GI.b#\n###d#e#f################\n###A#B#C################\n###g#h#i################\n########################",
            81,
          ],
        ],
        [
          ["#######\n#aC#.d#\n##...##\n##.@.##\n##...##\n#cB#Ab#\n#######", 8],
          [
            "###############\n#d.ABC.#.....a#\n######.#.######\n#######@#######\n######.#.######\n#b.....#.....c#\n###############",
            24,
          ],
          [
            "#############\n#DcBa.#.GhKl#\n#.###.#.#I###\n#e#d##@##j#k#\n###C#.#.###J#\n#fEbA.#.FgHi#\n#############",
            32,
          ],
          // This example doesn't work but the strategy still works on the full input
          /*[
            "#############\n#g#f.D#..h#l#\n#F###e#E###.#\n#dCba.#.BcIJ#\n######@######\n#nK.L.#.G...#\n#M###N#H###.#\n#o#m..#i#jk.#\n#############",
            72,
          ],*/
        ],
      ],
    },
    {
      name: "Tractor Beam",
      examples: [[], []],
    },
    {
      name: "Donut Maze",
      examples: [
        [
          [
            "         A           \n         A           \n  #######.#########  \n  #######.........#  \n  #######.#######.#  \n  #######.#######.#  \n  #######.#######.#  \n  #####  B    ###.#  \nBC...##  C    ###.#  \n  ##.##       ###.#  \n  ##...DE  F  ###.#  \n  #####    G  ###.#  \n  #########.#####.#  \nDE..#######...###.#  \n  #.#########.###.#  \nFG..#########.....#  \n  ###########.#####  \n             Z       \n             Z       ",
            23,
          ],
          [
            "                   A               \n                   A               \n  #################.#############  \n  #.#...#...................#.#.#  \n  #.#.#.###.###.###.#########.#.#  \n  #.#.#.......#...#.....#.#.#...#  \n  #.#########.###.#####.#.#.###.#  \n  #.............#.#.....#.......#  \n  ###.###########.###.#####.#.#.#  \n  #.....#        A   C    #.#.#.#  \n  #######        S   P    #####.#  \n  #.#...#                 #......VT\n  #.#.#.#                 #.#####  \n  #...#.#               YN....#.#  \n  #.###.#                 #####.#  \nDI....#.#                 #.....#  \n  #####.#                 #.###.#  \nZZ......#               QG....#..AS\n  ###.###                 #######  \nJO..#.#.#                 #.....#  \n  #.#.#.#                 ###.#.#  \n  #...#..DI             BU....#..LF\n  #####.#                 #.#####  \nYN......#               VT..#....QG\n  #.###.#                 #.###.#  \n  #.#...#                 #.....#  \n  ###.###    J L     J    #.#.###  \n  #.....#    O F     P    #.#...#  \n  #.###.#####.#.#####.#####.###.#  \n  #...#.#.#...#.....#.....#.#...#  \n  #.#####.###.###.#.#.#########.#  \n  #...#.#.....#...#.#.#.#.....#.#  \n  #.###.#####.###.###.#.#.#######  \n  #.#.........#...#.............#  \n  #########.###.###.#############  \n           B   J   C               \n           U   P   P               ",
            58,
          ],
        ],
        [
          [
            "         A           \n         A           \n  #######.#########  \n  #######.........#  \n  #######.#######.#  \n  #######.#######.#  \n  #######.#######.#  \n  #####  B    ###.#  \nBC...##  C    ###.#  \n  ##.##       ###.#  \n  ##...DE  F  ###.#  \n  #####    G  ###.#  \n  #########.#####.#  \nDE..#######...###.#  \n  #.#########.###.#  \nFG..#########.....#  \n  ###########.#####  \n             Z       \n             Z       ",
            26,
          ],
          [
            "             Z L X W       C                 \n             Z P Q B       K                 \n  ###########.#.#.#.#######.###############  \n  #...#.......#.#.......#.#.......#.#.#...#  \n  ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###  \n  #.#...#.#.#...#.#.#...#...#...#.#.......#  \n  #.###.#######.###.###.#.###.###.#.#######  \n  #...#.......#.#...#...#.............#...#  \n  #.#########.#######.#.#######.#######.###  \n  #...#.#    F       R I       Z    #.#.#.#  \n  #.###.#    D       E C       H    #.#.#.#  \n  #.#...#                           #...#.#  \n  #.###.#                           #.###.#  \n  #.#....OA                       WB..#.#..ZH\n  #.###.#                           #.#.#.#  \nCJ......#                           #.....#  \n  #######                           #######  \n  #.#....CK                         #......IC\n  #.###.#                           #.###.#  \n  #.....#                           #...#.#  \n  ###.###                           #.#.#.#  \nXF....#.#                         RF..#.#.#  \n  #####.#                           #######  \n  #......CJ                       NM..#...#  \n  ###.#.#                           #.###.#  \nRE....#.#                           #......RF\n  ###.###        X   X       L      #.#.#.#  \n  #.....#        F   Q       P      #.#.#.#  \n  ###.###########.###.#######.#########.###  \n  #.....#...#.....#.......#...#.....#.#...#  \n  #####.#.###.#######.#######.###.###.#.#.#  \n  #.......#.......#.#.#.#.#...#...#...#.#.#  \n  #####.###.#####.#.#.#.#.###.###.#.###.###  \n  #.......#.....#.#...#...............#...#  \n  #############.#.#.###.###################  \n               A O F   N                     \n               A A D   M                     ",
            396,
          ],
        ],
      ],
    },
    {
      name: "Springdroid Adventure",
      examples: [[], []],
    },
    {
      name: "Slam Shuffle",
      examples: [[], []],
    },
    {
      name: "Category Six",
      examples: [[], []],
    },
    {
      name: "Planet of Discord",
      examples: [
        [["....#\n#..#.\n#..##\n..#..\n#....", 2129920]],
        [["....#\n#..#.\n#..##\n..#..\n#....", 99]],
      ],
    },
    {
      name: "Cryostasis",
      interactive: 0,
      examples: [[], []],
    },
  ],
  2020: [
    {
      name: "Report Repair",
      examples: [
        [["1721\n979\n366\n299\n675\n1456", 514579]],
        [["1721\n979\n366\n299\n675\n1456", 241861950]],
      ],
    },
    {
      name: "Password Philosophy",
      examples: [
        [["1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc", 2]],
        [["1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc", 1]],
      ],
    },
    {
      name: "Toboggan Trajectory",
      examples: [
        [
          [
            "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#",
            7,
          ],
        ],
        [
          [
            "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#",
            336,
          ],
        ],
      ],
    },
    {
      name: "Passport Processing",
      examples: [
        [
          [
            "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm\n\niyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\nhcl:#cfa07d byr:1929\n\nhcl:#ae17e1 iyr:2013\neyr:2024\necl:brn pid:760753108 byr:1931\nhgt:179cm\n\nhcl:#cfa07d eyr:2025 pid:166559648\niyr:2011 ecl:brn hgt:59in",
            2,
          ],
        ],
        [
          [
            "eyr:1972 cid:100\nhcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n\niyr:2019\nhcl:#602927 eyr:1967 hgt:170cm\necl:grn pid:012533040 byr:1946\n\nhcl:dab227 iyr:2012\necl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n\nhgt:59cm ecl:zzz\neyr:2038 hcl:74454a iyr:2023\npid:3556412378 byr:2007\n\npid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\nhcl:#623a2f\n\neyr:2029 ecl:blu cid:129 byr:1989\niyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n\nhcl:#888785\nhgt:164cm byr:2001 iyr:2015 cid:88\npid:545766238 ecl:hzl\neyr:2022\n\niyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719",
            4,
          ],
        ],
      ],
    },
    {
      name: "Binary Boarding",
      examples: [
        [
          ["BFFFBBFRRR", 567],
          ["FFFBBBFRRR", 119],
          ["BBFFBBFRLL", 820],
        ],
        [],
      ],
    },
    {
      name: "Custom Customs",
      examples: [
        [["abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb", 11]],
        [["abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb", 6]],
      ],
    },
    {
      name: "Handy Haversacks",
      examples: [
        [
          [
            "light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.",
            4,
          ],
        ],
        [
          [
            "light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.",
            32,
          ],
          [
            "shiny gold bags contain 2 dark red bags.\ndark red bags contain 2 dark orange bags.\ndark orange bags contain 2 dark yellow bags.\ndark yellow bags contain 2 dark green bags.\ndark green bags contain 2 dark blue bags.\ndark blue bags contain 2 dark violet bags.\ndark violet bags contain no other bags.",
            126,
          ],
        ],
      ],
    },
    {
      name: "Handheld Halting",
      examples: [
        [
          [
            "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6",
            5,
          ],
        ],
        [
          [
            "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6",
            8,
          ],
        ],
      ],
    },
    {
      name: "Encoding Error",
      examples: [
        [
          [
            "35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576",
            127,
          ],
        ],
        [
          [
            "35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576",
            62,
          ],
        ],
      ],
    },
    {
      name: "Adapter Array",
      examples: [
        [
          ["16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4", 35],
          [
            "28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3",
            220,
          ],
        ],
        [
          ["16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4", 8],
          [
            "28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3",
            19208,
          ],
        ],
      ],
    },
    {
      name: "Seating System",
      examples: [
        [
          [
            "L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL",
            37,
          ],
        ],
        [
          [
            "L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL",
            26,
          ],
        ],
      ],
    },
    {
      name: "Rain Risk",
      examples: [
        [["F10\nN3\nF7\nR90\nF11", 25]],
        [["F10\nN3\nF7\nR90\nF11", 286]],
      ],
    },
    {
      name: "Shuttle Search",
      examples: [
        [["939\n7,13,x,x,59,x,31,19", 295]],
        [
          ["1\n7,13,x,x,59,x,31,19", 1068781],
          ["1\n17,x,13,19", 3417],
          ["1\n67,7,59,61", 754018],
          ["1\n67,x,7,59,61", 779210],
          ["1\n67,7,x,59,61", 1261476],
          ["1\n1789,37,47,1889", 1202161486],
        ],
      ],
    },
    {
      name: "Docking Data",
      examples: [
        [
          [
            "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0",
            165n,
          ],
        ],
        [
          [
            "mask = 000000000000000000000000000000X1001X\nmem[42] = 100\nmask = 00000000000000000000000000000000X0XX\nmem[26] = 1",
            208,
          ],
        ],
      ],
    },
    {
      name: "Rambunctious Recitation",
      examples: [
        [
          ["0,3,6", 436],
          ["1,3,2", 1],
          ["2,1,3", 10],
          ["1,2,3", 27],
          ["2,3,1", 78],
          ["3,2,1", 438],
          ["3,1,2", 1836],
        ],
        [
          ["0,3,6", 175594],
          ["1,3,2", 2578],
          ["2,1,3", 3544142],
          ["1,2,3", 261214],
          ["2,3,1", 6895259],
          ["3,2,1", 18],
          ["3,1,2", 362],
        ],
      ],
    },
    {
      name: "Ticket Translation",
      examples: [
        [
          [
            "class: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50\n\nyour ticket:\n7,1,14\n\nnearby tickets:\n7,3,47\n40,4,50\n55,2,20\n38,6,12",
            71,
          ],
        ],
        [],
      ],
    },
    {
      name: "Conway Cubes",
      examples: [[[".#.\n..#\n###", 112]], [[".#.\n..#\n###", 848]]],
    },
    {
      name: "Operation Order",
      examples: [
        [
          ["1 + 2 * 3 + 4 * 5 + 6", 71],
          ["1 + (2 * 3) + (4 * (5 + 6))", 51],
          ["2 * 3 + (4 * 5)", 26],
          ["5 + (8 * 3 + 9 + 3 * 4 * 3)", 437],
          ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 12240],
          ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 13632],
        ],
        [
          ["1 + 2 * 3 + 4 * 5 + 6", 231],
          ["1 + (2 * 3) + (4 * (5 + 6))", 51],
          ["2 * 3 + (4 * 5)", 46],
          ["5 + (8 * 3 + 9 + 3 * 4 * 3)", 1445],
          ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 669060],
          ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 23340],
        ],
      ],
    },
    {
      name: "Monster Messages",
      examples: [
        [
          [
            '0: 4 1 5\n1: 2 3 | 3 2\n2: 4 4 | 5 5\n3: 4 5 | 5 4\n4: "a"\n5: "b"\n\nababbb\nbababa\nabbbab\naaabbb\naaaabbb',
            2,
          ],
        ],
        [
          [
            '42: 9 14 | 10 1\n9: 14 27 | 1 26\n10: 23 14 | 28 1\n1: "a"\n11: 42 31\n5: 1 14 | 15 1\n19: 14 1 | 14 14\n12: 24 14 | 19 1\n16: 15 1 | 14 14\n31: 14 17 | 1 13\n6: 14 14 | 1 14\n2: 1 24 | 14 4\n0: 8 11\n13: 14 3 | 1 12\n15: 1 | 14\n17: 14 2 | 1 7\n23: 25 1 | 22 14\n28: 16 1\n4: 1 1\n20: 14 14 | 1 15\n3: 5 14 | 16 1\n27: 1 6 | 14 18\n14: "b"\n21: 14 1 | 1 14\n25: 1 1 | 1 14\n22: 14 14\n8: 42\n26: 14 22 | 1 20\n18: 15 15\n7: 14 5 | 1 21\n24: 14 1\n\nabbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa\nbbabbbbaabaabba\nbabbbbaabbbbbabbbbbbaabaaabaaa\naaabbbbbbaaaabaababaabababbabaaabbababababaaa\nbbbbbbbaaaabbbbaaabbabaaa\nbbbababbbbaaaaaaaabbababaaababaabab\nababaaaaaabaaab\nababaaaaabbbaba\nbaabbaaaabbaaaababbaababb\nabbbbabbbbaaaababbbbbbaaaababb\naaaaabbaabaaaaababaa\naaaabbaaaabbaaa\naaaabbaabbaaaaaaabbbabbbaaabbaabaaa\nbabaaabbbaaabaababbaabababaaab\naabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba',
            12,
          ],
        ],
      ],
    },
    {
      name: "Jurassic Jigsaw",
      examples: [
        [
          [
            "Tile 2311:\n..##.#..#.\n##..#.....\n#...##..#.\n####.#...#\n##.##.###.\n##...#.###\n.#.#.#..##\n..#....#..\n###...#.#.\n..###..###\n\nTile 1951:\n#.##...##.\n#.####...#\n.....#..##\n#...######\n.##.#....#\n.###.#####\n###.##.##.\n.###....#.\n..#.#..#.#\n#...##.#..\n\nTile 1171:\n####...##.\n#..##.#..#\n##.#..#.#.\n.###.####.\n..###.####\n.##....##.\n.#...####.\n#.##.####.\n####..#...\n.....##...\n\nTile 1427:\n###.##.#..\n.#..#.##..\n.#.##.#..#\n#.#.#.##.#\n....#...##\n...##..##.\n...#.#####\n.#.####.#.\n..#..###.#\n..##.#..#.\n\nTile 1489:\n##.#.#....\n..##...#..\n.##..##...\n..#...#...\n#####...#.\n#..#.#.#.#\n...#.#.#..\n##.#...##.\n..##.##.##\n###.##.#..\n\nTile 2473:\n#....####.\n#..#.##...\n#.##..#...\n######.#.#\n.#...#.#.#\n.#########\n.###.#..#.\n########.#\n##...##.#.\n..###.#.#.\n\nTile 2971:\n..#.#....#\n#...###...\n#.#.###...\n##.##..#..\n.#####..##\n.#..####.#\n#..#.#..#.\n..####.###\n..#.#.###.\n...#.#.#.#\n\nTile 2729:\n...#.#.#.#\n####.#....\n..#.#.....\n....#..#.#\n.##..##.#.\n.#.####...\n####.#.#..\n##.####...\n##..#.##..\n#.##...##.\n\nTile 3079:\n#.#.#####.\n.#..######\n..#.......\n######....\n####.#..#.\n.#...#.##.\n#.#####.##\n..#.###...\n..#.......\n..#.###...",
            20899048083289,
          ],
        ],
        [
          [
            "Tile 2311:\n..##.#..#.\n##..#.....\n#...##..#.\n####.#...#\n##.##.###.\n##...#.###\n.#.#.#..##\n..#....#..\n###...#.#.\n..###..###\n\nTile 1951:\n#.##...##.\n#.####...#\n.....#..##\n#...######\n.##.#....#\n.###.#####\n###.##.##.\n.###....#.\n..#.#..#.#\n#...##.#..\n\nTile 1171:\n####...##.\n#..##.#..#\n##.#..#.#.\n.###.####.\n..###.####\n.##....##.\n.#...####.\n#.##.####.\n####..#...\n.....##...\n\nTile 1427:\n###.##.#..\n.#..#.##..\n.#.##.#..#\n#.#.#.##.#\n....#...##\n...##..##.\n...#.#####\n.#.####.#.\n..#..###.#\n..##.#..#.\n\nTile 1489:\n##.#.#....\n..##...#..\n.##..##...\n..#...#...\n#####...#.\n#..#.#.#.#\n...#.#.#..\n##.#...##.\n..##.##.##\n###.##.#..\n\nTile 2473:\n#....####.\n#..#.##...\n#.##..#...\n######.#.#\n.#...#.#.#\n.#########\n.###.#..#.\n########.#\n##...##.#.\n..###.#.#.\n\nTile 2971:\n..#.#....#\n#...###...\n#.#.###...\n##.##..#..\n.#####..##\n.#..####.#\n#..#.#..#.\n..####.###\n..#.#.###.\n...#.#.#.#\n\nTile 2729:\n...#.#.#.#\n####.#....\n..#.#.....\n....#..#.#\n.##..##.#.\n.#.####...\n####.#.#..\n##.####...\n##..#.##..\n#.##...##.\n\nTile 3079:\n#.#.#####.\n.#..######\n..#.......\n######....\n####.#..#.\n.#...#.##.\n#.#####.##\n..#.###...\n..#.......\n..#.###...",
            273,
          ],
        ],
      ],
    },
    {
      name: "Allergen Assessment",
      examples: [
        [
          [
            "mxmxvkd kfcds sqjhc nhms (contains dairy, fish)\ntrh fvjkl sbzzf mxmxvkd (contains dairy)\nsqjhc fvjkl (contains soy)\nsqjhc mxmxvkd sbzzf (contains fish)",
            5,
          ],
        ],
        [
          [
            "mxmxvkd kfcds sqjhc nhms (contains dairy, fish)\ntrh fvjkl sbzzf mxmxvkd (contains dairy)\nsqjhc fvjkl (contains soy)\nsqjhc mxmxvkd sbzzf (contains fish)",
            "mxmxvkd,sqjhc,fvjkl",
          ],
        ],
      ],
    },
    {
      name: "Crab Combat",
      examples: [
        [["Player 1:\n9\n2\n6\n3\n1\n\nPlayer 2:\n5\n8\n4\n7\n10", 306]],
        [["Player 1:\n9\n2\n6\n3\n1\n\nPlayer 2:\n5\n8\n4\n7\n10", 291]],
      ],
    },
    {
      name: "Crab Cups",
      examples: [[["389125467", "67384529"]], [["389125467", 149245887792]]],
    },
    {
      name: "Lobby Layout",
      examples: [
        [
          [
            "sesenwnenenewseeswwswswwnenewsewsw\nneeenesenwnwwswnenewnwwsewnenwseswesw\nseswneswswsenwwnwse\nnwnwneseeswswnenewneswwnewseswneseene\nswweswneswnenwsewnwneneseenw\neesenwseswswnenwswnwnwsewwnwsene\nsewnenenenesenwsewnenwwwse\nwenwwweseeeweswwwnwwe\nwsweesenenewnwwnwsenewsenwwsesesenwne\nneeswseenwwswnwswswnw\nnenwswwsewswnenenewsenwsenwnesesenew\nenewnwewneswsewnwswenweswnenwsenwsw\nsweneswneswneneenwnewenewwneswswnese\nswwesenesewenwneswnwwneseswwne\nenesenwswwswneneswsenwnewswseenwsese\nwnwnesenesenenwwnenwsewesewsesesew\nnenewswnwewswnenesenwnesewesw\neneswnwswnwsenenwnwnwwseeswneewsenese\nneswnwewnwnwseenwseesewsenwsweewe\nwseweeenwnesenwwwswnew",
            10,
          ],
        ],
        [
          [
            "sesenwnenenewseeswwswswwnenewsewsw\nneeenesenwnwwswnenewnwwsewnenwseswesw\nseswneswswsenwwnwse\nnwnwneseeswswnenewneswwnewseswneseene\nswweswneswnenwsewnwneneseenw\neesenwseswswnenwswnwnwsewwnwsene\nsewnenenenesenwsewnenwwwse\nwenwwweseeeweswwwnwwe\nwsweesenenewnwwnwsenewsenwwsesesenwne\nneeswseenwwswnwswswnw\nnenwswwsewswnenenewsenwsenwnesesenew\nenewnwewneswsewnwswenweswnenwsenwsw\nsweneswneswneneenwnewenewwneswswnese\nswwesenesewenwneswnwwneseswwne\nenesenwswwswneneswsenwnewswseenwsese\nwnwnesenesenenwwnenwsewesewsesesew\nnenewswnwewswnenesenwnesewesw\neneswnwswnwsenenwnwnwwseeswneewsenese\nneswnwewnwnwseenwseesewsenwsweewe\nwseweeenwnesenwwwswnew",
            2208,
          ],
        ],
      ],
    },
    {
      name: "Combo Breaker",
      examples: [[["5764801\n17807724", 14897079]], []],
    },
  ],
  // Mark puzzles solved using special formats, so it can be loaded correctly
  2023: [
    {
      name: "Trebuchet?!",
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
      examples: [
        [["Time:      7  15   30\nDistance:  9  40  200\n", 288]],
        [["Time:      7  15   30\nDistance:  9  40  200\n", 71503]],
      ],
    },
    {
      name: "Camel Cards",
      examples: [
        [["32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483\n", 6440]],
        [["32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483\n", 5905]],
      ],
    },
    {
      name: "Haunted Wasteland",
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
      examples: [
        [["0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45\n", 114]],
        [["0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45\n", 2]],
      ],
    },
    {
      name: "Pipe Maze",
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
      examples: [
        [["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7", 1320]],
        [["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7", 145]],
      ],
    },
    {
      name: "The Floor Will Be Lava",
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
      special: true,
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
      examples: [
        [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3\n", 11]],
        [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3\n", 31]],
      ],
    },
    {
      name: "Red-Nosed Reports",
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
      examples: [
        [["2333133121414131402", 1928]],
        [["2333133121414131402", 2858]],
      ],
    },
    {
      name: "Hoof It",
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
      examples: [[["125 17", 55312]], []],
    },
    {
      name: "Garden Groups",
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
      examples: [[["029A\n980A\n179A\n456A\n379A", 126384]], []],
    },
    {
      name: "Monkey Market",
      examples: [[["1\n10\n100\n2024\n", 37327623]], [["1\n2\n3\n2024\n", 23]]],
    },
    {
      name: "LAN Party",
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
  2025: [
    {
      name: "Secret Entrance",
      examples: [
        [["L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82", 3]],
        [
          ["L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82", 6],
          ["R1000", 10],
        ],
      ],
    },
    {
      name: "Gift Shop",
      examples: [
        [
          [
            "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124",
            1227775554n,
          ],
        ],
        [
          [
            "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124",
            4174379265n,
          ],
        ],
      ],
    },
    {
      name: "Lobby",
      examples: [
        [
          [
            "987654321111111\n811111111111119\n234234234234278\n818181911112111",
            357n,
          ],
        ],
        [
          [
            "987654321111111\n811111111111119\n234234234234278\n818181911112111",
            3121910778619n,
          ],
        ],
      ],
    },
    {
      name: "Printing Department",
      examples: [
        [
          [
            "..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.",
            13,
          ],
        ],
        [
          [
            "..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.",
            43,
          ],
        ],
      ],
    },
    {
      name: "Cafeteria",
      examples: [
        [["3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32", 3]],
        [["3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32", 14n]],
      ],
    },
    {
      name: "Trash Compactor",
      examples: [
        [
          [
            "123 328  51 64 \n45 64  387 23 \n  6 98  215 314\n*   +   *   +  ",
            4277556n,
          ],
        ],
        [
          [
            "123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  ",
            3263827n,
          ],
        ],
      ],
    },
    {
      name: "Laboratories",
      examples: [
        [
          [
            ".......S.......\n...............\n.......^.......\n...............\n......^.^......\n...............\n.....^.^.^.....\n...............\n....^.^...^....\n...............\n...^.^...^.^...\n...............\n..^...^.....^..\n...............\n.^.^.^.^.^...^.\n...............",
            21,
          ],
        ],
        [
          [
            ".......S.......\n...............\n.......^.......\n...............\n......^.^......\n...............\n.....^.^.^.....\n...............\n....^.^...^....\n...............\n...^.^...^.^...\n...............\n..^...^.....^..\n...............\n.^.^.^.^.^...^.\n...............",
            40n,
          ],
        ],
      ],
    },
    {
      name: "Playground",
      examples: [
        [
          [
            "162,817,812\n57,618,57\n906,360,560\n592,479,940\n352,342,300\n466,668,158\n542,29,236\n431,825,988\n739,650,466\n52,470,668\n216,146,977\n819,987,18\n117,168,530\n805,96,715\n346,949,466\n970,615,88\n941,993,340\n862,61,35\n984,92,344\n425,690,689",
            40,
          ],
        ],
        [
          [
            "162,817,812\n57,618,57\n906,360,560\n592,479,940\n352,342,300\n466,668,158\n542,29,236\n431,825,988\n739,650,466\n52,470,668\n216,146,977\n819,987,18\n117,168,530\n805,96,715\n346,949,466\n970,615,88\n941,993,340\n862,61,35\n984,92,344\n425,690,689",
            25272n,
          ],
        ],
      ],
    },
    {
      name: "Movie Theater",
      examples: [
        [["7,1\n11,1\n11,7\n9,7\n9,5\n2,5\n2,3\n7,3", 50n]],
        [["7,1\n11,1\n11,7\n9,7\n9,5\n2,5\n2,3\n7,3", 24n]],
      ],
    },
    {
      name: "Factory",
      examples: [
        [
          [
            "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}\n[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}\n[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
            7,
          ],
        ],
        [
          [
            "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}\n[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}\n[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
            33,
          ],
        ],
      ],
    },
    {
      name: "Reactor",
      examples: [
        [
          [
            "aaa: you hhh\nyou: bbb ccc\nbbb: ddd eee\nccc: ddd eee fff\nddd: ggg\neee: out\nfff: out\nggg: out\nhhh: ccc fff iii\niii: out",
            5,
          ],
        ],
        [
          [
            "svr: aaa bbb\naaa: fft\nfft: ccc\nbbb: tty\ntty: ccc\nccc: ddd eee\nddd: hub\nhub: fff\neee: dac\ndac: fff\nfff: ggg hhh\nggg: out\nhhh: out",
            2n,
          ],
        ],
      ],
    },
    {
      name: "Christmas Tree Farm",
      examples: [[], []],
    },
  ],
};
