export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export const findIndex = (array, value) => {
  for (let i = 0; i < 25; i++) {
    if (array[i] === value) {
      return i;
    }
  }
};

export const countCross = (array) => {
  let count = 0;
  for (let i = 0; i < 5; i++) {
    let f = true;
    for (let j = 0; j < 5; j++) {
      let idx = i * 5 + j;
      if (array[idx].visited === false) {
        f = false;
        break;
      }
    }
    if (f) {
      count++;
    }
  }
  for (let i = 0; i < 5; i++) {
    let f = true;
    for (let j = 0; j < 5; j++) {
      let idx = j * 5 + i;
      if (array[idx].visited === false) {
        f = false;
        break;
      }
    }
    if (f) {
      count++;
    }
  }
  let f = true;
  for (let i = 0; i < 5; i++) {
    let idx = i * 5 + i;
    if (array[idx].visited === false) {
      f = false;
      break;
    }
  }
  if (f) {
    count++;
  }
  f = true;
  for (let i = 0; i < 5; i++) {
    let idx = (i + 1) * 5 - i - 1;
    if (array[idx].visited === false) {
      f = false;
      break;
    }
  }
  if (f) {
    count++;
  }
  return count;
};
