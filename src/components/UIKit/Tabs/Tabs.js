import React from "react";

import styles from "./tabs.module.sass";

export const Tabs = ({ list, setActive, active }) => {
    return (
        <ul className={styles.tabs}>
            {list?.map((tab, index) => (
                <li
                    className={
                        active?.id === tab?.id
                            ? [styles.item, styles.active].join(" ")
                            : [styles.item].join(" ")
                    }
                    key={index}
                    onClick={() => setActive(tab)}
                >
                    <button className={styles.button}>
                        {tab?.name.toUpperCase()[0] +
                            tab?.name.slice(1, tab?.name.length)}
                    </button>
                </li>
            ))}
        </ul>
    );
};
