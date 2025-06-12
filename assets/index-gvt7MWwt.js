const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-Ttlda6Fn.js","./externals-IT4aVs_W.js","./day4-COSkKDAX.js","./day11-Cuc2psqN.js","./day12-Zk4JIOo2.js","./assembunny-Bo-dNLAd.js","./day13-DWSymUpW.js","./day14-DbZP4mn8.js","./day17-BI1W1OgT.js","./day23-CkHqvlhD.js","./day24-Dm360LXF.js","./day25-Bc03CPdO.js","./day14-u6q-JCYE.js","./day10-CeUkrA_D.js","./day15-C4OiauQd.js","./day22-CsNNH3rr.js","./day9-CUW6PjCL.js","./day1-BKXVo3wh.js","./emwasm-Dw92gTPk.js","./day10-IdUhbRTv.js","./day11-R0ybJHPu.js","./intcode-YJkym2R9.js","./day12-CkbQo3Ae.js","./day13-X_-Gxs7e.js","./day14-gmDxJIgy.js","./day15-CyM0kteR.js","./day16-0NHZoRgg.js","./day17-lO9k83_A.js","./day18-DkiXtqAn.js","./day19-D0YcyKXf.js","./day2-MC3MAXrq.js","./day20-BWWwcusJ.js","./day21-BtdJYn3g.js","./day22-C0yVfpxJ.js","./day23-CTLwPI-S.js","./day24-B2LNwAly.js","./day25-BU1qt-Pn.js","./day3-WE1dvpwk.js","./day4-DX8HfCim.js","./day5-BJntyoqX.js","./day6-BNW6zadR.js","./day7-C9aSFRH0.js","./day8-ChOPkHVy.js","./day9-sqHt3b8N.js","./day10-BeyIcWCs.js","./day20-ByPSMhkf.js","./day16-iFLY-DYd.js","./day18-C0sXcdWR.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();const an="modulepreload",on=function(e,t){return new URL(e,t).href},U={},n=function(t,a,s){let i=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(y=>Promise.resolve(y).then(C=>({status:"fulfilled",value:C}),C=>({status:"rejected",reason:C}))))};const o=document.getElementsByTagName("link"),m=document.querySelector("meta[property=csp-nonce]"),_=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));i=l(a.map(d=>{if(d=on(d,s),d in U)return;U[d]=!0;const y=d.endsWith(".css"),C=y?'[rel="stylesheet"]':"";if(!!s)for(let b=o.length-1;b>=0;b--){const f=o[b];if(f.href===d&&(!y||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${C}`))return;const v=document.createElement("link");if(v.rel=y?"stylesheet":an,y||(v.as="script"),v.crossOrigin="",v.href=d,_&&v.setAttribute("nonce",_),document.head.appendChild(v),y)return new Promise((b,f)=>{v.addEventListener("load",b),v.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return i.then(l=>{for(const o of l||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})},K=(e,t,a)=>{const s=e[t];return s?typeof s=="function"?s():Promise.resolve(s):new Promise((i,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+t+(t.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})},S={2015:[{name:"Not Quite Lisp",examples:[[["(())",0],["()()",0],["(((",3],["(()(()(",3],["))(((((",3],["())",-1],["))(",-1],[")))",-3],[")())())",-3]],[[")",1],["()())",5]]]},{name:"I Was Told There Would Be No Math",examples:[[["2x3x4",58],["1x1x10",43]],[["2x3x4",34],["1x1x10",14]]]},{name:"Perfectly Spherical Houses in a Vacuum",examples:[[[">",2],["^>v<",4],["^v^v^v^v^v",2]],[["^v",3],["^>v<",3],["^v^v^v^v^v",11]]]},{name:"The Ideal Stocking Stuffer",examples:[[["abcdef",609043],["pqrstuv",1048970]],[]]},{name:"Doesn't He Have Intern-Elves For This?",examples:[[["ugknbfddgicrmopn",1],["aaa",1],["jchzalrnumimnmhp",0],["haegwjzuvuyypxyu",0],["dvszwmarrgswjxmb",0]],[["qjhvhtzxzqqjkmpb",1],["xxyxx",1],["uurcxstgmygtbstg",0],["ieodomkazucvgmuy",0]]]},{name:"Probably a Fire Hazard",examples:[[],[]]},{name:"Some Assembly Required",examples:[[],[]]},{name:"Matchsticks",examples:[[[`""
"abc"
"aaa\\"aaa"
"\\x27"`,12]],[[`""
"abc"
"aaa\\"aaa"
"\\x27"`,19]]]},{name:"All in a Single Night",examples:[[[`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`,605]],[[`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`,982]]]},{name:"Elves Look, Elves Say",examples:[[["1",2],["11",2],["21",4],["1211",6],["111221",6]],[]]},{name:"Corporate Policy",examples:[[["abcdefgh","abcdffaa"],["ghijklmn","ghjaabcc"]],[]]},{name:"JSAbacusFramework.io",examples:[[["[1,2,3]",6],['{"a":2,"b":4}',6],["[[[3]]]",3],['{"a":{"b":4},"c":-1}',3],['{"a":[-1,1]}',0],['[-1,{"a":1}]',0],["[]",0],["{}",0]],[["[1,2,3]",6],['[1,{"c":"red","b":2},3]',4],['{"d":"red","e":[1,2,3,4],"f":5}',0],['[1,"red",5]',6]]]},{name:"Knights of the Dinner Table",examples:[[[`Alice would gain 54 happiness units by sitting next to Bob.
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
`,330]],[]]},{name:"Reindeer Olympics",examples:[[[`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`,1120]],[[`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`,689]]]},{name:"Science for Hungry People",examples:[[[`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
`,62842880]],[[`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
`,576e5]]]},{name:"Aunt Sue",examples:[[],[]]},{name:"No Such Thing as Too Much",examples:[[[`20
15
10
5
5`,4]],[[`20
15
10
5
5`,3]]]},{name:"Like a GIF For Your Yard",examples:[[[`.#.#.#
...##.
#....#
..#...
#.#..#
####..`,4]],[[`.#.#.#
...##.
#....#
..#...
#.#..#
####..`,17]]]},{name:"Medicine for Rudolph",examples:[[[`H => HO
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

HOHOHO`,6]]]},{name:"Infinite Elves and Infinite Houses",examples:[[["100",6]],[]]},{name:"RPG Simulator 20XX",examples:[[],[]]},{name:"Wizard Simulator 20XX",examples:[[],[]]},{name:"Opening the Turing Lock",examples:[[[`inc a
jio a, +2
tpl a
inc a`,2]],[]]},{name:"It Hangs in the Balance",examples:[[[`1
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
`,44]]]},{name:"Let It Snow",examples:[[["To continue, please consult the code grid in the manual.  Enter the code at row 6, column 2.",6796745]],[]]}],2016:[{name:"No Time for a Taxicab",examples:[[["R2, L3",5],["R2, R2, R2",2],["R5, L5, R5, R3",12]],[["R8, R4, R4, R8",4]]]},{name:"Bathroom Security",examples:[[[`ULL
RRDDD
LURDL
UUUUD`,"1985"]],[[`ULL
RRDDD
LURDL
UUUUD`,"5DB3"]]]},{name:"Squares With Three Sides",examples:[[["5 10 25",0]],[]]},{name:"Security Through Obscurity",examples:[[[`aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`,1514]],[]]},{name:"How About a Nice Game of Chess?",special:!0,examples:[[["abc","18f47a30"]],[["abc","05ace8e3"]]]},{name:"Signals and Noise",examples:[[[`eedadn
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
enarar`,"advent"]]]},{name:"Internet Protocol Version 7",examples:[[[`abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`,2]],[[`aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`,3]]]},{name:"Two-Factor Authentication",examples:[[[`rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`,6]],[]]},{name:"Explosives in Cyberspace",examples:[[["ADVENT",6],["A(1x5)BC",7],["(3x3)XYZ",9],["A(2x2)BCD(2x2)EFG",11],["(6x1)(1x3)A",6],["X(8x2)(3x3)ABCY",18]],[["(3x3)XYZ",9],["X(8x2)(3x3)ABCY",20],["(27x12)(20x12)(13x14)(7x10)(1x12)A",241920],["(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN",445]]]},{name:"Balance Bots",examples:[[[`value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`,2]],[]]},{name:"Radioisotope Thermoelectric Generators",examples:[[[`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`,11]],[]]},{name:"Leonardo's Monorail",examples:[[[`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`,42]],[]]},{name:"A Maze of Twisty Little Cubicles",examples:[[["10",11]],[]]},{name:"One-Time Pad",special:!0,examples:[[["abc",22728]],[["abc",22551]]]},{name:"Timing is Everything",examples:[[[`Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`,5]],[]]},{name:"Dragon Checksum",examples:[[["10000","01100"]],[]]},{name:"Two Steps Forward",examples:[[["ihgpwlah","DDRRRD"],["kglvqrro","DDUDRLRRUDRD"],["ulqzkmiv","DRURDRUDDLLDLUURRDULRLDUUDDDRR"]],[["ihgpwlah",370],["kglvqrro",492],["ulqzkmiv",830]]]},{name:"Like a Rogue",examples:[[[".^^.^.^^^^",38]],[]]},{name:"An Elephant Named Joseph",examples:[[["5",3]],[["5",2]]]},{name:"Firewall Rules",examples:[[[`5-8
0-2
4-7`,3]],[[`5-8
0-2
4-7`,2]]]},{name:"Scrambled Letters and Hash",examples:[[[`swap position 4 with position 0
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
`,"abcde"]]]},{name:"Grid Computing",examples:[[],[]]},{name:"Safe Cracking",examples:[[[`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`,3]],[]]},{name:"Air Duct Spelunking",examples:[[[`###########
#0.1.....2#
#.#######.#
#4.......3#
###########`,14]],[]]},{name:"Clock Signal",examples:[[],[]]}],2017:[{name:"Inverse Captcha",examples:[[["1122",3],["1111",4],["1234",0],["91212129",9]],[["1212",6],["1221",0],["123425",4],["123123",12],["12131415",4]]]},{name:"Corruption Checksum",examples:[[[`5 1 9 5
7 5 3
2 4 6 8`,18]],[[`5 9 2 8
9 4 7 3
3 8 6 5`,9]]]},{name:"Spiral Memory",examples:[[["1",0],["12",3],["23",2],["1024",31]],[]]},{name:"High-Entropy Passphrases",examples:[[[`aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`,2]],[[`abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`,3]]]},{name:"A Maze of Twisty Trampolines, All Alike",examples:[[[`0
3
0
1
-3`,5]],[[`0
3
0
1
-3`,10]]]},{name:"Memory Reallocation",examples:[[["0 2 7 0",5]],[["0 2 7 0",4]]]},{name:"Recursive Circus",examples:[[[`pbga (66)
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
cntj (57)`,60]]]},{name:"I Heard You Like Registers",examples:[[[`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,1]],[[`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,10]]]},{name:"Stream Processing",examples:[[["{}{{{}}}{{},{}}{{{},{},{{}}}}{<a>,<a>,<a>,<a>}{{<ab>},{<ab>},{<ab>},{<ab>}}{{<!!>},{<!!>},{<!!>},{<!!>}}{{<a!>},{<a!>},{<a!>},{<ab>}}",50]],[['<><random characters><<<<><{!>}><!!><!!!>><{o"i!a,<{i<a>',32]]]},{name:"Knot Hash",examples:[[["3,4,1,5",12]],[["","a2582a3a0e66e6e86e3812dcb672a272"],["AoC 2017","33efeb34ea91902bb2f59c9920caa6cd"],["1,2,3","3efbe78a8d82f29979031a4aa0b16a9d"],["1,2,4","63960835bcdc130f0b66d7ff4f6a5a8e"]]]},{name:"Hex Ed",examples:[[["ne,ne,ne",3],["ne,ne,sw,sw",0],["ne,ne,s,s",2],["se,sw,se,sw,sw",3]],[]]},{name:"Digital Plumber",examples:[[[`0 <-> 2
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
6 <-> 4, 5`,2]]]},{name:"Packet Scanners",examples:[[[`0: 3
1: 2
4: 4
6: 4`,24]],[[`0: 3
1: 2
4: 4
6: 4`,10]]]},{name:"Disk Defragmentation",examples:[[["flqrgnkx",8108]],[["flqrgnkx",1242]]]},{name:"Dueling Generators",examples:[[[`Generator A starts with 65
Generator B starts with 8921`,588]],[[`Generator A starts with 65
Generator B starts with 8921`,309]]]},{name:"Permutation Promenade",examples:[[["s1,x3/4,pe/b","baedc"]],[]]},{name:"Spinlock",examples:[[["3",638]],[]]},{name:"Duet",examples:[[[`set a 1
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
rcv d`,3]]]},{name:"A Series of Tubes",examples:[[[`     |          
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
`,38]]]},{name:"Particle Swarm",examples:[[[`p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`,0]],[[`p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`,1]]]},{name:"Fractal Art",examples:[[[`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`,12]],[]]},{name:"Sporifica Virus",examples:[[[`..#
#..
...`,5587]],[[`..#
#..
...`,2511944]]]},{name:"Coprocessor Conflagration",examples:[[],[]]},{name:"Electromagnetic Moat",examples:[[[`0/2
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
9/10`,19]]]},{name:"The Halting Problem",examples:[[[`Begin in state A.
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
    - Continue with state A.`,3]],[]]}],2018:[{name:"Chronal Calibration",examples:[[[`+1
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
-4`,14]]]},{name:"Inventory Management System",examples:[[[`abcdef
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
wvxyz`,"fgij"]]]},{name:"No Matter How You Slice It",examples:[[[`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,4]],[[`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,3]]]},{name:"Repose Record",examples:[[[`[1518-11-01 00:00] Guard #10 begins shift
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
[1518-11-05 00:55] wakes up`,4455]]]},{name:"Alchemical Reduction",examples:[[["aA",0],["abBA",0],["abAB",4],["aabAAB",6],["dabAcCaCBAcCcaDA",10]],[["dabAcCaCBAcCcaDA",4]]]},{name:"Chronal Coordinates",examples:[[[`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,17]],[[`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,16]]]},{name:"The Sum of Its Parts",examples:[[[`Step C must be finished before step A can begin.
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
Step F must be finished before step E can begin.`,15]]]},{name:"Memory Maneuver",examples:[[["2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",138]],[["2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",66]]]},{name:"Marble Mania",examples:[[["9 players; last marble is worth 25 points",32],["10 players; last marble is worth 1618 points",8317],["13 players; last marble is worth 7999 points",146373],["17 players; last marble is worth 1104 points",2764],["21 players; last marble is worth 6111 points",54718],["30 players; last marble is worth 5807 point",37305]],[]]},{name:"The Stars Align",examples:[[],[]]},{name:"Chronal Charge",examples:[[["18","33,45"],["42","21,61"]],[["18","90,269,16"],["42","232,251,12"]]]},{name:"Subterranean Sustainability",examples:[[[`initial state: #..#.#..##......###...###

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
##### => .`,325]],[]]},{name:"Mine Cart Madness",examples:[[[`/->-\\        
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
  \\<->/`,"6,4"]]]},{name:"Chocolate Charts",examples:[[["9","5158916779"],["5","0124515891"],["18","9251071085"],["2018","5941429882"]],[["51589",9],["01245",5],["92510",18],["59414",2018]]]},{name:"Beverage Bandits",examples:[[[`#######
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
#########`,1140]]]},{name:"Chronal Classification",examples:[[[`Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]



1`,1]],[]]},{name:"Reservoir Research",examples:[[[`x=495, y=2..7
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
y=13, x=498..504`,29]]]},{name:"Settlers of The North Pole",examples:[[[`.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`,1147]],[]]},{name:"Go With The Flow",examples:[[[`#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`,6]],[]]},{name:"A Regular Map",examples:[[["^WNE$",3],["^ENWWW(NEEE|SSE(EE|N))$",10],["^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$",18],["^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$",23],["^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$",31]],[]]},{name:"Chronal Conversion",special:!0,examples:[[],[]]},{name:"Mode Maze",examples:[[[`depth: 510
target: 10,10`,114]],[[`depth: 510
target: 10,10`,45]]]},{name:"Experimental Emergency Teleportation",examples:[[[`pos=<0,0,0>, r=4
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
pos=<10,10,10>, r=5`,36]]]},{name:"Immune System Simulator 20XX",examples:[[[`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`,5216]],[]]},{name:"Four-Dimensional Adventure",examples:[[[` 0,0,0,0
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
-1,-2,0,-2`,8]],[]]}],2019:[{name:"The Tyranny of the Rocket Equation",examples:[[["12",2],["14",2],["1969",654],["100756",33583]],[["14",2],["1969",966],["100756",50346]]]},{name:"1202 Program Alarm",examples:[[],[]]},{name:"Crossed Wires",examples:[[[`R8,U5,L5,D3
U7,R6,D4,L4`,6],[`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`,159],[`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,135]],[[`R8,U5,L5,D3
U7,R6,D4,L4`,30],[`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`,610],[`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,410]]]},{name:"Secure Container",examples:[[["111111-111111",1],["223450-223450",0],["123789-123789",0]],[["112233-112233",1],["123444-123444",0],["111122-111122",1]]]},{name:"Sunny with a Chance of Asteroids",examples:[[],[]]},{name:"Universal Orbit Map",examples:[[[`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`,42]],[[`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`,4]]]},{name:"Amplification Circuit",examples:[[["3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",43210],["3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",54321],["3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",65210]],[["3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",139629729],["3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10",18216]]]},{name:"Space Image Format",examples:[[],[]]},{name:"Sensor Boost",examples:[[["1102,34915192,34915192,7,4,7,99,0",1219070632396864n],["104,1125899906842624,99",1125899906842624n]],[]]},{name:"Monitoring Station",examples:[[[`.#..#
.....
#####
....#
...##`,8],[`......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`,33],[`#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`,35],[`.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`,41],[`.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`,210]],[[`.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`,802]]]},{name:"Space Police",examples:[[],[]]},{name:"The N-Body Problem",examples:[[],[[`<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`,2772n],[`<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`,4686774924n]]]},{name:"Care Package",interactive:1,examples:[[],[]]},{name:"Space Stoichiometry",examples:[[[`10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`,31],[`9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`,165],[`157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`,13312],[`2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`,180697],[`171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`,2210736]],[[`157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`,82892753],[`2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`,5586022],[`171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`,460664]]]},{name:"Oxygen System",examples:[[],[]]},{name:"Flawed Frequency Transmission",examples:[[["80871224585914546619083218645595","24176176"],["19617804207202209144916044189917","73745418"],["69317163492948606335995924319873","52432133"]],[["03036732577212944063491565474664","84462026"],["02935109699940807407585447034323","78725270"],["03081770884921959731165446850517","53553731"]]]},{name:"Set and Forget",interactive:1,examples:[[],[]]},{name:"Many-Worlds Interpretation",examples:[[[`#########
#b.A.@.a#
#########`,8],[`########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`,86],[`########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`,132],[`#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`,136],[`########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`,81]],[[`#######
#aC#.d#
##...##
##.@.##
##...##
#cB#Ab#
#######`,8],[`###############
#d.ABC.#.....a#
######.#.######
#######@#######
######.#.######
#b.....#.....c#
###############`,24],[`#############
#DcBa.#.GhKl#
#.###.#.#I###
#e#d##@##j#k#
###C#.#.###J#
#fEbA.#.FgHi#
#############`,32]]]},{name:"Tractor Beam",examples:[[],[]]},{name:"Donut Maze",examples:[[[`         A           
         A           
  #######.#########  
  #######.........#  
  #######.#######.#  
  #######.#######.#  
  #######.#######.#  
  #####  B    ###.#  
BC...##  C    ###.#  
  ##.##       ###.#  
  ##...DE  F  ###.#  
  #####    G  ###.#  
  #########.#####.#  
DE..#######...###.#  
  #.#########.###.#  
FG..#########.....#  
  ###########.#####  
             Z       
             Z       `,23],[`                   A               
                   A               
  #################.#############  
  #.#...#...................#.#.#  
  #.#.#.###.###.###.#########.#.#  
  #.#.#.......#...#.....#.#.#...#  
  #.#########.###.#####.#.#.###.#  
  #.............#.#.....#.......#  
  ###.###########.###.#####.#.#.#  
  #.....#        A   C    #.#.#.#  
  #######        S   P    #####.#  
  #.#...#                 #......VT
  #.#.#.#                 #.#####  
  #...#.#               YN....#.#  
  #.###.#                 #####.#  
DI....#.#                 #.....#  
  #####.#                 #.###.#  
ZZ......#               QG....#..AS
  ###.###                 #######  
JO..#.#.#                 #.....#  
  #.#.#.#                 ###.#.#  
  #...#..DI             BU....#..LF
  #####.#                 #.#####  
YN......#               VT..#....QG
  #.###.#                 #.###.#  
  #.#...#                 #.....#  
  ###.###    J L     J    #.#.###  
  #.....#    O F     P    #.#...#  
  #.###.#####.#.#####.#####.###.#  
  #...#.#.#...#.....#.....#.#...#  
  #.#####.###.###.#.#.#########.#  
  #...#.#.....#...#.#.#.#.....#.#  
  #.###.#####.###.###.#.#.#######  
  #.#.........#...#.............#  
  #########.###.###.#############  
           B   J   C               
           U   P   P               `,58]],[[`         A           
         A           
  #######.#########  
  #######.........#  
  #######.#######.#  
  #######.#######.#  
  #######.#######.#  
  #####  B    ###.#  
BC...##  C    ###.#  
  ##.##       ###.#  
  ##...DE  F  ###.#  
  #####    G  ###.#  
  #########.#####.#  
DE..#######...###.#  
  #.#########.###.#  
FG..#########.....#  
  ###########.#####  
             Z       
             Z       `,26],[`             Z L X W       C                 
             Z P Q B       K                 
  ###########.#.#.#.#######.###############  
  #...#.......#.#.......#.#.......#.#.#...#  
  ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###  
  #.#...#.#.#...#.#.#...#...#...#.#.......#  
  #.###.#######.###.###.#.###.###.#.#######  
  #...#.......#.#...#...#.............#...#  
  #.#########.#######.#.#######.#######.###  
  #...#.#    F       R I       Z    #.#.#.#  
  #.###.#    D       E C       H    #.#.#.#  
  #.#...#                           #...#.#  
  #.###.#                           #.###.#  
  #.#....OA                       WB..#.#..ZH
  #.###.#                           #.#.#.#  
CJ......#                           #.....#  
  #######                           #######  
  #.#....CK                         #......IC
  #.###.#                           #.###.#  
  #.....#                           #...#.#  
  ###.###                           #.#.#.#  
XF....#.#                         RF..#.#.#  
  #####.#                           #######  
  #......CJ                       NM..#...#  
  ###.#.#                           #.###.#  
RE....#.#                           #......RF
  ###.###        X   X       L      #.#.#.#  
  #.....#        F   Q       P      #.#.#.#  
  ###.###########.###.#######.#########.###  
  #.....#...#.....#.......#...#.....#.#...#  
  #####.#.###.#######.#######.###.###.#.#.#  
  #.......#.......#.#.#.#.#...#...#...#.#.#  
  #####.###.#####.#.#.#.#.###.###.#.###.###  
  #.......#.....#.#...#...............#...#  
  #############.#.#.###.###################  
               A O F   N                     
               A A D   M                     `,396]]]},{name:"Springdroid Adventure",examples:[[],[]]},{name:"Slam Shuffle",examples:[[],[]]},{name:"Category Six",examples:[[],[]]},{name:"Planet of Discord",examples:[[[`....#
#..#.
#..##
..#..
#....`,2129920]],[[`....#
#..#.
#..##
..#..
#....`,99]]]},{name:"Cryostasis",interactive:0,examples:[[],[]]}],2023:[{name:"Trebuchet?!",examples:[[[`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,142]],[[`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,281]]]},{name:"Cube Conundrum",examples:[[[`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`,8]],[[`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`,2286]]]},{name:"Gear Ratios",examples:[[[`467..114..
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
`,467835]]]},{name:"Scratchcards",examples:[[[`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
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
`,46]]]},{name:"Wait For It",examples:[[[`Time:      7  15   30
Distance:  9  40  200
`,288]],[[`Time:      7  15   30
Distance:  9  40  200
`,71503]]]},{name:"Camel Cards",examples:[[[`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`,6440]],[[`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`,5905]]]},{name:"Haunted Wasteland",examples:[[[`RL

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
`,6]]]},{name:"Mirage Maintenance",examples:[[[`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`,114]],[[`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`,2]]]},{name:"Pipe Maze",examples:[[[`.....
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
`,10]]]},{name:"Cosmic Expansion",examples:[[[`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`,374]],[]]},{name:"Hot Springs",examples:[[[`???.### 1,1,3
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
`,525152]]]},{name:"Point of Incidence",examples:[[[`#.##..##.
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
`,400]]]},{name:"Parabolic Reflector Dish",examples:[[[`O....#....
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
`,64]]]},{name:"Lens Library",examples:[[["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7",1320]],[["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7",145]]]},{name:"The Floor Will Be Lava",examples:[[[`.|...\\....
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
`,71]]]},{name:"Lavaduct Lagoon",examples:[[[`R 6 (#70c710)
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
`,952408144115]]]},{name:"Aplenty",examples:[[[`px{a<2006:qkq,m>2090:A,rfg}
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
`,167409079868e3]]]},{name:"Pulse Propagation",examples:[[[`broadcaster -> a, b, c
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
`,154]]]},{name:"Never Tell Me The Odds",examples:[[[`19, 13, 30 @ -2,  1, -2
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
`,54]],[]]}],2024:[{name:"Historian Hysteria",examples:[[[`3   4
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
`,31]]]},{name:"Red-Nosed Reports",examples:[[[`7 6 4 2 1
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
`,4]]]},{name:"Mull It Over",examples:[[["xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",161]],[["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",48]]]},{name:"Ceres Search",examples:[[[`MMMSXXMASM
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
`,9]]]},{name:"Print Queue",examples:[[[`47|53
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
`,123]]]},{name:"Guard Gallivant",examples:[[[`....#.....
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
`,6]]]},{name:"Bridge Repair",examples:[[[`190: 10 19
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
`,11387]]]},{name:"Resonant Collinearity",examples:[[[`............
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
`,34]]]},{name:"Disk Fragmenter",examples:[[["2333133121414131402",1928]],[["2333133121414131402",2858]]]},{name:"Hoof It",examples:[[[`89010123
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
`,81]]]},{name:"Plutonian Pebbles",examples:[[["125 17",55312]],[]]},{name:"Garden Groups",examples:[[[`AAAA
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
`,1206]]]},{name:"Claw Contraption",examples:[[[`Button A: X+94, Y+34
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
`,480]],[]]},{name:"Restroom Redoubt",examples:[[[`p=0,4 v=3,-3
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
`,12]],[]]},{name:"Warehouse Woes",examples:[[[`##########
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
`,9021]]]},{name:"Reindeer Maze",examples:[[[`###############
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
`,64]]]},{name:"Chronospatial Computer",examples:[[[`Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`,"4,6,3,5,6,3,5,2,1,0"]],[[`Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`,117440n]]]},{name:"RAM Run",examples:[[[`5,4
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
`,"6,1"]]]},{name:"Linen Layout",examples:[[[`r, wr, b, g, bwu, rb, gb, br

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
`,16]]]},{name:"Race Condition",examples:[[[`###############
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
`,285]]]},{name:"Keypad Conundrum",examples:[[[`029A
980A
179A
456A
379A`,126384]],[]]},{name:"Monkey Market",examples:[[[`1
10
100
2024
`,37327623]],[[`1
2
3
2024
`,23]]]},{name:"LAN Party",examples:[[[`kh-tc
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
`,"co,de,ka,ta"]]]},{name:"Crossed Wires",examples:[[[`x00: 1
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
`,2024]],[]]},{name:"Code Chronicle",examples:[[[`#####
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
`,3]],[]]}]},Q={};function sn(e,t){const a=Q[e]??(Q[e]=[]);for(;t>=a.length;)a.push(new Worker(e,{type:"module"}));return a[t]}function rn(e){return t=>[ln++,sn(e,t)]}let ln=0;function fn(e){return(t,a,s)=>new Promise(i=>{const[r,l]=rn(e)(a);l.postMessage([r,t]);const o=m=>{const _=m.data;if(_.data[0]===r)switch(_.type){case"done":l.removeEventListener("message",o),i(_.data[1]);break;case"msg":s(_.data[1]);break}};l.addEventListener("message",o)})}function mn(e){return e.toLocaleString(void 0)}const $=new Intl.NumberFormat(void 0,{minimumFractionDigits:0,maximumFractionDigits:2});function I(e){const t=(performance.now()-e)/1e3;return t>=1?`${$.format(t)}s`:`${$.format(t*1e3)}ms`}const E=Object.freeze({days:25,parts:2});let M;function un(){return new Promise(e=>{if(M===void 0){const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/wabt@1.0.36/index.js",t.addEventListener("load",async()=>{M=await WabtModule(),e(M)}),document.body.append(t)}else e(M)})}async function dn(e,t){const a=new WebAssembly.Memory({initial:1}),s={js:{raw:a,log(...i){console.log(...i)},debugger(){debugger},...t}};return{module:(await WebAssembly.instantiate(e,s)).instance.exports,memory:a}}async function Rn(e,t){const a=(await un()).parseWat("",e,{multi_memory:!0}).toBinary({}).buffer;return dn(a,t)}function An(e,t){const a=e+"\0";if(new TextEncoder().encodeInto(a,new Uint8Array(t.buffer)).read<a.length)throw new TypeError("Bad string or buffer length needs to be increased")}const X=document.getElementById("year"),F=document.getElementById("day"),N=document.getElementById("part"),W=document.getElementById("input-file"),pn=document.getElementById("file-upload"),x=document.getElementById("error"),V=document.getElementById("data"),L=document.getElementById("run"),R=document.getElementById("runint"),D=document.getElementById("runex"),g=document.getElementById("runall"),h=document.getElementById("runexall"),p=document.getElementById("result"),c=document.getElementById("time"),j=document.getElementById("update"),w=document.getElementById("multi"),_n=document.getElementById("title"),cn=document.getElementById("stuff"),J=Object.keys(S);function vn(){const e={year:J.at(-1),yearData:{}};for(const t of J)e.yearData[t]={day:0,dayData:Array(E.days).fill().map(()=>({input:"",part:0}))};return e}const u=vn();function P(){localStorage.setItem("data",JSON.stringify(u))}function En(){const e=JSON.parse(localStorage.getItem("data"));e!==null&&(u.year=e.year,Object.assign(u.yearData,e.yearData));for(const t of X.options)t.textContent===u.year&&(t.selected=!0);nn()}function nn(){F.textContent="";for(let e=1;e<=E.days;e++){const t=document.createElement("option"),a=S[u.year][e-1],s=a.special?"slow":a.interactive?"interactive":"";t.textContent=`day ${e} (${a.name})${s?` (${s})`:""}`,F.append(t)}F.selectedIndex=T(),en()}function en(){const e=A();V.value=e.input,N.selectedIndex=e.part,tn()}function tn(){R.style.display=S[u.year][T()].interactive===A().part?"inline-block":"none"}function T(){return u.yearData[u.year].day}function A(){const e=u.yearData[u.year];return e.dayData[e.day]}async function k(e){const t=e+1;try{return S[u.year][e].special?(await K(Object.assign({"./solutions/2016/day14/main.js":()=>n(()=>import("./main-Ttlda6Fn.js"),__vite__mapDeps([0,1]),import.meta.url),"./solutions/2016/day5/main.js":()=>n(()=>import("./main-B6PyKCqe.js"),[],import.meta.url),"./solutions/2018/day21/main.js":()=>n(()=>import("./main-D4POPqhO.js"),[],import.meta.url),"./solutions/2023/day17/main.js":()=>n(()=>import("./main-DLJ9mVmr.js"),[],import.meta.url),"./solutions/2023/day21/main.js":()=>n(()=>import("./main-C0KZ_MtE.js"),[],import.meta.url),"./solutions/2023/day22/main.js":()=>n(()=>import("./main-CYa5dlq2.js"),[],import.meta.url),"./solutions/2023/day23/main.js":()=>n(()=>import("./main-BQ3ZpJ07.js"),[],import.meta.url),"./solutions/2023/day25/main.js":()=>n(()=>import("./main-O-xCNOxZ.js"),[],import.meta.url),"./solutions/2023/day5/main.js":()=>n(()=>import("./main-BKdLkXCS.js"),[],import.meta.url)}),`./solutions/${u.year}/day${t}/main.js`,5)).default:(await K(Object.assign({"./solutions/2015/day1.js":()=>n(()=>import("./day1-qxn-fwnD.js"),[],import.meta.url),"./solutions/2015/day10.js":()=>n(()=>import("./day10-DZ33U0br.js"),[],import.meta.url),"./solutions/2015/day11.js":()=>n(()=>import("./day11-DmxkoEKk.js"),[],import.meta.url),"./solutions/2015/day12.js":()=>n(()=>import("./day12-qKcXxMcu.js"),[],import.meta.url),"./solutions/2015/day13.js":()=>n(()=>import("./day13-gyTeEeAH.js"),[],import.meta.url),"./solutions/2015/day14.js":()=>n(()=>import("./day14-Bxvi3VEx.js"),[],import.meta.url),"./solutions/2015/day15.js":()=>n(()=>import("./day15-BIGYKcf4.js"),[],import.meta.url),"./solutions/2015/day16.js":()=>n(()=>import("./day16-CmnAaHNt.js"),[],import.meta.url),"./solutions/2015/day17.js":()=>n(()=>import("./day17-CIcSkRLi.js"),[],import.meta.url),"./solutions/2015/day18.js":()=>n(()=>import("./day18-DpsyQQiL.js"),[],import.meta.url),"./solutions/2015/day19.js":()=>n(()=>import("./day19-C2ANp83_.js"),[],import.meta.url),"./solutions/2015/day2.js":()=>n(()=>import("./day2-CmmCbkls.js"),[],import.meta.url),"./solutions/2015/day20.js":()=>n(()=>import("./day20-D5DtZOuL.js"),[],import.meta.url),"./solutions/2015/day21.js":()=>n(()=>import("./day21-Bx4tJpMT.js"),[],import.meta.url),"./solutions/2015/day22.js":()=>n(()=>import("./day22-CcuPtFdN.js"),[],import.meta.url),"./solutions/2015/day23.js":()=>n(()=>import("./day23-C3hbkhQb.js"),[],import.meta.url),"./solutions/2015/day24.js":()=>n(()=>import("./day24-BOf-vnSy.js"),[],import.meta.url),"./solutions/2015/day25.js":()=>n(()=>import("./day25-B2ME8T0w.js"),[],import.meta.url),"./solutions/2015/day3.js":()=>n(()=>import("./day3-DWFBXPLV.js"),[],import.meta.url),"./solutions/2015/day4.js":()=>n(()=>import("./day4-COSkKDAX.js"),__vite__mapDeps([2,1]),import.meta.url),"./solutions/2015/day5.js":()=>n(()=>import("./day5-DkZI3ft0.js"),[],import.meta.url),"./solutions/2015/day6.js":()=>n(()=>import("./day6-CGCrXPvd.js"),[],import.meta.url),"./solutions/2015/day7.js":()=>n(()=>import("./day7-DoIQfFvp.js"),[],import.meta.url),"./solutions/2015/day8.js":()=>n(()=>import("./day8-EclaSTVE.js"),[],import.meta.url),"./solutions/2015/day9.js":()=>n(()=>import("./day9-a1EtIXbZ.js"),[],import.meta.url),"./solutions/2016/day1.js":()=>n(()=>import("./day1-DHUw74dJ.js"),[],import.meta.url),"./solutions/2016/day10.js":()=>n(()=>import("./day10-HYlFe4DN.js"),[],import.meta.url),"./solutions/2016/day11.js":()=>n(()=>import("./day11-Cuc2psqN.js"),__vite__mapDeps([3,1]),import.meta.url),"./solutions/2016/day12.js":()=>n(()=>import("./day12-Zk4JIOo2.js"),__vite__mapDeps([4,5]),import.meta.url),"./solutions/2016/day13.js":()=>n(()=>import("./day13-DWSymUpW.js"),__vite__mapDeps([6,1]),import.meta.url),"./solutions/2016/day14.js":()=>n(()=>import("./day14-DbZP4mn8.js"),__vite__mapDeps([7,1]),import.meta.url),"./solutions/2016/day15.js":()=>n(()=>import("./day15-DGGndMMS.js"),[],import.meta.url),"./solutions/2016/day16.js":()=>n(()=>import("./day16-1km9usEY.js"),[],import.meta.url),"./solutions/2016/day17.js":()=>n(()=>import("./day17-BI1W1OgT.js"),__vite__mapDeps([8,1]),import.meta.url),"./solutions/2016/day18.js":()=>n(()=>import("./day18-CB23w4zG.js"),[],import.meta.url),"./solutions/2016/day19.js":()=>n(()=>import("./day19-C8TBEtbs.js"),[],import.meta.url),"./solutions/2016/day2.js":()=>n(()=>import("./day2-COkPxtSH.js"),[],import.meta.url),"./solutions/2016/day20.js":()=>n(()=>import("./day20-BglPHApk.js"),[],import.meta.url),"./solutions/2016/day21.js":()=>n(()=>import("./day21-VX2c5PbC.js"),[],import.meta.url),"./solutions/2016/day22.js":()=>n(()=>import("./day22-CVzp5bS7.js"),[],import.meta.url),"./solutions/2016/day23.js":()=>n(()=>import("./day23-CkHqvlhD.js"),__vite__mapDeps([9,5]),import.meta.url),"./solutions/2016/day24.js":()=>n(()=>import("./day24-Dm360LXF.js"),__vite__mapDeps([10,1]),import.meta.url),"./solutions/2016/day25.js":()=>n(()=>import("./day25-Bc03CPdO.js"),__vite__mapDeps([11,5]),import.meta.url),"./solutions/2016/day3.js":()=>n(()=>import("./day3-CCJlPAsI.js"),[],import.meta.url),"./solutions/2016/day4.js":()=>n(()=>import("./day4-CiOGADlC.js"),[],import.meta.url),"./solutions/2016/day6.js":()=>n(()=>import("./day6-Ca9k95tG.js"),[],import.meta.url),"./solutions/2016/day7.js":()=>n(()=>import("./day7-zw27xzce.js"),[],import.meta.url),"./solutions/2016/day8.js":()=>n(()=>import("./day8-ChyHdf0M.js"),[],import.meta.url),"./solutions/2016/day9.js":()=>n(()=>import("./day9-D4CPq0IQ.js"),[],import.meta.url),"./solutions/2017/day1.js":()=>n(()=>import("./day1-AX5sh4Q5.js"),[],import.meta.url),"./solutions/2017/day10.js":()=>n(()=>import("./day10-CeUkrA_D.js"),[],import.meta.url),"./solutions/2017/day11.js":()=>n(()=>import("./day11-DhRYD5AU.js"),[],import.meta.url),"./solutions/2017/day12.js":()=>n(()=>import("./day12-BXbaIbi6.js"),[],import.meta.url),"./solutions/2017/day13.js":()=>n(()=>import("./day13-Cvv4hgXW.js"),[],import.meta.url),"./solutions/2017/day14.js":()=>n(()=>import("./day14-u6q-JCYE.js"),__vite__mapDeps([12,13]),import.meta.url),"./solutions/2017/day15.js":()=>n(()=>import("./day15-DsLvBsRl.js"),[],import.meta.url),"./solutions/2017/day16.js":()=>n(()=>import("./day16-IHmh4sop.js"),[],import.meta.url),"./solutions/2017/day17.js":()=>n(()=>import("./day17-B6pkdV33.js"),[],import.meta.url),"./solutions/2017/day18.js":()=>n(()=>import("./day18-CE7Np4y8.js"),[],import.meta.url),"./solutions/2017/day19.js":()=>n(()=>import("./day19-CddZXBfH.js"),[],import.meta.url),"./solutions/2017/day2.js":()=>n(()=>import("./day2-C_v-KglB.js"),[],import.meta.url),"./solutions/2017/day20.js":()=>n(()=>import("./day20-UpV85tqe.js"),[],import.meta.url),"./solutions/2017/day21.js":()=>n(()=>import("./day21-C9tausxX.js"),[],import.meta.url),"./solutions/2017/day22.js":()=>n(()=>import("./day22-BzNx9Xo-.js"),[],import.meta.url),"./solutions/2017/day23.js":()=>n(()=>import("./day23-D2FJ7uJk.js"),[],import.meta.url),"./solutions/2017/day24.js":()=>n(()=>import("./day24-Cueh3xbA.js"),[],import.meta.url),"./solutions/2017/day25.js":()=>n(()=>import("./day25-DHj_A8Kt.js"),[],import.meta.url),"./solutions/2017/day3.js":()=>n(()=>import("./day3-CqajRckV.js"),[],import.meta.url),"./solutions/2017/day4.js":()=>n(()=>import("./day4-SwY8zKBj.js"),[],import.meta.url),"./solutions/2017/day5.js":()=>n(()=>import("./day5-BNgUvX_n.js"),[],import.meta.url),"./solutions/2017/day6.js":()=>n(()=>import("./day6-B8vs9iN-.js"),[],import.meta.url),"./solutions/2017/day7.js":()=>n(()=>import("./day7-XM7MTo2J.js"),[],import.meta.url),"./solutions/2017/day8.js":()=>n(()=>import("./day8-DpKCiAQI.js"),[],import.meta.url),"./solutions/2017/day9.js":()=>n(()=>import("./day9-CLvB-aOY.js"),[],import.meta.url),"./solutions/2018/day1.js":()=>n(()=>import("./day1-Bm-zwWzw.js"),[],import.meta.url),"./solutions/2018/day10.js":()=>n(()=>import("./day10-Bu1Q9V_A.js"),[],import.meta.url),"./solutions/2018/day11.js":()=>n(()=>import("./day11-BXPQIk29.js"),[],import.meta.url),"./solutions/2018/day12.js":()=>n(()=>import("./day12-Bj3dXPk_.js"),[],import.meta.url),"./solutions/2018/day13.js":()=>n(()=>import("./day13-D-zZruyF.js"),[],import.meta.url),"./solutions/2018/day14.js":()=>n(()=>import("./day14-DbOX5eH-.js"),[],import.meta.url),"./solutions/2018/day15.js":()=>n(()=>import("./day15-C4OiauQd.js"),__vite__mapDeps([14,1]),import.meta.url),"./solutions/2018/day16.js":()=>n(()=>import("./day16-BB7YOPwf.js"),[],import.meta.url),"./solutions/2018/day17.js":()=>n(()=>import("./day17-DBqvqLsI.js"),[],import.meta.url),"./solutions/2018/day18.js":()=>n(()=>import("./day18-BzBnzPWZ.js"),[],import.meta.url),"./solutions/2018/day19.js":()=>n(()=>import("./day19-DwfbSHG0.js"),[],import.meta.url),"./solutions/2018/day2.js":()=>n(()=>import("./day2-DPPVgM1P.js"),[],import.meta.url),"./solutions/2018/day20.js":()=>n(()=>import("./day20-_48YtWeo.js"),[],import.meta.url),"./solutions/2018/day22.js":()=>n(()=>import("./day22-CsNNH3rr.js"),__vite__mapDeps([15,1]),import.meta.url),"./solutions/2018/day23.js":()=>n(()=>import("./day23-CKdBEuvy.js"),[],import.meta.url),"./solutions/2018/day24.js":()=>n(()=>import("./day24-DhyOUD14.js"),[],import.meta.url),"./solutions/2018/day25.js":()=>n(()=>import("./day25-B-0wIRU7.js"),[],import.meta.url),"./solutions/2018/day3.js":()=>n(()=>import("./day3-C2TjmQf7.js"),[],import.meta.url),"./solutions/2018/day4.js":()=>n(()=>import("./day4-BQUs6lVn.js"),[],import.meta.url),"./solutions/2018/day5.js":()=>n(()=>import("./day5-DxgauDqK.js"),[],import.meta.url),"./solutions/2018/day6.js":()=>n(()=>import("./day6-BOlQC6wz.js"),[],import.meta.url),"./solutions/2018/day7.js":()=>n(()=>import("./day7-Badq-YC0.js"),[],import.meta.url),"./solutions/2018/day8.js":()=>n(()=>import("./day8-Cej7WW7B.js"),[],import.meta.url),"./solutions/2018/day9.js":()=>n(()=>import("./day9-CUW6PjCL.js"),__vite__mapDeps([16,1]),import.meta.url),"./solutions/2019/day1.js":()=>n(()=>import("./day1-BKXVo3wh.js"),__vite__mapDeps([17,18]),import.meta.url),"./solutions/2019/day10.js":()=>n(()=>import("./day10-IdUhbRTv.js"),__vite__mapDeps([19,18]),import.meta.url),"./solutions/2019/day11.js":()=>n(()=>import("./day11-R0ybJHPu.js"),__vite__mapDeps([20,18,21]),import.meta.url),"./solutions/2019/day12.js":()=>n(()=>import("./day12-CkbQo3Ae.js"),__vite__mapDeps([22,18]),import.meta.url),"./solutions/2019/day13.js":()=>n(()=>import("./day13-X_-Gxs7e.js"),__vite__mapDeps([23,18,21]),import.meta.url),"./solutions/2019/day14.js":()=>n(()=>import("./day14-gmDxJIgy.js"),__vite__mapDeps([24,18]),import.meta.url),"./solutions/2019/day15.js":()=>n(()=>import("./day15-CyM0kteR.js"),__vite__mapDeps([25,18,21]),import.meta.url),"./solutions/2019/day16.js":()=>n(()=>import("./day16-0NHZoRgg.js"),__vite__mapDeps([26,18]),import.meta.url),"./solutions/2019/day17.js":()=>n(()=>import("./day17-lO9k83_A.js"),__vite__mapDeps([27,18,21]),import.meta.url),"./solutions/2019/day18.js":()=>n(()=>import("./day18-DkiXtqAn.js"),__vite__mapDeps([28,18]),import.meta.url),"./solutions/2019/day19.js":()=>n(()=>import("./day19-D0YcyKXf.js"),__vite__mapDeps([29,18,21]),import.meta.url),"./solutions/2019/day2.js":()=>n(()=>import("./day2-MC3MAXrq.js"),__vite__mapDeps([30,18,21]),import.meta.url),"./solutions/2019/day20.js":()=>n(()=>import("./day20-BWWwcusJ.js"),__vite__mapDeps([31,18]),import.meta.url),"./solutions/2019/day21.js":()=>n(()=>import("./day21-BtdJYn3g.js"),__vite__mapDeps([32,18,21]),import.meta.url),"./solutions/2019/day22.js":()=>n(()=>import("./day22-C0yVfpxJ.js"),__vite__mapDeps([33,18]),import.meta.url),"./solutions/2019/day23.js":()=>n(()=>import("./day23-CTLwPI-S.js"),__vite__mapDeps([34,18,21]),import.meta.url),"./solutions/2019/day24.js":()=>n(()=>import("./day24-B2LNwAly.js"),__vite__mapDeps([35,18]),import.meta.url),"./solutions/2019/day25.js":()=>n(()=>import("./day25-BU1qt-Pn.js"),__vite__mapDeps([36,18,21]),import.meta.url),"./solutions/2019/day3.js":()=>n(()=>import("./day3-WE1dvpwk.js"),__vite__mapDeps([37,18]),import.meta.url),"./solutions/2019/day4.js":()=>n(()=>import("./day4-DX8HfCim.js"),__vite__mapDeps([38,18]),import.meta.url),"./solutions/2019/day5.js":()=>n(()=>import("./day5-BJntyoqX.js"),__vite__mapDeps([39,18,21]),import.meta.url),"./solutions/2019/day6.js":()=>n(()=>import("./day6-BNW6zadR.js"),__vite__mapDeps([40,18]),import.meta.url),"./solutions/2019/day7.js":()=>n(()=>import("./day7-C9aSFRH0.js"),__vite__mapDeps([41,18,21]),import.meta.url),"./solutions/2019/day8.js":()=>n(()=>import("./day8-ChOPkHVy.js"),__vite__mapDeps([42,18]),import.meta.url),"./solutions/2019/day9.js":()=>n(()=>import("./day9-sqHt3b8N.js"),__vite__mapDeps([43,18,21]),import.meta.url),"./solutions/2023/day1.js":()=>n(()=>import("./day1-Bgag9Vxb.js"),[],import.meta.url),"./solutions/2023/day10.js":()=>n(()=>import("./day10-BeyIcWCs.js"),__vite__mapDeps([44,1]),import.meta.url),"./solutions/2023/day11.js":()=>n(()=>import("./day11-BpGyJpl_.js"),[],import.meta.url),"./solutions/2023/day12.js":()=>n(()=>import("./day12-Cq4heNnd.js"),[],import.meta.url),"./solutions/2023/day13.js":()=>n(()=>import("./day13-DcVB53Wa.js"),[],import.meta.url),"./solutions/2023/day14.js":()=>n(()=>import("./day14-DxhJ_EF4.js"),[],import.meta.url),"./solutions/2023/day15.js":()=>n(()=>import("./day15-NVDrLEbD.js"),[],import.meta.url),"./solutions/2023/day16.js":()=>n(()=>import("./day16-CPNCjr36.js"),[],import.meta.url),"./solutions/2023/day18.js":()=>n(()=>import("./day18-kGSofyRR.js"),[],import.meta.url),"./solutions/2023/day19.js":()=>n(()=>import("./day19-CLSs37JE.js"),[],import.meta.url),"./solutions/2023/day2.js":()=>n(()=>import("./day2-zemiqYxA.js"),[],import.meta.url),"./solutions/2023/day20.js":()=>n(()=>import("./day20-ByPSMhkf.js"),__vite__mapDeps([45,1]),import.meta.url),"./solutions/2023/day24.js":()=>n(()=>import("./day24-BXqs2Tj8.js"),[],import.meta.url),"./solutions/2023/day3.js":()=>n(()=>import("./day3-CfOPVqu-.js"),[],import.meta.url),"./solutions/2023/day4.js":()=>n(()=>import("./day4-Dvd6uD4s.js"),[],import.meta.url),"./solutions/2023/day6.js":()=>n(()=>import("./day6-D_TXKuep.js"),[],import.meta.url),"./solutions/2023/day7.js":()=>n(()=>import("./day7-DktvTv9H.js"),[],import.meta.url),"./solutions/2023/day8.js":()=>n(()=>import("./day8-BZCV3jmA.js"),[],import.meta.url),"./solutions/2023/day9.js":()=>n(()=>import("./day9-DW47WvpG.js"),[],import.meta.url),"./solutions/2024/day1.js":()=>n(()=>import("./day1-BOMdMomV.js"),[],import.meta.url),"./solutions/2024/day10.js":()=>n(()=>import("./day10-DMSQERD3.js"),[],import.meta.url),"./solutions/2024/day11.js":()=>n(()=>import("./day11-DQZ8uVLc.js"),[],import.meta.url),"./solutions/2024/day12.js":()=>n(()=>import("./day12-Jt_zknch.js"),[],import.meta.url),"./solutions/2024/day13.js":()=>n(()=>import("./day13-Bfra3S8E.js"),[],import.meta.url),"./solutions/2024/day14.js":()=>n(()=>import("./day14-DmSKT8gA.js"),[],import.meta.url),"./solutions/2024/day15.js":()=>n(()=>import("./day15-B2KA8pDI.js"),[],import.meta.url),"./solutions/2024/day16.js":()=>n(()=>import("./day16-iFLY-DYd.js"),__vite__mapDeps([46,1]),import.meta.url),"./solutions/2024/day17.js":()=>n(()=>import("./day17-CsLoLGFM.js"),[],import.meta.url),"./solutions/2024/day18.js":()=>n(()=>import("./day18-C0sXcdWR.js"),__vite__mapDeps([47,1]),import.meta.url),"./solutions/2024/day19.js":()=>n(()=>import("./day19-CvaTiosw.js"),[],import.meta.url),"./solutions/2024/day2.js":()=>n(()=>import("./day2-C53A1T8z.js"),[],import.meta.url),"./solutions/2024/day20.js":()=>n(()=>import("./day20-C5Eb6YeV.js"),[],import.meta.url),"./solutions/2024/day21.js":()=>n(()=>import("./day21-CjCpiC_P.js"),[],import.meta.url),"./solutions/2024/day22.js":()=>n(()=>import("./day22-D-2Qhhu7.js"),[],import.meta.url),"./solutions/2024/day23.js":()=>n(()=>import("./day23-Gce2dQCh.js"),[],import.meta.url),"./solutions/2024/day24.js":()=>n(()=>import("./day24-Bj_vVZlu.js"),[],import.meta.url),"./solutions/2024/day25.js":()=>n(()=>import("./day25-6vrja8Id.js"),[],import.meta.url),"./solutions/2024/day3.js":()=>n(()=>import("./day3-BtCjeQ-r.js"),[],import.meta.url),"./solutions/2024/day4.js":()=>n(()=>import("./day4-BzCyglXV.js"),[],import.meta.url),"./solutions/2024/day5.js":()=>n(()=>import("./day5-DgEXGf7H.js"),[],import.meta.url),"./solutions/2024/day6.js":()=>n(()=>import("./day6-6sU_u8gG.js"),[],import.meta.url),"./solutions/2024/day7.js":()=>n(()=>import("./day7-DaBGMY4L.js"),[],import.meta.url),"./solutions/2024/day8.js":()=>n(()=>import("./day8-DlQ67Mcp.js"),[],import.meta.url),"./solutions/2024/day9.js":()=>n(()=>import("./day9-F14n4JSy.js"),[],import.meta.url)}),`./solutions/${u.year}/day${t}.js`,4)).default}catch(a){console.error(a)}}function O(){return new Promise(e=>setTimeout(e,0))}const z=Array(E.days*E.parts).fill().map(()=>[]),B=2;function yn(){w.style.display="none";for(let e=0;e<Math.ceil(E.days/B);e++){const t=document.createElement("tr"),a=Math.max(Math.min(E.days-B*e,B),0);for(let s=0;s<a;s++){const i=document.createElement("td"),r=B*e+s;i.textContent=r+1,t.append(i);for(let l=0;l<E.parts;l++)for(let o=0;o<4;o++){const m=document.createElement("td");m.textContent=o===0?l+1:"",t.append(m),o>0&&z[E.parts*r+l].push(m)}}cn.append(t)}}function bn(){for(let e=0;e<E.days;e++)for(let t=0;t<E.parts;t++){const a=z[e*E.parts+t];for(const s of a)s.textContent=""}}function q(e){return Array.isArray(e)&&e.every(t=>t instanceof Node||typeof t=="string")?"dom":""}function Z(e,t){e.textContent="",e.append(...t)}function G(e,t,a){return t==="2017"&&a===18||t==="2018"&&a===12||t==="2019"&&a===19?e:e.trim()}async function Y(e){var t;if(V.value!==""){x.textContent="",p.textContent="Generating solution...",p.className="maybe",c.className="maybe",c.textContent="???",L.disabled=!0,R.disabled=!0,D.disabled=!0,g.disabled=!0,h.disabled=!0,w.style.display="none",await O();let a,s;const i=performance.now();try{const m=(t=await k(T()))==null?void 0:t[A().part];m?(a=await m(G(A().input,u.year,T()),_=>{q(_)==="dom"?Z(p,_):j.textContent=_},!1,e),s="success"):(a="No solution created",s="skipped")}catch(m){a="Failed to get a result",s="failed",console.error(m)}const r=typeof a=="number",l=r||typeof a=="bigint";r&&a>Number.MAX_SAFE_INTEGER&&(x.textContent="The answer is beyond the precision limit, so it is most likely wrong.",s="failed"),q(a)==="dom"?Z(p,a):p.textContent=`${a}${l&&a>=1e3?` (${mn(a)})`:""}`,p.className=s,c.className=s,c.textContent=I(i),j.textContent="",L.disabled=!1,R.disabled=!1,D.disabled=!1,g.disabled=!1,h.disabled=!1}else x.textContent="No problem data.",p.textContent="???",p.className="skipped",c.className="skipped",c.textContent="???",j.textContent=""}function xn(){for(const e of J){const t=document.createElement("option");t.textContent=e,X.append(t)}for(let e=1;e<=E.parts;e++){const t=document.createElement("option");t.textContent=`part ${e}`,N.append(t)}pn.addEventListener("click",()=>W.click()),W.addEventListener("change",async()=>{const e=W.files[0];if(e){x.textContent="";const t=await e.text();A().input=t,V.value=t,P()}else x.textContent="No file chosen!"}),V.addEventListener("change",()=>{A().input=V.value,P()}),L.addEventListener("click",()=>Y(!1)),R.addEventListener("click",()=>Y(!0)),D.addEventListener("click",async()=>{var s;x.textContent="",p.textContent="Checking...",p.className="maybe",c.className="maybe",c.textContent="???",L.disabled=!0,R.disabled=!0,D.disabled=!0,g.disabled=!0,h.disabled=!0,w.style.display="none",await O();let e,t;const a=performance.now();try{const i=(s=await k(T()))==null?void 0:s[A().part];if(i){const r=S[u.year][T()].examples[A().part];for(const[l,o]of r){const m=await i(G(l,u.year,T()),_=>j.textContent=_,!0,!1);m!==o&&(console.error("Example failed: got",m,"expected",o,"for"),console.log(l),t="failed",e="Examples failed")}t!=="failed"&&(t="success",e="Examples passed")}else e="No solution created",t="skipped"}catch(i){e="Failed to test",t="failed",console.error(i)}c.textContent=I(a),p.textContent=e,p.className=t,c.className=t,j.textContent="",L.disabled=!1,R.disabled=!1,D.disabled=!1,g.disabled=!1,h.disabled=!1}),g.addEventListener("click",async()=>{x.textContent="",p.textContent="Generating solutions...",p.className="maybe",c.className="maybe",c.textContent="???",L.disabled=!0,R.disabled=!0,D.disabled=!0,g.disabled=!0,h.disabled=!0,w.style.display="block",_n.textContent=u.year,bn(),await O();const e=performance.now(),t=[];let a=!1;for(let s=0;s<E.days;s++){const i=u.yearData[u.year].dayData[s].input,r=await k(s)??[];for(let l=0;l<E.parts;l++){const o=z[s*E.parts+l],m=r[l];if(m===void 0||i==="")o[0].textContent=`no ${m?"input":"solution"}`,o[1].textContent="N/A",o[2].textContent="N/A",o[0].className="skipped",o[1].className="skipped",o[2].className="skipped",await O();else{o[0].textContent="running",o[1].textContent="...",o[2].textContent="...",o[0].className="maybe",o[1].className="maybe",o[2].className="maybe",await O();const _=performance.now();t.push(new Promise(d=>d(m(G(i,u.year,s),y=>o[1].textContent=y,!1,!1))).then(async d=>{o[0].textContent="done",o[2].textContent=I(_),o[0].className="success",o[1].className="success",o[2].className="success",q(d)==="dom"?Z(o[1],d):o[1].textContent=d,await O()}).catch(async d=>{o[0].textContent="failed",o[1].textContent="N/A",o[2].textContent=I(_),o[0].className="failed",o[1].className="failed",o[2].className="failed",a=!0,console.error(d),await O()}))}}}await Promise.allSettled(t),c.textContent=I(e),p.textContent=`All problems done${a?" (some failed)":""}`,p.className=a?"failed":"success",c.className=a?"failed":"success",L.disabled=!1,R.disabled=!1,D.disabled=!1,g.disabled=!1,h.disabled=!1}),h.addEventListener("click",async()=>{async function e(){j.textContent=s.length>0?`(${s.map(([r,l])=>`day ${r+1} part ${l+1}`).join(", ")})`:"",await O()}x.textContent="",p.textContent="Checking...",p.className="maybe",c.textContent="???",c.className="maybe",L.disabled=!0,R.disabled=!0,D.disabled=!0,g.disabled=!0,h.disabled=!0,w.style.display="none",await O();const t=performance.now(),a=[],s=[],i=[];for(let r=0;r<E.days;r++){const l=S[u.year][r].examples,o=await k(r)??[];for(const[m,_]of o.entries()){const d=l[m];let y=0;d.length>0&&(s.push([r,m]),await e());for(const[C,H]of d)i.push(new Promise(v=>v(_(G(C,u.year,r),()=>{},!0,!1))).then(v=>{v!==H&&(console.error(`Day ${r+1} part ${m+1} failed: got`,v,"expected",H,"for"),console.log(C),a.findIndex(([b,f])=>b===r&&f===m)===-1&&a.push([r,m]))}).catch(v=>{a.findIndex(([b,f])=>b===r&&f===m)===-1&&a.push([r,m]),console.error(v)}).finally(async()=>{if(y++,y===d.length){const v=s.findIndex(([b,f])=>b===r&&f===m);s.splice(v,1),await e()}}))}}await Promise.allSettled(i),c.textContent=I(t),p.textContent=a.length===0?"Examples passed":`Examples failed: ${a.map(([r,l])=>`day ${r+1} part ${l+1}`).join(", ")}`,p.className=a.length===0?"success":"failed",c.className=a.length===0?"success":"failed",L.disabled=!1,R.disabled=!1,D.disabled=!1,g.disabled=!1,h.disabled=!1}),V.addEventListener("change",()=>{A().input=V.value,P()}),X.addEventListener("change",()=>{x.textContent="",u.year=J[X.selectedIndex],nn(),P()}),F.addEventListener("change",()=>{x.textContent="",u.yearData[u.year].day=F.selectedIndex,en(),P()}),N.addEventListener("change",()=>{x.textContent="",A().part=N.selectedIndex,tn(),P()}),yn(),En()}xn();export{n as _,Rn as a,dn as c,mn as f,rn as g,An as m,fn as s};
