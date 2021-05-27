import React from "react";

import styles from "./table.module.sass";

export const Table = ({ rows }) => {
    return (
        <div>
            {rows?.map((row) => (
                <div>{row.name}</div>
            ))}
        </div>
    );
};
