import React from "react";

import styles from "./table.module.sass";

export const Table = ({ head, body }) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {head.map((item) => (
                            <th>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{body}</tbody>
            </table>
        </div>
    );
};
