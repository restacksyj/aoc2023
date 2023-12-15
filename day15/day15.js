const fs = require('fs');
const data = fs.readFileSync("./input.txt", "binary");

const hash = (l, curr_value) => {
    const charCode = l.charCodeAt(0)
    curr_value += charCode
    curr_value *= 17
    curr_value %= 256
    return curr_value
}

const func1 = () => {
    const words = data.split(",")
    let sum = 0

    words.forEach(w => {
        const letters = w.split("")
        let internal_curr = 0
        letters.forEach( l => {
            if (l != '\n') {
                internal_curr = hash(l, internal_curr)
            }
        })
        sum += internal_curr
    })

    return sum
}

console.log(func1())
