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
    resetAndUpdateFilteredCarsTable,
    setMaxPrice,
    setMinPrice,
    setSelectedCarModel,
    setSelectedCategory,
} from "../../redux/thunks/carsTable";
import Paginate from "../../components/UIKit/Paginate";
import CarInfo from "../../components/CarInfo";

const head = [
    "Модель",
    "Описание",
    "Мин. цена",
    "Макс. цена",
    "Топливо",
    "Цвета",
    "Номер",
];

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
        priceMin,
        priceMax,
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

    const changePriceMin = (price) => dispatch(setMinPrice(price));
    const changePriceMax = (price) => dispatch(setMaxPrice(price));

    const submitFilters = () => changeLastViewedPage(0);

    const printFilters = useMemo(() => {
        return (
            <Filters
                submitFilters={submitFilters}
                resetAndUpdate={resetAndUpdateFilteredCarsTable}
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
                rangeFilters={{
                    minValue: priceMin,
                    maxValue: priceMax,
                    minName: "минимальная цена",
                    maxName: "максимальная цена",
                    changeMinValue: changePriceMin,
                    changeMaxValue: changePriceMax,
                }}
            />
        );
    }, [
        carsList,
        selectedCarModel,
        selectedCategory,
        categoryList,
        priceMin,
        priceMax,
    ]);

    const bodyTable = useMemo(() => {
        return (
            <>
                {filteredCarsList?.map((car) => (
                    <CarInfo information={car} key={car.id} />
                ))}
            </>
        );
    }, [filteredCarsList]);

    return (
        <>
            <h1 className={styles.title}>Автомобили</h1>
            <div className={styles.content}>
                {printFilters}
                <Table head={head} body={bodyTable} />
                <Paginate
                    activePage={lastViewedPage}
                    countOfPages={countOfPages}
                    changePage={changeLastViewedPage}
                />
            </div>
        </>
    );
};
