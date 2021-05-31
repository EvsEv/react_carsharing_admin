import React, { useEffect, useMemo, useState } from "react";

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
    const [carModel, setCarModel] = useState(selectedCarModel);
    const [category, setCategory] = useState(selectedCategory);
    const [minPriceValue, setMinPriceValue] = useState(priceMin || "");
    const [maxPriceValue, setMaxPriceValue] = useState(priceMax || "");
    const [correct, setCorrect] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarsList());
        dispatch(getCategoryList());
        dispatch(getFilteredCarsTable());
    }, []);

    useEffect(() => {
        if (carModel && category) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    }, [carModel, category]);

    // useEffect(() => {
    //     const updatedSelectedCategory = categoryList.find((category) => {
    //         if (category.id === selectedCategory.id) {
    //             return category;
    //         }
    //     });

    //     dispatch(setSelectedCategory(updatedSelectedCategory));
    // }, [categoryList]);

    // useEffect(() => {
    //     const updatedSelectedCarModel = carsList.find((carModel) => {
    //         if (carModel.id === selectedCarModel.id) {
    //             return carModel;
    //         }
    //     });

    //     dispatch(setSelectedCategory(updatedSelectedCarModel));
    // }, [carsList]);

    useEffect(() => {
        setCarModel(selectedCarModel);
    }, [selectedCarModel]);

    useEffect(() => {
        setCategory(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        setMinPriceValue(priceMin || "");
    }, [priceMin]);

    useEffect(() => {
        setMaxPriceValue(priceMax || "");
    }, [priceMax]);

    const typeCarModel = (carModel) => setCarModel(carModel);

    const typeCategory = (category) => setCategory(category);

    const typePriceMin = (price) => setMinPriceValue(price);
    const typePriceMax = (price) => setMaxPriceValue(price);

    const submitFilters = () => {
        dispatch(setSelectedCarModel(carModel));
        dispatch(setSelectedCategory(category));
        dispatch(setMaxPrice(maxPriceValue));
        dispatch(setMinPrice(minPriceValue));
        dispatch(changeLastViewedPage(0));
    };

    const resetFilters = () => {
        dispatch(resetAndUpdateFilteredCarsTable());
        setCarModel(selectedCarModel);
        setCategory(selectedCategory);
        setMinPriceValue(priceMin || "");
        setMaxPriceValue(priceMax || "");
    };

    const printFilters = useMemo(() => {
        return (
            <Filters
                correctCondition={correct}
                submitFilters={submitFilters}
                resetAndUpdate={resetFilters}
                filters={[
                    {
                        variants: carsList,
                        selectedValue: carModel?.name,
                        changeValue: typeCarModel,
                        placeholder: "Модель",
                    },
                    {
                        variants: categoryList,
                        selectedValue: category?.name,
                        changeValue: typeCategory,
                        placeholder: "Категория",
                    },
                ]}
                rangeFilters={{
                    minValue: minPriceValue,
                    maxValue: maxPriceValue,
                    minName: "Минимальная цена",
                    maxName: "Максимальная цена",
                    changeMinValue: typePriceMin,
                    changeMaxValue: typePriceMax,
                }}
            />
        );
    }, [
        carsList,
        carModel,
        category,
        categoryList,
        minPriceValue,
        maxPriceValue,
        correct,
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
