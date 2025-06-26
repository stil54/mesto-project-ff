const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "1a962590-fc00-40ad-be8c-08f578d44609",
    "Content-Type": "application/json",
  },
};

const respHandel = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(respHandel);
};

export const getInitialCards = () => {  
  return fetch(`${config.baseUrl}/cards`, {  
    headers: config.headers,  
  }).then(respHandel);
};  

export const updateProfile = (name, about) => {  
  return fetch(`${config.baseUrl}/users/me`, {  
    method: "PATCH",
    headers: config.headers, 
    body: JSON.stringify({  
      name: name,  
      about: about,  
    }), 
  }).then(respHandel);
};
