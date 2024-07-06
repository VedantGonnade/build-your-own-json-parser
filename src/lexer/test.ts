const input = "44";

const NUMBERS = /[0-9]/;
let current = 0;
while (current < input.length) {
  let char = input[current];
  if (NUMBERS.test(char)) {
    let value = "";
    while (NUMBERS.test(char)) {
      value += char;
      console.log(value);

      char = input[current++];
    }
    console.log(value);
  }
}

