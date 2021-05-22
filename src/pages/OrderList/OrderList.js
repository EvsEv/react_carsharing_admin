import React, { useEffect, useState } from "react";
import Filters from "../../components/UIKit/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
    changeLastViewedPage,
    getCityList,
    getModelList,
    getStatusList,
    setSelectedCity,
    setSelectedModel,
    setSelectedPeriod,
    setSelectedStatus,
} from "../../redux/thunks/orderList";

import styles from "./orderList.module.sass";
import PaginatedList from "../../components/UIKit/PaginatedList";
import OrderCard from "../../components/OrderCard";
import Paginate from "../../components/UIKit/Paginate";

export const OrderList = () => {
    const [modelFilter, setModelFilter] = useState({});
    const [cityFilter, setCityFilter] = useState({});
    const [statusFilter, setStatusFilter] = useState({});
    const dispatch = useDispatch();
    const {
        periodList,
        modelList,
        cityList,
        statusList,
        selectedPeriod,
        selectedModel,
        selectedCity,
        selectedStatus,
        orderList,
        lastViewedPage,
        countOfPages,
    } = useSelector((state) => state.orderList);

    const changeSelectedPeriod = (selectedPeriod) =>
        dispatch(setSelectedPeriod(selectedPeriod));

    const changeSelectedModel = (selectedModel) =>
        dispatch(setSelectedModel(selectedModel));

    const changeSelectedCity = (selectedCity) =>
        dispatch(setSelectedCity(selectedCity));

    const changeSelectedStatus = (selectedStatus) =>
        dispatch(setSelectedStatus(selectedStatus));

    const periodFilter = {
        variants: periodList,
        selectedValue: selectedPeriod?.name,
        changeValue: changeSelectedPeriod,
        placeholder: "Период",
    };

    useEffect(() => {
        dispatch(getModelList());
        dispatch(getCityList());
        dispatch(getStatusList());
    }, []);

    useEffect(() => {
        setModelFilter({
            variants: modelList,
            selectedValue: selectedModel?.name,
            changeValue: changeSelectedModel,
            // label: "Тип автомобиля",
            placeholder: "Модель",
        });
    }, [modelList]);

    useEffect(() => {
        setCityFilter({
            variants: cityList,
            selectedValue: selectedCity?.name,
            changeValue: changeSelectedCity,
            // label: "Выбранный город",
            placeholder: "Город",
        });
    }, [cityList]);

    useEffect(() => {
        setStatusFilter({
            variants: statusList,
            selectedValue: selectedStatus?.name,
            changeValue: changeSelectedStatus,
            // label: "Выбранный город",
            placeholder: "Статус",
        });
    }, [statusList]);

    return (
        <>
            <h1 className={styles.title}>Заказы</h1>
            <div className={styles.content}>
                <Filters
                    filters={[
                        periodFilter,
                        modelFilter,
                        cityFilter,
                        statusFilter,
                    ]}
                />
                <div className={styles.list}>
                    {orderList?.map((order) => (
                        <OrderCard key={order?.id} order={order} />
                    ))}
                </div>
                <Paginate
                    activePage={lastViewedPage}
                    countOfPages={countOfPages}
                    changePage={changeLastViewedPage}
                />
                {/* <PaginatedList elements={orderList} /> */}
            </div>
        </>
    );
};
