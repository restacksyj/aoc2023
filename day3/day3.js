const fs = require('fs');
const { isNumber } = require('util');
const data = fs.readFileSync("./sample.txt", "binary");


const lines = data.split("\n")
lines.pop()


const arr = []

lines.forEach(line => {
    arr.push(line.split(""))
});

for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    for (let j = 0; j < element.length; j++) {
        const el = Number(element[j])
        if (!Number.isNaN(el)) {
            console.log(el)
        }
        
    }
    
}
// console.log(arr)
