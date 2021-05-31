export const deleteData = async (entity, id) => {
    const appId = process.env.REACT_APP_APPLICATION_ID;
    const bearer = await JSON.parse(localStorage.tokens);

    const headers = {
        "X-Api-Factory-Application-Id": appId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer.access_token}`,
    };

    try {
        const response = await fetch(
            `https://api-factory.simbirsoft1.com/api/db/${entity}/${id}`,
            {
                method: "DELETE",
                headers: headers,
            }
        );

        if (!response.ok) {
            throw new Error(response.status);
        }
        const json = await response.json();
    } catch (e) {
        return {
            code: e.message,
        };
    }
};
