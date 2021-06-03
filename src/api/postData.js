export const postData = async (table, body) => {
    const appId = process.env.REACT_APP_APPLICATION_ID;
    const bearer = await JSON.parse(localStorage.tokens);

    const headers = {
        "X-Api-Factory-Application-Id": appId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer.access_token}`,
    };

    try {
        const response = await fetch(
            `https://api-factory.simbirsoft1.com/api/db/${table}`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }
        );

        const json = await response.json();

        return json.data;
    } catch (e) {
        console.log(e);
    }
};
