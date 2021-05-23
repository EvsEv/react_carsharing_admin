import React, { useEffect, useMemo, useState } from "react";
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

    useEffect(() => {
        dispatch(getModelList());
        dispatch(getCityList());
        dispatch(getStatusList());
    }, []);

    const printList = useMemo(() => {
        console.log("List rerendered");
        return (
            <div className={styles.list}>
                {orderList?.length ? (
                    orderList.map((order) => (
                        <OrderCard key={order?.id} order={order} />
                    ))
                ) : (
                    <span className={styles.notification}>
                        Заказов, подходящих под выбранные фильтры, не найдено
                    </span>
                )}
            </div>
        );
    }, [orderList]);

    const printFilters = useMemo(() => {
        return (
            <Filters
                filters={[
                    {
                        variants: periodList,
                        selectedValue: selectedPeriod?.name,
                        changeValue: changeSelectedPeriod,
                        placeholder: "Период",
                    },
                    {
                        variants: modelList,
                        selectedValue: selectedModel?.name,
                        changeValue: changeSelectedModel,
                        placeholder: "Модель",
                    },
                    {
                        variants: cityList,
                        selectedValue: selectedCity?.name,
                        changeValue: changeSelectedCity,
                        placeholder: "Город",
                    },
                    {
                        variants: statusList,
                        selectedValue: selectedStatus?.name,
                        changeValue: changeSelectedStatus,
                        placeholder: "Статус",
                    },
                ]}
            />
        );
    }, [
        periodList,
        selectedPeriod,
        modelList,
        selectedModel,
        selectedModel,
        selectedCity,
        statusList,
        selectedStatus,
    ]);

    console.log("OrderList rerendered");

    return (
        <>
            <h1 className={styles.title}>Заказы</h1>
            <div className={styles.content}>
                {printFilters}
                {printList}
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
