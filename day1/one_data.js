const fs = require('fs');
const data = fs.readFileSync("./sample.txt", "binary");


const lines = data.split("\n")
lines.pop()

const func1 = () => {
    let sum = 0
    lines.forEach(line => {
        const fd = line.match(/\d/g);
        sum+= +`${fd[0]}${fd.pop()}`
    });
    console.log(sum)
}

// func1()

const lookup = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

const func2 = () => {
    let sum = 0

    lines.forEach(line => {
        const regex = /\d|(one|two|three|four|five|six|seven|eight|nine)/g
        // const matches = line.match(regex);

        let matches = []
        let m;
        while (m = regex.exec(line)) {
            regex.lastIndex -= m[0].length - 1;
            matches.push(m[0]);
        }

        console.log(matches)
        let fd = matches[0]
        if (lookup[fd]) {
            fd = lookup[fd]
        }
        let ld = matches.pop()
        if (lookup[ld]) {
            ld = lookup[ld]
        }

        let number = +`${fd}${ld}`
        console.log(number)
        sum +=number
    })

    console.log(sum)
}

func2()
