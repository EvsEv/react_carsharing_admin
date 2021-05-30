import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../../components/List";
import Paginate from "../../components/UIKit/Paginate";
import Tabs from "../../components/UIKit/Tabs";

import {
    addOtherEntities,
    changeLastViewedPage,
    getFilteredEntityList,
    setSelectedEntity,
} from "../../redux/thunks/entitiesList";
import { getCityList } from "../../redux/thunks/listsOfEntities";

import styles from "./entitiesList.module.sass";

export const EntitiesList = () => {
    const {
        otherEntities,
        selectedEntity,
        filteredListBySelected,
        lastViewedPage,
        countOfAllPages,
    } = useSelector((state) => state.entitiesList);
    const dispatch = useDispatch();

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        dispatch(addOtherEntities());
    }, []);

    useEffect(() => {
        dispatch(getFilteredEntityList());
    }, [otherEntities]);

    useEffect(() => {
        dispatch(getFilteredEntityList());
    }, [isChanged]);

    const onSelectTab = (tab) => {
        dispatch(setSelectedEntity(tab));
        dispatch(changeLastViewedPage(0));
    };

    return (
        <>
            <h1 className={styles.title}>Все сущности</h1>
            <section className={styles.content}>
                <Tabs list={otherEntities} setActive={onSelectTab} />
                <List
                    current={selectedEntity}
                    elements={filteredListBySelected}
                    isChanged={setIsChanged}
                />
                <Paginate
                    activePage={lastViewedPage}
                    countOfPages={countOfAllPages}
                    changePage={changeLastViewedPage}
                />
            </section>
        </>
    );
};
