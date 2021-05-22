export const login = async () => {
    try {
        const secretKey = process.env.REACT_APP_SECRET_KEY;
        const appKey = process.env.REACT_APP_APPLICATION_KEY;
        const appId = process.env.REACT_APP_APPLICATION_ID;
        const key = `${appKey}:${secretKey}`;
        const authKey = window.btoa(key);
        const headers = {
            "Content-Type": "application/json",
            "X-Api-Factory-Application-Id": appId,
            Authorization: "Basic " + authKey,
        };
        const body = {
            username: "intern",
            password: "intern-S!",
        };
        const login = await fetch(
            "https://api-factory.simbirsoft1.com/api/auth/login",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            }
        );

        const bearer = await login.json();
        bearer.username = "Admin";
        return bearer;
    } catch (e) {
        console.log(e);
    }
};

export const logout = async () => {
    try {
        const secretKey = process.env.REACT_APP_SECRET_KEY;
        const appKey = process.env.REACT_APP_APPLICATION_KEY;
        const appId = process.env.REACT_APP_APPLICATION_ID;
        const key = `${appKey}:${secretKey}`;
        const authKey = window.btoa(key);
        const headers = {
            "Content-Type": "application/json",
            "X-Api-Factory-Application-Id": appId,
            Authorization: "Basic " + authKey,
        };
        const logout = await fetch(
            "https://api-factory.simbirsoft1.com/api/auth/logout",
            {
                method: "POST",
                headers: headers,
            }
        );

        const bearer = await logout.json();

        return bearer;
    } catch (e) {
        console.log(e);
    }
};

export const fetchData = async (
    name,
    parameter = "",
    value = "",
    limit = "",
    page = 0
) => {
    const appId = process.env.REACT_APP_APPLICATION_ID;
    const bearer = await JSON.parse(localStorage.bearer);

    const headers = {
        "X-Api-Factory-Application-Id": appId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer.access_token}`,
    };

    try {
        const response = await fetch(
            `https://api-factory.simbirsoft1.com/api/db/${name}?${parameter}=${value}&limit=${limit}&page=${page}`,
            {
                headers,
            }
        );
        const json = await response.json();

        return json.data;
    } catch (e) {
        console.log(e);
    }
};

export const fetchDataWithComplexParamters = async (name, parameters) => {
    const appId = process.env.REACT_APP_APPLICATION_ID;
    const bearer = await JSON.parse(localStorage.bearer);

    const headers = {
        "X-Api-Factory-Application-Id": appId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer.access_token}`,
    };

    try {
        const response = await fetch(
            `https://api-factory.simbirsoft1.com/api/db/${name}?${parameters}`,
            {
                headers,
            }
        );
        const json = await response.json();
        console.log(json.count);
        return json;
    } catch (e) {
        console.log(e);
    }
};
