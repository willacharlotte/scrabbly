const IDENTITY_SERVER = "http://localhost:8080";

export const createCredentials = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return await fetch(IDENTITY_SERVER + "/create-credentials", options);
};

export const exchangeCredentials = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return await fetch(IDENTITY_SERVER + "/exchange-credentials", options);
};
