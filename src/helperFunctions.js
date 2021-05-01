export const fetchGet = async (urlToSendTo) => {
  let bearer = "Bearer " + localStorage.getItem("jwtToken");

  let fetchReturn = await fetch(urlToSendTo, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": bearer
    }
  });

  let returnJSON = await fetchReturn.json();

  return returnJSON;
}

export const fetchWithBody = async (urlToSendTo, method, bodyToSend) => {
  let bearer = "Bearer " + localStorage.getItem("jwtToken");

  let fetchReturn = await fetch(urlToSendTo, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": bearer
    },
    body: JSON.stringify(bodyToSend)
  });

  let returnJSON = await fetchReturn.json();

  return returnJSON;
}
