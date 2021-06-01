import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCityList } from "../../redux/thunks/listsOfEntities";
import ListItem from "../ListItem";

import styles from "./list.module.sass";

export const List = ({ current, elements, isChanged, isDeleted }) => {
    return (
        <>
            <div className={styles.add}>Добавить элемент</div>
            <div className={styles.wrapper}>
                {elements?.map((element) => (
                    <ListItem
                        key={element.id}
                        isChanged={isChanged}
                        isDeleted={isDeleted}
                        item={element}
                    />
                ))}
            </div>
        </>
    );
};
