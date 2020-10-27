let inputValue = 0;
const calculator = document.querySelector('.calculator');
const input = document.querySelector('.form-control');

let expression = '';

const updateInputValue = () => {
  input.textContent = inputValue;
};
updateInputValue();

const calculate = () => {
  const parsedExpression = expression
    .split('')
    .map((char) => {
      if (/\/|x|-|\+/.test(char)) {
        return `|${char}|`;
      }
      return char;
    })
    .join('')
    .split('|');

  let currentAction = '+';
  inputValue = parsedExpression.reduce((acc, value) => {
    if (/\/|x|-|\+/.test(value)) {
      currentAction = value;
      return acc;
    }

    value = parseFloat(value);

    switch (currentAction) {
      case '/':
        return acc / value;
      case 'x':
        return acc * value;
      case '-':
        return acc - value;
      case '+':
        return acc + value;
    }
  }, 0);

  updateInputValue();

  inputValue = 0;
  expression = '';
};

calculator.onclick = ({ target }) => {
  const unit = target.dataset.unit;
  if (unit) {
    if (unit === '=') {
      calculate();
    } else if (unit === 'clear') {
      expression = '';
      inputValue = 0;
      updateInputValue();
    } else {
      expression += unit;
      inputValue = expression;
      updateInputValue();
    }
  }
};
