export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/orders/?user.id='+userId) 

    const data = await response.json();
    resolve({ data });
  });
}
