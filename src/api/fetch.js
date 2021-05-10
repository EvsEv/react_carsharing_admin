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
        const login = await fetch(
            "https://api-factory.simbirsoft1.com/api/auth/logout",
            {
                method: "POST",
                headers: headers,
            }
        );

        const bearer = await login.json();

        return bearer;
    } catch (e) {
        console.log(e);
    }
};
