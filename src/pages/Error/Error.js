import React from "react";

import styles from "./error.module.sass";

export const Error = ({ number }) => {
    return <div>Error test {number || 404}</div>;
};
