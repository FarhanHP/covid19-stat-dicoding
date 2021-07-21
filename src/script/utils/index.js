const renderNumber = (number) => {
  const strNumber = String(number);

  const output = [];

  let count = 0;

  for (let i = strNumber.length; i >= 0; i -= 1) {
    output.splice(0, 0, strNumber.charAt(i));

    if (count !== 0 && count % 3 === 0 && i !== 0) {
      output.splice(0, 0, ',');
    }

    count += 1;
  }

  return output.join('');
};

const displayDate = (date) => {
  const years = date.getFullYear();
  const months = date.getMonth() + 1;
  const dates = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${years}/${months}/${dates} ${hours}:${minutes}`;
};

module.exports = { renderNumber, displayDate };
