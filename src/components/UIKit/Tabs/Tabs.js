import React from "react";

import styles from "./tabs.module.sass";

export const Tabs = ({ list, setActive }) => {
    return (
        <ul>
            {list?.map((tab, index) => (
                <li key={index} onClick={() => setActive(tab)}>
                    <button>{tab?.name}</button>
                </li>
            ))}
        </ul>
    );
};
