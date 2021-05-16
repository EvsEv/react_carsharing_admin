import React from "react";
import OrderCard from "../../OrderCard";

import styles from "./paginatedList.module.sass";

export const PaginatedList = ({ elements }) => {
    return (
        <div className={styles.wrapper}>
            {elements?.map((element) => (
                <OrderCard key={element?.id} order={element} />
            ))}
        </div>
    );
};
