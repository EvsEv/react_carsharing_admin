import React from "react";
import ListItem from "../ListItem";

import styles from "./list.module.sass";

export const List = ({ current, elements, isChanged }) => {
    return (
        <div>
            <h2>{current?.name}</h2>
            <div>
                {elements?.map((element) => (
                    <ListItem
                        key={element.id}
                        isChanged={isChanged}
                        item={element}
                    />
                ))}
            </div>
        </div>
    );
};
