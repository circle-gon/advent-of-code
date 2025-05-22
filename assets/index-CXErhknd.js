const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-CKzVGYK6.js","./externals-IT4aVs_W.js","./day4-COSkKDAX.js","./day11-Cuc2psqN.js","./day12-Zk4JIOo2.js","./assembunny-Bo-dNLAd.js","./day13-DWSymUpW.js","./day14-DbZP4mn8.js","./day17-BI1W1OgT.js","./day23-CkHqvlhD.js","./day24-Dm360LXF.js","./day25-Bc03CPdO.js","./day14-u6q-JCYE.js","./day10-CeUkrA_D.js","./day15-C4OiauQd.js","./day22-CsNNH3rr.js","./day9-CUW6PjCL.js","./day1-Ce2EXhSP.js","./emwasm-B8ueeVv4.js","./day2-CR6liAtw.js","./day3-DG_bRRzL.js","./day10-BeyIcWCs.js","./day20-ByPSMhkf.js","./day16-iFLY-DYd.js","./day18-C0sXcdWR.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const nn="modulepreload",en=function(t,e){return new URL(t,e).href},W={},n=function(e,a,r){let i=Promise.resolve();if(a&&a.length>0){let l=function(u){return Promise.all(u.map(E=>Promise.resolve(E).then(D=>({status:"fulfilled",value:D}),D=>({status:"rejected",reason:D}))))};const s=document.getElementsByTagName("link"),m=document.querySelector("meta[property=csp-nonce]"),f=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));i=l(a.map(u=>{if(u=en(u,r),u in W)return;W[u]=!0;const E=u.endsWith(".css"),D=E?'[rel="stylesheet"]':"";if(!!r)for(let y=s.length-1;y>=0;y--){const x=s[y];if(x.href===u&&(!E||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${D}`))return;const _=document.createElement("link");if(_.rel=E?"stylesheet":nn,E||(_.as="script"),_.crossOrigin="",_.href=u,f&&_.setAttribute("nonce",f),document.head.appendChild(_),E)return new Promise((y,x)=>{_.addEventListener("load",y),_.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return i.then(l=>{for(const s of l||[])s.status==="rejected"&&o(s.reason);return e().catch(o)})},H=(t,e,a)=>{const r=t[e];return r?typeof r=="function"?r():Promise.resolve(r):new Promise((i,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})},S={2015:[{name:"Not Quite Lisp",special:!1,examples:[[["(())",0],["()()",0],["(((",3],["(()(()(",3],["))(((((",3],["())",-1],["))(",-1],[")))",-3],[")())())",-3]],[[")",1],["()())",5]]]},{name:"I Was Told There Would Be No Math",special:!1,examples:[[["2x3x4",58],["1x1x10",43]],[["2x3x4",34],["1x1x10",14]]]},{name:"Perfectly Spherical Houses in a Vacuum",special:!1,examples:[[[">",2],["^>v<",4],["^v^v^v^v^v",2]],[["^v",3],["^>v<",3],["^v^v^v^v^v",11]]]},{name:"The Ideal Stocking Stuffer",special:!1,examples:[[["abcdef",609043],["pqrstuv",1048970]],[]]},{name:"Doesn't He Have Intern-Elves For This?",special:!1,examples:[[["ugknbfddgicrmopn",1],["aaa",1],["jchzalrnumimnmhp",0],["haegwjzuvuyypxyu",0],["dvszwmarrgswjxmb",0]],[["qjhvhtzxzqqjkmpb",1],["xxyxx",1],["uurcxstgmygtbstg",0],["ieodomkazucvgmuy",0]]]},{name:"Probably a Fire Hazard",special:!1,examples:[[],[]]},{name:"Some Assembly Required",special:!1,examples:[[],[]]},{name:"Matchsticks",special:!1,examples:[[[`""
"abc"
"aaa\\"aaa"
"\\x27"`,12]],[[`""
"abc"
"aaa\\"aaa"
"\\x27"`,19]]]},{name:"All in a Single Night",special:!1,examples:[[[`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`,605]],[[`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`,982]]]},{name:"Elves Look, Elves Say",special:!1,examples:[[["1",2],["11",2],["21",4],["1211",6],["111221",6]],[]]},{name:"Corporate Policy",special:!1,examples:[[["abcdefgh","abcdffaa"],["ghijklmn","ghjaabcc"]],[]]},{name:"JSAbacusFramework.io",special:!1,examples:[[["[1,2,3]",6],['{"a":2,"b":4}',6],["[[[3]]]",3],['{"a":{"b":4},"c":-1}',3],['{"a":[-1,1]}',0],['[-1,{"a":1}]',0],["[]",0],["{}",0]],[["[1,2,3]",6],['[1,{"c":"red","b":2},3]',4],['{"d":"red","e":[1,2,3,4],"f":5}',0],['[1,"red",5]',6]]]},{name:"Knights of the Dinner Table",special:!1,examples:[[[`Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.
`,330]],[]]},{name:"Reindeer Olympics",special:!1,examples:[[[`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`,1120]],[[`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`,689]]]},{name:"Science for Hungry People",special:!1,examples:[[[`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
`,62842880]],[[`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
`,576e5]]]},{name:"Aunt Sue",special:!1,examples:[[],[]]},{name:"No Such Thing as Too Much",special:!1,examples:[[[`20
15
10
5
5`,4]],[[`20
15
10
5
5`,3]]]},{name:"Like a GIF For Your Yard",special:!1,examples:[[[`.#.#.#
...##.
#....#
..#...
#.#..#
####..`,4]],[[`.#.#.#
...##.
#....#
..#...
#.#..#
####..`,17]]]},{name:"Medicine for Rudolph",special:!1,examples:[[[`H => HO
H => OH
O => HH

HOH`,4],[`H => HO
H => OH
O => HH

HOHOHO`,7]],[[`e => H
e => O
H => HO
H => OH
O => HH

HOH`,3],[`e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`,6]]]},{name:"Infinite Elves and Infinite Houses",special:!1,examples:[[["100",6]],[]]},{name:"RPG Simulator 20XX",special:!1,examples:[[],[]]},{name:"Wizard Simulator 20XX",special:!1,examples:[[],[]]},{name:"Opening the Turing Lock",special:!1,examples:[[[`inc a
jio a, +2
tpl a
inc a`,2]],[]]},{name:"It Hangs in the Balance",special:!1,examples:[[[`1
2
3
4
5
7
8
9
10
11
`,99]],[[`1
2
3
4
5
7
8
9
10
11
`,44]]]},{name:"Let It Snow",special:!1,examples:[[["To continue, please consult the code grid in the manual.  Enter the code at row 6, column 2.",6796745]],[]]}],2016:[{name:"No Time for a Taxicab",special:!1,examples:[[["R2, L3",5],["R2, R2, R2",2],["R5, L5, R5, R3",12]],[["R8, R4, R4, R8",4]]]},{name:"Bathroom Security",special:!1,examples:[[[`ULL
RRDDD
LURDL
UUUUD`,"1985"]],[[`ULL
RRDDD
LURDL
UUUUD`,"5DB3"]]]},{name:"Squares With Three Sides",special:!1,examples:[[["5 10 25",0]],[]]},{name:"Security Through Obscurity",special:!1,examples:[[[`aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`,1514]],[]]},{name:"How About a Nice Game of Chess?",special:!0,examples:[[["abc","18f47a30"]],[["abc","05ace8e3"]]]},{name:"Signals and Noise",special:!1,examples:[[[`eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`,"easter"]],[[`eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`,"advent"]]]},{name:"Internet Protocol Version 7",special:!1,examples:[[[`abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`,2]],[[`aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`,3]]]},{name:"Two-Factor Authentication",special:!1,examples:[[[`rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`,6]],[]]},{name:"Explosives in Cyberspace",special:!1,examples:[[["ADVENT",6],["A(1x5)BC",7],["(3x3)XYZ",9],["A(2x2)BCD(2x2)EFG",11],["(6x1)(1x3)A",6],["X(8x2)(3x3)ABCY",18]],[["(3x3)XYZ",9],["X(8x2)(3x3)ABCY",20],["(27x12)(20x12)(13x14)(7x10)(1x12)A",241920],["(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN",445]]]},{name:"Balance Bots",special:!1,examples:[[[`value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`,2]],[]]},{name:"Radioisotope Thermoelectric Generators",special:!1,examples:[[[`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`,11]],[]]},{name:"Leonardo's Monorail",special:!1,examples:[[[`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`,42]],[]]},{name:"A Maze of Twisty Little Cubicles",special:!1,examples:[[["10",11]],[]]},{name:"One-Time Pad",special:!0,examples:[[["abc",22728]],[["abc",22551]]]},{name:"Timing is Everything",special:!1,examples:[[[`Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`,5]],[]]},{name:"Dragon Checksum",special:!1,examples:[[["10000","01100"]],[]]},{name:"Two Steps Forward",special:!1,examples:[[["ihgpwlah","DDRRRD"],["kglvqrro","DDUDRLRRUDRD"],["ulqzkmiv","DRURDRUDDLLDLUURRDULRLDUUDDDRR"]],[["ihgpwlah",370],["kglvqrro",492],["ulqzkmiv",830]]]},{name:"Like a Rogue",special:!1,examples:[[[".^^.^.^^^^",38]],[]]},{name:"An Elephant Named Joseph",special:!1,examples:[[["5",3]],[["5",2]]]},{name:"Firewall Rules",special:!1,examples:[[[`5-8
0-2
4-7`,3]],[[`5-8
0-2
4-7`,2]]]},{name:"Scrambled Letters and Hash",special:!1,examples:[[[`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d
`,"decab"]],[[`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d
`,"abcde"]]]},{name:"Grid Computing",special:!1,examples:[[],[]]},{name:"Safe Cracking",special:!1,examples:[[[`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`,3]],[]]},{name:"Air Duct Spelunking",special:!1,examples:[[[`###########
#0.1.....2#
#.#######.#
#4.......3#
###########`,14]],[]]},{name:"Clock Signal",special:!1,examples:[[],[]]}],2017:[{name:"Inverse Captcha",special:!1,examples:[[["1122",3],["1111",4],["1234",0],["91212129",9]],[["1212",6],["1221",0],["123425",4],["123123",12],["12131415",4]]]},{name:"Corruption Checksum",special:!1,examples:[[[`5 1 9 5
7 5 3
2 4 6 8`,18]],[[`5 9 2 8
9 4 7 3
3 8 6 5`,9]]]},{name:"Spiral Memory",special:!1,examples:[[["1",0],["12",3],["23",2],["1024",31]],[]]},{name:"High-Entropy Passphrases",special:!1,examples:[[[`aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`,2]],[[`abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`,3]]]},{name:"A Maze of Twisty Trampolines, All Alike",special:!1,examples:[[[`0
3
0
1
-3`,5]],[[`0
3
0
1
-3`,10]]]},{name:"Memory Reallocation",special:!1,examples:[[["0 2 7 0",5]],[["0 2 7 0",4]]]},{name:"Recursive Circus",special:!1,examples:[[[`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`,"tknk"]],[[`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`,60]]]},{name:"I Heard You Like Registers",special:!1,examples:[[[`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,1]],[[`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,10]]]},{name:"Stream Processing",special:!1,examples:[[["{}{{{}}}{{},{}}{{{},{},{{}}}}{<a>,<a>,<a>,<a>}{{<ab>},{<ab>},{<ab>},{<ab>}}{{<!!>},{<!!>},{<!!>},{<!!>}}{{<a!>},{<a!>},{<a!>},{<ab>}}",50]],[['<><random characters><<<<><{!>}><!!><!!!>><{o"i!a,<{i<a>',32]]]},{name:"Knot Hash",special:!1,examples:[[["3,4,1,5",12]],[["","a2582a3a0e66e6e86e3812dcb672a272"],["AoC 2017","33efeb34ea91902bb2f59c9920caa6cd"],["1,2,3","3efbe78a8d82f29979031a4aa0b16a9d"],["1,2,4","63960835bcdc130f0b66d7ff4f6a5a8e"]]]},{name:"Hex Ed",special:!1,examples:[[["ne,ne,ne",3],["ne,ne,sw,sw",0],["ne,ne,s,s",2],["se,sw,se,sw,sw",3]],[]]},{name:"Digital Plumber",special:!1,examples:[[[`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`,6]],[[`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`,2]]]},{name:"Packet Scanners",special:!1,examples:[[[`0: 3
1: 2
4: 4
6: 4`,24]],[[`0: 3
1: 2
4: 4
6: 4`,10]]]},{name:"Disk Defragmentation",special:!1,examples:[[["flqrgnkx",8108]],[["flqrgnkx",1242]]]},{name:"Dueling Generators",special:!1,examples:[[[`Generator A starts with 65
Generator B starts with 8921`,588]],[[`Generator A starts with 65
Generator B starts with 8921`,309]]]},{name:"Permutation Promenade",special:!1,examples:[[["s1,x3/4,pe/b","baedc"]],[]]},{name:"Spinlock",special:!1,examples:[[["3",638]],[]]},{name:"Duet",special:!1,examples:[[[`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`,4]],[[`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`,3]]]},{name:"A Series of Tubes",special:!1,examples:[[[`     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
`,"ABCDEF"]],[[`     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
`,38]]]},{name:"Particle Swarm",special:!1,examples:[[[`p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`,0]],[[`p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`,1]]]},{name:"Fractal Art",special:!1,examples:[[[`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`,12]],[]]},{name:"Sporifica Virus",special:!1,examples:[[[`..#
#..
...`,5587]],[[`..#
#..
...`,2511944]]]},{name:"Coprocessor Conflagration",special:!1,examples:[[],[]]},{name:"Electromagnetic Moat",special:!1,examples:[[[`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`,31]],[[`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`,19]]]},{name:"The Halting Problem",special:!1,examples:[[[`Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`,3]],[]]}],2018:[{name:"Chronal Calibration",special:!1,examples:[[[`+1
-2
+3
+1`,3],[`+1
+1
+1`,3],[`+1
+1
-2`,0],[`-1
-2
-3`,-6]],[[`+1
-2
+3
+1`,2],[`+1
-1`,0],[`+3
+3
+4
-2
-4`,10],[`-6
+3
+8
+5
-6`,5],[`+7
+7
-2
-7
-4`,14]]]},{name:"Inventory Management System",special:!1,examples:[[[`abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`,12]],[[`abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`,"fgij"]]]},{name:"No Matter How You Slice It",special:!1,examples:[[[`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,4]],[[`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,3]]]},{name:"Repose Record",special:!1,examples:[[[`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`,240]],[[`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`,4455]]]},{name:"Alchemical Reduction",special:!1,examples:[[["aA",0],["abBA",0],["abAB",4],["aabAAB",6],["dabAcCaCBAcCcaDA",10]],[["dabAcCaCBAcCcaDA",4]]]},{name:"Chronal Coordinates",special:!1,examples:[[[`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,17]],[[`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,16]]]},{name:"The Sum of Its Parts",special:!1,examples:[[[`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`,"CABDFE"]],[[`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`,15]]]},{name:"Memory Maneuver",special:!1,examples:[[["2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",138]],[["2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",66]]]},{name:"Marble Mania",special:!1,examples:[[["9 players; last marble is worth 25 points",32],["10 players; last marble is worth 1618 points",8317],["13 players; last marble is worth 7999 points",146373],["17 players; last marble is worth 1104 points",2764],["21 players; last marble is worth 6111 points",54718],["30 players; last marble is worth 5807 point",37305]],[]]},{name:"The Stars Align",special:!1,examples:[[],[]]},{name:"Chronal Charge",special:!1,examples:[[["18","33,45"],["42","21,61"]],[["18","90,269,16"],["42","232,251,12"]]]},{name:"Subterranean Sustainability",special:!1,examples:[[[`initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #
..... => .
#.... => .
##... => .
#.#.. => .
...#. => .
#..#. => .
..##. => .
#.##. => .
.###. => .
....# => .
#...# => .
.#..# => .
##..# => .
..#.# => .
.##.# => .
#..## => .
..### => .
##### => .`,325]],[]]},{name:"Mine Cart Madness",special:!1,examples:[[[`/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `,"7,3"]],[[`/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`,"6,4"]]]},{name:"Chocolate Charts",special:!1,examples:[[["9","5158916779"],["5","0124515891"],["18","9251071085"],["2018","5941429882"]],[["51589",9],["01245",5],["92510",18],["59414",2018]]]},{name:"Beverage Bandits",special:!1,examples:[[[`#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`,27730],[`#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`,36334],[`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`,39514],[`#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`,27755],[`#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`,28944],[`#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`,18740]],[[`#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`,4988],[`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`,31284],[`#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`,3478],[`#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`,6474],[`#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`,1140]]]},{name:"Chronal Classification",special:!1,examples:[[[`Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]



1`,1]],[]]},{name:"Reservoir Research",special:!1,examples:[[[`x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`,57]],[[`x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`,29]]]},{name:"Settlers of The North Pole",special:!1,examples:[[[`.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`,1147]],[]]},{name:"Go With The Flow",special:!1,examples:[[[`#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`,6]],[]]},{name:"A Regular Map",special:!1,examples:[[["^WNE$",3],["^ENWWW(NEEE|SSE(EE|N))$",10],["^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$",18],["^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$",23],["^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$",31]],[]]},{name:"Chronal Conversion",special:!0,examples:[[],[]]},{name:"Mode Maze",special:!1,examples:[[[`depth: 510
target: 10,10`,114]],[[`depth: 510
target: 10,10`,45]]]},{name:"Experimental Emergency Teleportation",special:!1,examples:[[[`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`,7]],[[`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`,36]]]},{name:"Immune System Simulator 20XX",special:!1,examples:[[[`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`,5216]],[]]},{name:"Four-Dimensional Adventure",special:!1,examples:[[[` 0,0,0,0
3,0,0,0
0,3,0,0
0,0,3,0
0,0,0,3
0,0,0,6
9,0,0,0
12,0,0,0`,2],[`-1,2,2,0
0,0,2,-2
0,0,0,-2
-1,2,0,0
-2,-2,-2,2
3,0,2,-1
-1,3,2,2
-1,0,-1,0
0,2,1,-2
3,0,0,0`,4],[`1,-1,0,1
2,0,-1,0
3,2,-1,0
0,0,3,1
0,0,-1,-1
2,3,-2,0
-2,2,0,0
2,-2,0,-1
1,-1,0,-1
3,2,0,2`,3],[`1,-1,-1,-2
-2,-2,0,1
0,2,1,3
-2,3,-2,1
0,2,3,-2
-1,-1,1,-2
0,-2,-1,0
-2,2,3,-1
1,2,2,0
-1,-2,0,-2`,8]],[]]}],2019:[{name:"The Tyranny of the Rocket Equation",special:!1,examples:[[["12",2],["14",2],["1969",654],["100756",33583]],[["14",2],["1969",966],["100756",50346]]]},{name:"1202 Program Alarm",special:!1,examples:[[],[]]},{name:"Crossed Wires",special:!1,examples:[[[`R8,U5,L5,D3
U7,R6,D4,L4`,6],[`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`,159],[`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,135]],[[`R8,U5,L5,D3
U7,R6,D4,L4`,30],[`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`,610],[`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,410]]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]},{name:"",special:!1,examples:[[],[]]}],2023:[{name:"Trebuchet?!",special:!1,examples:[[[`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,142]],[[`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,281]]]},{name:"Cube Conundrum",special:!1,examples:[[[`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`,8]],[[`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`,2286]]]},{name:"Gear Ratios",special:!1,examples:[[[`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`,4361]],[[`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`,467835]]]},{name:"Scratchcards",special:!1,examples:[[[`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`,13]],[[`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`,30]]]},{name:"If You Give A Seed A Fertilizer",special:!0,examples:[[[`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`,35]],[[`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`,46]]]},{name:"Wait For It",special:!1,examples:[[[`Time:      7  15   30
Distance:  9  40  200
`,288]],[[`Time:      7  15   30
Distance:  9  40  200
`,71503]]]},{name:"Camel Cards",special:!1,examples:[[[`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`,6440]],[[`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`,5905]]]},{name:"Haunted Wasteland",special:!1,examples:[[[`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`,2],[`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`,6]],[[`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`,6]]]},{name:"Mirage Maintenance",special:!1,examples:[[[`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`,114]],[[`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`,2]]]},{name:"Pipe Maze",special:!1,examples:[[[`.....
.S-7.
.|.|.
.L-J.
.....
`,4],[`..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`,8]],[[`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`,4],[`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`,8],[`FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`,10]]]},{name:"Cosmic Expansion",special:!1,examples:[[[`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`,374]],[]]},{name:"Hot Springs",special:!1,examples:[[[`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`,21]],[[`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`,525152]]]},{name:"Point of Incidence",special:!1,examples:[[[`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`,405]],[[`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`,400]]]},{name:"Parabolic Reflector Dish",special:!1,examples:[[[`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`,136]],[[`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`,64]]]},{name:"Lens Library",special:!1,examples:[[["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7",1320]],[["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7",145]]]},{name:"The Floor Will Be Lava",special:!1,examples:[[[`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`,46]],[[`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`,51]]]},{name:"Clumsy Crucible",special:!0,examples:[[[`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`,102]],[[`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`,94],[`111111111111
999999999991
999999999991
999999999991
999999999991
`,71]]]},{name:"Lavaduct Lagoon",special:!1,examples:[[[`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`,62]],[[`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`,952408144115]]]},{name:"Aplenty",special:!1,examples:[[[`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
`,19114]],[[`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
`,167409079868e3]]]},{name:"Pulse Propagation",special:!1,examples:[[[`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`,32e6],[`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`,11687500]],[]]},{name:"Step Counter",special:!0,examples:[[[`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`,16]],[]]},{name:"Sand Slabs",special:!0,examples:[[[`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9
`,5]],[[`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9
`,7]]]},{name:"A Long Walk",special:!0,examples:[[[`#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
`,94]],[[`#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
`,154]]]},{name:"Never Tell Me The Odds",special:!1,examples:[[[`19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
`,2]],[]]},{name:"Snowverload",special:!0,examples:[[[`jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr
`,54]],[]]}],2024:[{name:"Historian Hysteria",special:!1,examples:[[[`3   4
4   3
2   5
1   3
3   9
3   3
`,11]],[[`3   4
4   3
2   5
1   3
3   9
3   3
`,31]]]},{name:"Red-Nosed Reports",special:!1,examples:[[[`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`,2]],[[`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`,4]]]},{name:"Mull It Over",special:!1,examples:[[["xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",161]],[["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",48]]]},{name:"Ceres Search",special:!1,examples:[[[`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`,18]],[[`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`,9]]]},{name:"Print Queue",special:!1,examples:[[[`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`,143]],[[`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`,123]]]},{name:"Guard Gallivant",special:!1,examples:[[[`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`,41]],[[`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`,6]]]},{name:"Bridge Repair",special:!1,examples:[[[`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`,3749]],[[`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`,11387]]]},{name:"Resonant Collinearity",special:!1,examples:[[[`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`,14]],[[`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`,34]]]},{name:"Disk Fragmenter",special:!1,examples:[[["2333133121414131402",1928]],[["2333133121414131402",2858]]]},{name:"Hoof It",special:!1,examples:[[[`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`,36]],[[`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`,81]]]},{name:"Plutonian Pebbles",special:!1,examples:[[["125 17",55312]],[]]},{name:"Garden Groups",special:!1,examples:[[[`AAAA
BBCD
BBCC
EEEC
`,140],[`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`,772],[`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`,1930]],[[`AAAA
BBCD
BBCC
EEEC
`,80],[`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`,436],[`EEEEE
EXXXX
EEEEE
EXXXX
EEEEE
`,236],[`AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
`,368],[`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`,1206]]]},{name:"Claw Contraption",special:!1,examples:[[[`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`,480]],[]]},{name:"Restroom Redoubt",special:!1,examples:[[[`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`,12]],[]]},{name:"Warehouse Woes",special:!1,examples:[[[`##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
`,10092],[`########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<
`,2028]],[[`##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
`,9021]]]},{name:"Reindeer Maze",special:!1,examples:[[[`###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`,7036],[`#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
`,11048]],[[`###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`,45],[`#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
`,64]]]},{name:"Chronospatial Computer",special:!1,examples:[[[`Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`,"4,6,3,5,6,3,5,2,1,0"]],[[`Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`,117440n]]]},{name:"RAM Run",special:!1,examples:[[[`5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`,22]],[[`5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`,"6,1"]]]},{name:"Linen Layout",special:!1,examples:[[[`r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`,6]],[[`r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`,16]]]},{name:"Race Condition",special:!1,examples:[[[`###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`,1]],[[`###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`,285]]]},{name:"Keypad Conundrum",special:!1,examples:[[[`029A
980A
179A
456A
379A`,126384]],[]]},{name:"Monkey Market",special:!1,examples:[[[`1
10
100
2024
`,37327623]],[[`1
2
3
2024
`,23]]]},{name:"LAN Party",special:!1,examples:[[[`kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`,7]],[[`kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`,"co,de,ka,ta"]]]},{name:"Crossed Wires",special:!1,examples:[[[`x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02
`,4],[`x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj
`,2024]],[]]},{name:"Code Chronicle",special:!1,examples:[[[`#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
`,3]],[]]}]},U={};function tn(t,e){const a=U[t]??(U[t]=[]);for(;e>=a.length;)a.push(new Worker(t,{type:"module"}));return a[e]}function an(t){return e=>[sn++,tn(t,e)]}let sn=0;function En(t){return(e,a,r)=>new Promise(i=>{const[o,l]=an(t)(a);l.postMessage([o,e]);const s=m=>{const f=m.data;if(f.data[0]===o)switch(f.type){case"done":l.removeEventListener("message",s),i(f.data[1]);break;case"msg":r(f.data[1]);break}};l.addEventListener("message",s)})}function on(t){return t.toLocaleString(void 0)}const $=new Intl.NumberFormat(void 0,{minimumFractionDigits:0,maximumFractionDigits:2});function j(t){const e=(performance.now()-t)/1e3;return e>=1?`${$.format(e)}s`:`${$.format(e*1e3)}ms`}const v=Object.freeze({days:25,parts:2});let k;function rn(){return new Promise(t=>{if(k===void 0){const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/wabt@1.0.36/index.js",e.addEventListener("load",async()=>{k=await WabtModule(),t(k)}),document.body.append(e)}else t(k)})}async function ln(t,e){const a=new WebAssembly.Memory({initial:1}),r={js:{raw:a,log(...i){console.log(...i)},...e}};return{module:(await WebAssembly.instantiate(t,r)).instance.exports,memory:a}}async function yn(t,e){const a=(await rn()).parseWat("",t,{multi_memory:!0}).toBinary({}).buffer;return ln(a,e)}function bn(t,e){const a=t+"\0";if(new TextEncoder().encodeInto(a,new Uint8Array(e.buffer)).read<a.length)throw new TypeError("Bad string or buffer length needs to be increased")}const F=document.getElementById("year"),V=document.getElementById("day"),N=document.getElementById("part"),J=document.getElementById("input-file"),mn=document.getElementById("file-upload"),b=document.getElementById("error"),I=document.getElementById("data"),A=document.getElementById("run"),O=document.getElementById("runex"),h=document.getElementById("runall"),R=document.getElementById("runexall"),d=document.getElementById("result"),c=document.getElementById("time"),T=document.getElementById("update"),C=document.getElementById("multi"),pn=document.getElementById("title"),un=document.getElementById("stuff"),G=Object.keys(S);function dn(){const t={year:G.at(-1),yearData:{}};for(const e of G)t.yearData[e]={day:0,dayData:Array(v.days).fill().map(()=>({input:"",part:0}))};return t}const p=dn();function w(){localStorage.setItem("data",JSON.stringify(p))}function cn(){const t=JSON.parse(localStorage.getItem("data"));t!==null&&(p.year=t.year,Object.assign(p.yearData,t.yearData));for(const e of F.options)e.textContent===p.year&&(e.selected=!0);K()}function K(){V.textContent="";for(let t=1;t<=v.days;t++){const e=document.createElement("option"),a=S[p.year][t-1];e.textContent=`day ${t} (${a.name})${a.special?" (slow)":""}`,V.append(e)}V.selectedIndex=P(),Q()}function Q(){const t=L();I.value=t.input,N.selectedIndex=t.part}function P(){return p.yearData[p.year].day}function L(){const t=p.yearData[p.year];return t.dayData[t.day]}async function M(t){const e=t+1;try{return S[p.year][t].special?(await H(Object.assign({"./solutions/2016/day14/main.js":()=>n(()=>import("./main-CKzVGYK6.js"),__vite__mapDeps([0,1]),import.meta.url),"./solutions/2016/day5/main.js":()=>n(()=>import("./main-BUprHH1E.js"),[],import.meta.url),"./solutions/2018/day21/main.js":()=>n(()=>import("./main-vgZRjDsO.js"),[],import.meta.url),"./solutions/2023/day17/main.js":()=>n(()=>import("./main-B64EaKZm.js"),[],import.meta.url),"./solutions/2023/day21/main.js":()=>n(()=>import("./main-mwzbuHrA.js"),[],import.meta.url),"./solutions/2023/day22/main.js":()=>n(()=>import("./main-B2p5b_sI.js"),[],import.meta.url),"./solutions/2023/day23/main.js":()=>n(()=>import("./main-C6z93boU.js"),[],import.meta.url),"./solutions/2023/day25/main.js":()=>n(()=>import("./main-ChBFTT_o.js"),[],import.meta.url),"./solutions/2023/day5/main.js":()=>n(()=>import("./main-BQePmsOT.js"),[],import.meta.url)}),`./solutions/${p.year}/day${e}/main.js`,5)).default:(await H(Object.assign({"./solutions/2015/day1.js":()=>n(()=>import("./day1-qxn-fwnD.js"),[],import.meta.url),"./solutions/2015/day10.js":()=>n(()=>import("./day10-DZ33U0br.js"),[],import.meta.url),"./solutions/2015/day11.js":()=>n(()=>import("./day11-DmxkoEKk.js"),[],import.meta.url),"./solutions/2015/day12.js":()=>n(()=>import("./day12-qKcXxMcu.js"),[],import.meta.url),"./solutions/2015/day13.js":()=>n(()=>import("./day13-gyTeEeAH.js"),[],import.meta.url),"./solutions/2015/day14.js":()=>n(()=>import("./day14-Bxvi3VEx.js"),[],import.meta.url),"./solutions/2015/day15.js":()=>n(()=>import("./day15-BIGYKcf4.js"),[],import.meta.url),"./solutions/2015/day16.js":()=>n(()=>import("./day16-CmnAaHNt.js"),[],import.meta.url),"./solutions/2015/day17.js":()=>n(()=>import("./day17-CIcSkRLi.js"),[],import.meta.url),"./solutions/2015/day18.js":()=>n(()=>import("./day18-DpsyQQiL.js"),[],import.meta.url),"./solutions/2015/day19.js":()=>n(()=>import("./day19-C2ANp83_.js"),[],import.meta.url),"./solutions/2015/day2.js":()=>n(()=>import("./day2-CmmCbkls.js"),[],import.meta.url),"./solutions/2015/day20.js":()=>n(()=>import("./day20-D5DtZOuL.js"),[],import.meta.url),"./solutions/2015/day21.js":()=>n(()=>import("./day21-Bx4tJpMT.js"),[],import.meta.url),"./solutions/2015/day22.js":()=>n(()=>import("./day22-CcuPtFdN.js"),[],import.meta.url),"./solutions/2015/day23.js":()=>n(()=>import("./day23-C3hbkhQb.js"),[],import.meta.url),"./solutions/2015/day24.js":()=>n(()=>import("./day24-BOf-vnSy.js"),[],import.meta.url),"./solutions/2015/day25.js":()=>n(()=>import("./day25-B2ME8T0w.js"),[],import.meta.url),"./solutions/2015/day3.js":()=>n(()=>import("./day3-DWFBXPLV.js"),[],import.meta.url),"./solutions/2015/day4.js":()=>n(()=>import("./day4-COSkKDAX.js"),__vite__mapDeps([2,1]),import.meta.url),"./solutions/2015/day5.js":()=>n(()=>import("./day5-DkZI3ft0.js"),[],import.meta.url),"./solutions/2015/day6.js":()=>n(()=>import("./day6-CGCrXPvd.js"),[],import.meta.url),"./solutions/2015/day7.js":()=>n(()=>import("./day7-DoIQfFvp.js"),[],import.meta.url),"./solutions/2015/day8.js":()=>n(()=>import("./day8-EclaSTVE.js"),[],import.meta.url),"./solutions/2015/day9.js":()=>n(()=>import("./day9-a1EtIXbZ.js"),[],import.meta.url),"./solutions/2016/day1.js":()=>n(()=>import("./day1-DHUw74dJ.js"),[],import.meta.url),"./solutions/2016/day10.js":()=>n(()=>import("./day10-HYlFe4DN.js"),[],import.meta.url),"./solutions/2016/day11.js":()=>n(()=>import("./day11-Cuc2psqN.js"),__vite__mapDeps([3,1]),import.meta.url),"./solutions/2016/day12.js":()=>n(()=>import("./day12-Zk4JIOo2.js"),__vite__mapDeps([4,5]),import.meta.url),"./solutions/2016/day13.js":()=>n(()=>import("./day13-DWSymUpW.js"),__vite__mapDeps([6,1]),import.meta.url),"./solutions/2016/day14.js":()=>n(()=>import("./day14-DbZP4mn8.js"),__vite__mapDeps([7,1]),import.meta.url),"./solutions/2016/day15.js":()=>n(()=>import("./day15-DGGndMMS.js"),[],import.meta.url),"./solutions/2016/day16.js":()=>n(()=>import("./day16-1km9usEY.js"),[],import.meta.url),"./solutions/2016/day17.js":()=>n(()=>import("./day17-BI1W1OgT.js"),__vite__mapDeps([8,1]),import.meta.url),"./solutions/2016/day18.js":()=>n(()=>import("./day18-CB23w4zG.js"),[],import.meta.url),"./solutions/2016/day19.js":()=>n(()=>import("./day19-C8TBEtbs.js"),[],import.meta.url),"./solutions/2016/day2.js":()=>n(()=>import("./day2-COkPxtSH.js"),[],import.meta.url),"./solutions/2016/day20.js":()=>n(()=>import("./day20-BglPHApk.js"),[],import.meta.url),"./solutions/2016/day21.js":()=>n(()=>import("./day21-VX2c5PbC.js"),[],import.meta.url),"./solutions/2016/day22.js":()=>n(()=>import("./day22-CVzp5bS7.js"),[],import.meta.url),"./solutions/2016/day23.js":()=>n(()=>import("./day23-CkHqvlhD.js"),__vite__mapDeps([9,5]),import.meta.url),"./solutions/2016/day24.js":()=>n(()=>import("./day24-Dm360LXF.js"),__vite__mapDeps([10,1]),import.meta.url),"./solutions/2016/day25.js":()=>n(()=>import("./day25-Bc03CPdO.js"),__vite__mapDeps([11,5]),import.meta.url),"./solutions/2016/day3.js":()=>n(()=>import("./day3-CCJlPAsI.js"),[],import.meta.url),"./solutions/2016/day4.js":()=>n(()=>import("./day4-CiOGADlC.js"),[],import.meta.url),"./solutions/2016/day6.js":()=>n(()=>import("./day6-Ca9k95tG.js"),[],import.meta.url),"./solutions/2016/day7.js":()=>n(()=>import("./day7-zw27xzce.js"),[],import.meta.url),"./solutions/2016/day8.js":()=>n(()=>import("./day8-ChyHdf0M.js"),[],import.meta.url),"./solutions/2016/day9.js":()=>n(()=>import("./day9-D4CPq0IQ.js"),[],import.meta.url),"./solutions/2017/day1.js":()=>n(()=>import("./day1-AX5sh4Q5.js"),[],import.meta.url),"./solutions/2017/day10.js":()=>n(()=>import("./day10-CeUkrA_D.js"),[],import.meta.url),"./solutions/2017/day11.js":()=>n(()=>import("./day11-DhRYD5AU.js"),[],import.meta.url),"./solutions/2017/day12.js":()=>n(()=>import("./day12-BXbaIbi6.js"),[],import.meta.url),"./solutions/2017/day13.js":()=>n(()=>import("./day13-Cvv4hgXW.js"),[],import.meta.url),"./solutions/2017/day14.js":()=>n(()=>import("./day14-u6q-JCYE.js"),__vite__mapDeps([12,13]),import.meta.url),"./solutions/2017/day15.js":()=>n(()=>import("./day15-DsLvBsRl.js"),[],import.meta.url),"./solutions/2017/day16.js":()=>n(()=>import("./day16-IHmh4sop.js"),[],import.meta.url),"./solutions/2017/day17.js":()=>n(()=>import("./day17-B6pkdV33.js"),[],import.meta.url),"./solutions/2017/day18.js":()=>n(()=>import("./day18-CE7Np4y8.js"),[],import.meta.url),"./solutions/2017/day19.js":()=>n(()=>import("./day19-CddZXBfH.js"),[],import.meta.url),"./solutions/2017/day2.js":()=>n(()=>import("./day2-C_v-KglB.js"),[],import.meta.url),"./solutions/2017/day20.js":()=>n(()=>import("./day20-UpV85tqe.js"),[],import.meta.url),"./solutions/2017/day21.js":()=>n(()=>import("./day21-C9tausxX.js"),[],import.meta.url),"./solutions/2017/day22.js":()=>n(()=>import("./day22-BzNx9Xo-.js"),[],import.meta.url),"./solutions/2017/day23.js":()=>n(()=>import("./day23-D2FJ7uJk.js"),[],import.meta.url),"./solutions/2017/day24.js":()=>n(()=>import("./day24-Cueh3xbA.js"),[],import.meta.url),"./solutions/2017/day25.js":()=>n(()=>import("./day25-DHj_A8Kt.js"),[],import.meta.url),"./solutions/2017/day3.js":()=>n(()=>import("./day3-CqajRckV.js"),[],import.meta.url),"./solutions/2017/day4.js":()=>n(()=>import("./day4-SwY8zKBj.js"),[],import.meta.url),"./solutions/2017/day5.js":()=>n(()=>import("./day5-BNgUvX_n.js"),[],import.meta.url),"./solutions/2017/day6.js":()=>n(()=>import("./day6-B8vs9iN-.js"),[],import.meta.url),"./solutions/2017/day7.js":()=>n(()=>import("./day7-XM7MTo2J.js"),[],import.meta.url),"./solutions/2017/day8.js":()=>n(()=>import("./day8-DpKCiAQI.js"),[],import.meta.url),"./solutions/2017/day9.js":()=>n(()=>import("./day9-CLvB-aOY.js"),[],import.meta.url),"./solutions/2018/day1.js":()=>n(()=>import("./day1-Bm-zwWzw.js"),[],import.meta.url),"./solutions/2018/day10.js":()=>n(()=>import("./day10-Bu1Q9V_A.js"),[],import.meta.url),"./solutions/2018/day11.js":()=>n(()=>import("./day11-BXPQIk29.js"),[],import.meta.url),"./solutions/2018/day12.js":()=>n(()=>import("./day12-Bj3dXPk_.js"),[],import.meta.url),"./solutions/2018/day13.js":()=>n(()=>import("./day13-D-zZruyF.js"),[],import.meta.url),"./solutions/2018/day14.js":()=>n(()=>import("./day14-DbOX5eH-.js"),[],import.meta.url),"./solutions/2018/day15.js":()=>n(()=>import("./day15-C4OiauQd.js"),__vite__mapDeps([14,1]),import.meta.url),"./solutions/2018/day16.js":()=>n(()=>import("./day16-BB7YOPwf.js"),[],import.meta.url),"./solutions/2018/day17.js":()=>n(()=>import("./day17-DBqvqLsI.js"),[],import.meta.url),"./solutions/2018/day18.js":()=>n(()=>import("./day18-BzBnzPWZ.js"),[],import.meta.url),"./solutions/2018/day19.js":()=>n(()=>import("./day19-DwfbSHG0.js"),[],import.meta.url),"./solutions/2018/day2.js":()=>n(()=>import("./day2-DPPVgM1P.js"),[],import.meta.url),"./solutions/2018/day20.js":()=>n(()=>import("./day20-_48YtWeo.js"),[],import.meta.url),"./solutions/2018/day22.js":()=>n(()=>import("./day22-CsNNH3rr.js"),__vite__mapDeps([15,1]),import.meta.url),"./solutions/2018/day23.js":()=>n(()=>import("./day23-CKdBEuvy.js"),[],import.meta.url),"./solutions/2018/day24.js":()=>n(()=>import("./day24-DhyOUD14.js"),[],import.meta.url),"./solutions/2018/day25.js":()=>n(()=>import("./day25-B-0wIRU7.js"),[],import.meta.url),"./solutions/2018/day3.js":()=>n(()=>import("./day3-C2TjmQf7.js"),[],import.meta.url),"./solutions/2018/day4.js":()=>n(()=>import("./day4-BQUs6lVn.js"),[],import.meta.url),"./solutions/2018/day5.js":()=>n(()=>import("./day5-DxgauDqK.js"),[],import.meta.url),"./solutions/2018/day6.js":()=>n(()=>import("./day6-BOlQC6wz.js"),[],import.meta.url),"./solutions/2018/day7.js":()=>n(()=>import("./day7-Badq-YC0.js"),[],import.meta.url),"./solutions/2018/day8.js":()=>n(()=>import("./day8-Cej7WW7B.js"),[],import.meta.url),"./solutions/2018/day9.js":()=>n(()=>import("./day9-CUW6PjCL.js"),__vite__mapDeps([16,1]),import.meta.url),"./solutions/2019/day1.js":()=>n(()=>import("./day1-Ce2EXhSP.js"),__vite__mapDeps([17,18]),import.meta.url),"./solutions/2019/day2.js":()=>n(()=>import("./day2-CR6liAtw.js"),__vite__mapDeps([19,18]),import.meta.url),"./solutions/2019/day3.js":()=>n(()=>import("./day3-DG_bRRzL.js"),__vite__mapDeps([20,18]),import.meta.url),"./solutions/2023/day1.js":()=>n(()=>import("./day1-Bgag9Vxb.js"),[],import.meta.url),"./solutions/2023/day10.js":()=>n(()=>import("./day10-BeyIcWCs.js"),__vite__mapDeps([21,1]),import.meta.url),"./solutions/2023/day11.js":()=>n(()=>import("./day11-BpGyJpl_.js"),[],import.meta.url),"./solutions/2023/day12.js":()=>n(()=>import("./day12-Cq4heNnd.js"),[],import.meta.url),"./solutions/2023/day13.js":()=>n(()=>import("./day13-DcVB53Wa.js"),[],import.meta.url),"./solutions/2023/day14.js":()=>n(()=>import("./day14-DxhJ_EF4.js"),[],import.meta.url),"./solutions/2023/day15.js":()=>n(()=>import("./day15-NVDrLEbD.js"),[],import.meta.url),"./solutions/2023/day16.js":()=>n(()=>import("./day16-CPNCjr36.js"),[],import.meta.url),"./solutions/2023/day18.js":()=>n(()=>import("./day18-kGSofyRR.js"),[],import.meta.url),"./solutions/2023/day19.js":()=>n(()=>import("./day19-CLSs37JE.js"),[],import.meta.url),"./solutions/2023/day2.js":()=>n(()=>import("./day2-zemiqYxA.js"),[],import.meta.url),"./solutions/2023/day20.js":()=>n(()=>import("./day20-ByPSMhkf.js"),__vite__mapDeps([22,1]),import.meta.url),"./solutions/2023/day24.js":()=>n(()=>import("./day24-BXqs2Tj8.js"),[],import.meta.url),"./solutions/2023/day3.js":()=>n(()=>import("./day3-CfOPVqu-.js"),[],import.meta.url),"./solutions/2023/day4.js":()=>n(()=>import("./day4-Dvd6uD4s.js"),[],import.meta.url),"./solutions/2023/day6.js":()=>n(()=>import("./day6-D_TXKuep.js"),[],import.meta.url),"./solutions/2023/day7.js":()=>n(()=>import("./day7-DktvTv9H.js"),[],import.meta.url),"./solutions/2023/day8.js":()=>n(()=>import("./day8-BZCV3jmA.js"),[],import.meta.url),"./solutions/2023/day9.js":()=>n(()=>import("./day9-DW47WvpG.js"),[],import.meta.url),"./solutions/2024/day1.js":()=>n(()=>import("./day1-aNq4XnJQ.js"),[],import.meta.url),"./solutions/2024/day10.js":()=>n(()=>import("./day10-DMSQERD3.js"),[],import.meta.url),"./solutions/2024/day11.js":()=>n(()=>import("./day11-DQZ8uVLc.js"),[],import.meta.url),"./solutions/2024/day12.js":()=>n(()=>import("./day12-Jt_zknch.js"),[],import.meta.url),"./solutions/2024/day13.js":()=>n(()=>import("./day13-Bfra3S8E.js"),[],import.meta.url),"./solutions/2024/day14.js":()=>n(()=>import("./day14-DmSKT8gA.js"),[],import.meta.url),"./solutions/2024/day15.js":()=>n(()=>import("./day15-B2KA8pDI.js"),[],import.meta.url),"./solutions/2024/day16.js":()=>n(()=>import("./day16-iFLY-DYd.js"),__vite__mapDeps([23,1]),import.meta.url),"./solutions/2024/day17.js":()=>n(()=>import("./day17-CsLoLGFM.js"),[],import.meta.url),"./solutions/2024/day18.js":()=>n(()=>import("./day18-C0sXcdWR.js"),__vite__mapDeps([24,1]),import.meta.url),"./solutions/2024/day19.js":()=>n(()=>import("./day19-CvaTiosw.js"),[],import.meta.url),"./solutions/2024/day2.js":()=>n(()=>import("./day2-D8x0rC1T.js"),[],import.meta.url),"./solutions/2024/day20.js":()=>n(()=>import("./day20-C5Eb6YeV.js"),[],import.meta.url),"./solutions/2024/day21.js":()=>n(()=>import("./day21-CjCpiC_P.js"),[],import.meta.url),"./solutions/2024/day22.js":()=>n(()=>import("./day22-D-2Qhhu7.js"),[],import.meta.url),"./solutions/2024/day23.js":()=>n(()=>import("./day23-Gce2dQCh.js"),[],import.meta.url),"./solutions/2024/day24.js":()=>n(()=>import("./day24-Bj_vVZlu.js"),[],import.meta.url),"./solutions/2024/day25.js":()=>n(()=>import("./day25-6vrja8Id.js"),[],import.meta.url),"./solutions/2024/day3.js":()=>n(()=>import("./day3-CMkIcII8.js"),[],import.meta.url),"./solutions/2024/day4.js":()=>n(()=>import("./day4-C--UN-Jc.js"),[],import.meta.url),"./solutions/2024/day5.js":()=>n(()=>import("./day5-DdQLmPdy.js"),[],import.meta.url),"./solutions/2024/day6.js":()=>n(()=>import("./day6-BrEue9RB.js"),[],import.meta.url),"./solutions/2024/day7.js":()=>n(()=>import("./day7-DaBGMY4L.js"),[],import.meta.url),"./solutions/2024/day8.js":()=>n(()=>import("./day8-DlQ67Mcp.js"),[],import.meta.url),"./solutions/2024/day9.js":()=>n(()=>import("./day9-F14n4JSy.js"),[],import.meta.url)}),`./solutions/${p.year}/day${e}.js`,4)).default}catch(a){console.error(a)}}function g(){return new Promise(t=>setTimeout(t,0))}const z=Array(v.days*v.parts).fill().map(()=>[]),B=2;function _n(){C.style.display="none";for(let t=0;t<Math.ceil(v.days/B);t++){const e=document.createElement("tr"),a=Math.max(Math.min(v.days-B*t,B),0);for(let r=0;r<a;r++){const i=document.createElement("td"),o=B*t+r;i.textContent=o+1,e.append(i);for(let l=0;l<v.parts;l++)for(let s=0;s<4;s++){const m=document.createElement("td");m.textContent=s===0?l+1:"",e.append(m),s>0&&z[v.parts*o+l].push(m)}}un.append(e)}}function vn(){for(let t=0;t<v.days;t++)for(let e=0;e<v.parts;e++){const a=z[t*v.parts+e];for(const r of a)r.textContent=""}}function Z(t){return Array.isArray(t)&&t.every(e=>e instanceof Node)?"dom":""}function Y(t,e){t.textContent="",t.append(...e)}function X(t,e,a){return e==="2017"&&a===18||e==="2018"&&a===12?t:t.trim()}function fn(){for(const t of G){const e=document.createElement("option");e.textContent=t,F.append(e)}for(let t=1;t<=v.parts;t++){const e=document.createElement("option");e.textContent=`part ${t}`,N.append(e)}mn.addEventListener("click",()=>J.click()),J.addEventListener("change",async()=>{const t=J.files[0];if(t){b.textContent="";const e=await t.text();L().input=e,I.value=e,w()}else b.textContent="No file chosen!"}),I.addEventListener("change",()=>{L().input=I.value,w()}),A.addEventListener("click",async()=>{var t;if(I.value!==""){b.textContent="",d.textContent="Generating solution...",d.className="maybe",c.className="maybe",c.textContent="???",A.disabled=!0,O.disabled=!0,h.disabled=!0,R.disabled=!0,C.style.display="none",await g();let e,a;const r=performance.now();try{const s=(t=await M(P()))==null?void 0:t[L().part];s?(e=await s(X(L().input,p.year,P()),m=>T.textContent=m,!1),a="success"):(e="No solution created",a="skipped")}catch(s){e="Failed to get a result",a="failed",console.error(s)}const i=typeof e=="number",o=i||typeof e=="bigint";i&&e>Number.MAX_SAFE_INTEGER&&(b.textContent="The answer is beyond the precision limit, so it is most likely wrong.",a="failed"),Z(e)==="dom"?Y(d,e):d.textContent=`${e}${o&&e>=1e3?` (${on(e)})`:""}`,d.className=a,c.className=a,c.textContent=j(r),T.textContent="",A.disabled=!1,O.disabled=!1,h.disabled=!1,R.disabled=!1}else b.textContent="No problem data.",d.textContent="???",d.className="skipped",c.className="skipped",c.textContent="???",T.textContent=""}),O.addEventListener("click",async()=>{var r;b.textContent="",d.textContent="Checking...",d.className="maybe",c.className="maybe",c.textContent="???",A.disabled=!0,O.disabled=!0,h.disabled=!0,R.disabled=!0,C.style.display="none",await g();let t,e;const a=performance.now();try{const i=(r=await M(P()))==null?void 0:r[L().part];if(i){const o=S[p.year][P()].examples[L().part];for(const[l,s]of o){const m=await i(X(l,p.year,P()),f=>T.textContent=f,!0);m!==s&&(console.error("Example failed: got",m,"expected",s,"for"),console.log(l),e="failed",t="Examples failed")}e!=="failed"&&(e="success",t="Examples passed")}else t="No solution created",e="skipped"}catch(i){t="Failed to test",e="failed",console.error(i)}c.textContent=j(a),d.textContent=t,d.className=e,c.className=e,T.textContent="",A.disabled=!1,O.disabled=!1,h.disabled=!1,R.disabled=!1}),h.addEventListener("click",async()=>{b.textContent="",d.textContent="Generating solutions...",d.className="maybe",c.className="maybe",c.textContent="???",A.disabled=!0,O.disabled=!0,h.disabled=!0,R.disabled=!0,C.style.display="block",pn.textContent=p.year,vn(),await g();const t=performance.now(),e=[];let a=!1;for(let r=0;r<v.days;r++){const i=p.yearData[p.year].dayData[r].input,o=await M(r)??[];for(let l=0;l<v.parts;l++){const s=z[r*v.parts+l],m=o[l];if(m===void 0||i==="")s[0].textContent=`no ${m?"input":"solution"}`,s[1].textContent="N/A",s[2].textContent="N/A",s[0].className="skipped",s[1].className="skipped",s[2].className="skipped",await g();else{s[0].textContent="running",s[1].textContent="...",s[2].textContent="...",s[0].className="maybe",s[1].className="maybe",s[2].className="maybe",await g();const f=performance.now();e.push(new Promise(u=>u(m(X(i,p.year,r),E=>s[1].textContent=E,!1))).then(async u=>{s[0].textContent="done",s[2].textContent=j(f),s[0].className="success",s[1].className="success",s[2].className="success",Z(u)==="dom"?Y(s[1],u):s[1].textContent=u,await g()}).catch(async u=>{s[0].textContent="failed",s[1].textContent="N/A",s[2].textContent=j(f),s[0].className="failed",s[1].className="failed",s[2].className="failed",a=!0,console.error(u),await g()}))}}}await Promise.allSettled(e),c.textContent=j(t),d.textContent=`All problems done${a?" (some failed)":""}`,d.className=a?"failed":"success",c.className=a?"failed":"success",A.disabled=!1,O.disabled=!1,h.disabled=!1,R.disabled=!1}),R.addEventListener("click",async()=>{async function t(){T.textContent=r.length>0?`(${r.map(([o,l])=>`day ${o+1} part ${l+1}`).join(", ")})`:"",await g()}b.textContent="",d.textContent="Checking...",d.className="maybe",c.textContent="???",c.className="maybe",A.disabled=!0,O.disabled=!0,h.disabled=!0,R.disabled=!0,C.style.display="none",await g();const e=performance.now(),a=[],r=[],i=[];for(let o=0;o<v.days;o++){const l=S[p.year][o].examples,s=await M(o)??[];for(const[m,f]of s.entries()){const u=l[m];let E=0;u.length>0&&(r.push([o,m]),await t());for(const[D,q]of u)i.push(new Promise(_=>_(f(X(D,p.year,o),()=>{},!0))).then(_=>{_!==q&&(console.error(`Day ${o+1} part ${m+1} failed: got`,_,"expected",q,"for"),console.log(D),a.findIndex(([y,x])=>y===o&&x===m)===-1&&a.push([o,m]))}).catch(_=>{a.findIndex(([y,x])=>y===o&&x===m)===-1&&a.push([o,m]),console.error(_)}).finally(async()=>{if(E++,E===u.length){const _=r.findIndex(([y,x])=>y===o&&x===m);r.splice(_,1),await t()}}))}}await Promise.allSettled(i),c.textContent=j(e),d.textContent=a.length===0?"Examples passed":`Examples failed: ${a.map(([o,l])=>`day ${o+1} part ${l+1}`).join(", ")}`,d.className=a.length===0?"success":"failed",c.className=a.length===0?"success":"failed",A.disabled=!1,O.disabled=!1,h.disabled=!1,R.disabled=!1}),I.addEventListener("change",()=>{L().input=I.value,w()}),F.addEventListener("change",()=>{b.textContent="",p.year=G[F.selectedIndex],K(),w()}),V.addEventListener("change",()=>{b.textContent="",p.yearData[p.year].day=V.selectedIndex,Q(),w()}),N.addEventListener("change",()=>{b.textContent="",L().part=N.selectedIndex,w()}),_n(),cn()}fn();export{n as _,yn as a,ln as c,on as f,an as g,bn as m,En as s};
