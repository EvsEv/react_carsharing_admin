import React from "react";

import styles from "./table.module.sass";

export const Table = ({ head, body }) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {head.map((item) => (
                            <th key={item}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {body.props.children?.length ? (
                        body
                    ) : (
                        <tr className={styles.notification}>
                            <td>Подходящих вариантов не найдено</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
