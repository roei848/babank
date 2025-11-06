import axios from 'axios';

const API_KEY = 'AIzaSyBX8G4aEkeUtBfhybBBXShq47NKO6oksUk';

const authenticate = async (email, password, mode) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  console.log("response", response.data);
  const res = response.data;
  return res;
};

export const createUser = (email, password) => {
  return authenticate(email, password, 'signUp');
};

export const login = (email, password) => {
  return authenticate(email, password, 'signInWithPassword');
};
