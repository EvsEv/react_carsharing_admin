import React from "react";
import { rusification } from "../../../constants/rusification";

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
                        {rusification[tab.name] || tab.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};
