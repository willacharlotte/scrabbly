
//TODO: these methods should be moved to the backend to avoid sharing the identity server url

const response = await fetch("/identity_server");
const IDENTITY_SERVER = await response.json();

export const createCredentials = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  };
  return await fetch(IDENTITY_SERVER + "/exchange-credentials", options);
};
