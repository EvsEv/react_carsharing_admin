import React from "react";

import styles from "./controlEdit.module.sass";

export const ControlEdit = ({ variants }) => {
    return (
        <form>
            {variants.map((variant) => (
                <button>{variant.name}</button>
            ))}
        </form>
    );
};
