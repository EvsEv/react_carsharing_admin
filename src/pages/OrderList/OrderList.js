import React, { useEffect, useMemo, useState } from "react";
import Filters from "../../components/UIKit/Filters";
import { useDispatch, useSelector } from "react-redux";

import styles from "./orderList.module.sass";
import OrderCard from "../../components/OrderCard";
import Paginate from "../../components/UIKit/Paginate";
import {
    getCarsList,
    getCityList,
    getOrderStatusList,
} from "../../redux/thunks/listsOfEntities";
import {
    getFilteredOrderList,
    setSelectedCar,
    setSelectedCity,
    setSelectedPeriod,
    setSelectedOrderStatus,
    changeLastViewedPage,
    resetAndUpdateFilteredOrderList,
} from "../../redux/thunks/orderList";

export const OrderList = () => {
    const [confirmedStatus, setConfirmedStatus] = useState({});
    const [isChangedStatusOrder, setisChangedStatusOrder] = useState(false);
    const [cancelledStatus, setCancelledStatus] = useState({});
    const {
        selectedPeriod,
        selectedCar,
        selectedCity,
        selectedOrderStatus,
        lastViewedPage,
        countOfPages,
        filteredOrderList,
    } = useSelector((state) => state.orderList);
    const { periodList, carsList, cityList, orderStatusList } = useSelector(
        (state) => state.listsOfEntities
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarsList());
        dispatch(getCityList());
        dispatch(getOrderStatusList());
        dispatch(getFilteredOrderList());
    }, []);

    useEffect(() => {
        orderStatusList.forEach((status) => {
            if (status.name === "confirmed") {
                return setConfirmedStatus(status);
            }
            if (status.name === "cancelled") {
                setCancelledStatus(status);
            }
        });
    }, [orderStatusList]);

    useEffect(() => {
        isChangedStatusOrder && dispatch(getFilteredOrderList());
        setisChangedStatusOrder(false);
    }, [isChangedStatusOrder]);

    const changeSelectedPeriod = (selectedPeriod) =>
        dispatch(setSelectedPeriod(selectedPeriod));

    const changeSelectedCar = (selectedCar) =>
        dispatch(setSelectedCar(selectedCar));

    const changeSelectedCity = (selectedCity) =>
        dispatch(setSelectedCity(selectedCity));

    const changeSelectedStatus = (selectedStatus) =>
        dispatch(setSelectedOrderStatus(selectedStatus));

    const submitFilters = () => changeLastViewedPage(0);

    const printFilters = useMemo(() => {
        return (
            <Filters
                submitFilters={submitFilters}
                resetAndUpdate={resetAndUpdateFilteredOrderList}
                filters={[
                    {
                        variants: periodList,
                        selectedValue: selectedPeriod?.name,
                        changeValue: changeSelectedPeriod,
                        placeholder: "Период",
                    },
                    {
                        variants: carsList,
                        selectedValue: selectedCar?.name,
                        changeValue: changeSelectedCar,
                        placeholder: "Модель",
                    },
                    {
                        variants: cityList,
                        selectedValue: selectedCity?.name,
                        changeValue: changeSelectedCity,
                        placeholder: "Город",
                    },
                    {
                        variants: orderStatusList,
                        selectedValue: selectedOrderStatus?.name,
                        changeValue: changeSelectedStatus,
                        placeholder: "Статус",
                    },
                ]}
            />
        );
    }, [
        periodList,
        selectedPeriod,
        carsList,
        selectedCar,
        selectedCity,
        orderStatusList,
        selectedOrderStatus,
    ]);

    const printList = useMemo(() => {
        return (
            <div className={styles.list}>
                {filteredOrderList?.length ? (
                    filteredOrderList.map((order) => (
                        <OrderCard
                            key={order?.id}
                            order={order}
                            confirmedStatus={confirmedStatus}
                            cancelledStatus={cancelledStatus}
                            changeStatus={setisChangedStatusOrder}
                        />
                    ))
                ) : (
                    <span className={styles.notification}>
                        Заказов на текущей странице не найдено
                    </span>
                )}
            </div>
        );
    }, [filteredOrderList]);

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
            </div>
        </>
    );
};
