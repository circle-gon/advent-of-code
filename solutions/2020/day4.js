function parse(input) {
  const passports = [];
  for (const line of input.split("\n\n")) {
    const trueLine = line.replaceAll("\n", " ").split(" ");
    const dict = Object.fromEntries(trueLine.map((i) => i.split(":")));
    passports.push(dict);
  }
  return passports;
}

const REQUIRED = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
function part1(input) {
  const passports = parse(input);
  let valid = 0;
  for (const passport of passports) {
    const keys = new Set(Object.keys(passport));
    if (REQUIRED.every((i) => keys.has(i))) valid++;
  }
  return valid;
}

function part2(input) {
  const passports = parse(input);
  let valid = 0;
  for (const passport of passports) {
    const keys = new Set(Object.keys(passport));
    if (REQUIRED.every((i) => keys.has(i))) {
      const byr = Number(passport.byr);
      const iyr = Number(passport.iyr);
      const eyr = Number(passport.eyr);
      const hgt = Number(passport.hgt.slice(0, -2));
      let hgtValid = false;
      if (passport.hgt.endsWith("cm")) hgtValid = hgt >= 150 && hgt <= 193;
      else if (passport.hgt.endsWith("in")) hgtValid = hgt >= 59 && hgt <= 76;
      if (
        byr >= 1920 &&
        byr <= 2002 &&
        iyr >= 2010 &&
        iyr <= 2020 &&
        eyr >= 2020 &&
        eyr <= 2030 &&
        passport.hcl[0] === "#" &&
        passport.hcl.length === 7 &&
        passport.hcl
          .slice(1)
          .split("")
          .every((i) => "0123456789abcdef".includes(i)) &&
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
          passport.ecl,
        ) &&
        !isNaN(passport.pid) &&
        passport.pid.length === 9 &&
        hgtValid
      )
        valid++;
    }
  }
  return valid;
}

export default [part1, part2];
