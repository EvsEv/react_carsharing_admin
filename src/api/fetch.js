export const login = async (username, password) => {
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
            username,
            password,
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

export const fetchData = async (
    name,
    parameter = "",
    value = "",
    limit = "",
    page = 0
) => {
    const appId = process.env.REACT_APP_APPLICATION_ID;
    const bearer = await JSON.parse(localStorage.tokens);

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

        if (!response.ok) {
            throw new Error(response.status);
        }

        const json = await response.json();

        return json.data;
    } catch (e) {
        return {
            code: e.message,
        };
    }
};

export const fetchDataWithComplexParamters = async (name, parameters) => {
    const appId = process.env.REACT_APP_APPLICATION_ID;
    const bearer = await JSON.parse(localStorage.tokens);

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
        if (!response.ok) {
            throw new Error(response.status);
        }
        const json = await response.json();
        return json;
    } catch (e) {
        return {
            code: e.message,
        };
    }
};

export const putData = async (table, body, id) => {
    const appId = process.env.REACT_APP_APPLICATION_ID;
    try {
        const headers = {
            "Content-Type": "application/json",
            "X-Api-Factory-Application-Id": appId,
        };
        const response = await fetch(
            `https://api-factory.simbirsoft1.com/api/db/${table}/${id}`,
            {
                method: "PUT",
                headers,
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            throw new Error(response.status);
        }

        const json = await response.json();

        return json.data;
    } catch (e) {
        return {
            code: e.message,
        };
    }
};

export const getUpdatedTokens = async (refreshToken) => {
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
            refresh_token: refreshToken,
        };
        const login = await fetch(
            "https://api-factory.simbirsoft1.com/api/auth/refresh",
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
