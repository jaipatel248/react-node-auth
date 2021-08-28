export const signOut = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("sign Out", response);
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};
export const signIn = async (user) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = async (userId, token) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    return response.json();
  });
};
export const removeUser = async (userId, token) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    return response.json();
  });
};
export const Update = async (userId, token, user) => {
  if (typeof window !== "undefined") {
    return await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log("sign Out", response);
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};
