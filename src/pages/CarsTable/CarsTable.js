import React, { useEffect, useMemo } from "react";

import Table from "../../components/UIKit/Table";
import Filters from "../../components/UIKit/Filters";

import styles from "./carsTable.module.sass";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategoryList,
    getCarsList,
} from "../../redux/thunks/listsOfEntities";
import {
    changeLastViewedPage,
    getFilteredCarsTable,
    setSelectedCarModel,
    setSelectedCategory,
} from "../../redux/thunks/carsTable";
import Paginate from "../../components/UIKit/Paginate";

export const CarsTable = () => {
    const { carsList, categoryList } = useSelector(
        (state) => state.listsOfEntities
    );
    const {
        selectedCarModel,
        selectedCategory,
        lastViewedPage,
        countOfPages,
        filteredCarsList,
    } = useSelector((state) => state.carsTable);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarsList());
        dispatch(getCategoryList());
        dispatch(getFilteredCarsTable());
    }, []);
    const changeSelectedCarModel = (selectedCarModel) =>
        dispatch(setSelectedCarModel(selectedCarModel));

    const changeSelectedCategory = (selectedCategory) =>
        dispatch(setSelectedCategory(selectedCategory));

    const submitFilters = () => changeLastViewedPage(0);

    const printFilters = useMemo(() => {
        return (
            <Filters
                submitFilters={submitFilters}
                filters={[
                    {
                        variants: carsList,
                        selectedValue: selectedCarModel?.name,
                        changeValue: changeSelectedCarModel,
                        placeholder: "Модель",
                    },
                    {
                        variants: categoryList,
                        selectedValue: selectedCategory?.name,
                        changeValue: changeSelectedCategory,
                        placeholder: "Категория",
                    },
                ]}
            />
        );
    }, [carsList, categoryList]);

    return (
        <div>
            {printFilters}
            <Table rows={filteredCarsList} />
            <Paginate
                activePage={lastViewedPage}
                countOfPages={countOfPages}
                changePage={changeLastViewedPage}
            />
        </div>
    );
};
