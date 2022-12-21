const dict = new Map();

const addActiveUser = (username, name) => {
  dict.set(username, { engage: false, name:name });
};
const removeActiveUser = (username) => {
  dict.delete(username);
};
const getAllUser = () => {
  return [...dict.entries()];
};

const isUserEngage = (username) => {
  if (dict.get(username)) {
    return dict.get(username).engage;
  }
  return true;
};

const setUserToEngage = (username) => {
  if (dict.has(username)) {
    let info = dict.get(username);
    dict.set(username, { ...info, engage: true });
  }
};
const setUserToUnengage = (username) => {
  if (dict.has(username)) {
    let info = dict.get(username);
    dict.set(username, { ...info, engage: false });
  }
};

module.exports = {
  setUserToEngage,
  setUserToUnengage,
  addActiveUser,
  removeActiveUser,
  getAllUser,
  isUserEngage,
};
