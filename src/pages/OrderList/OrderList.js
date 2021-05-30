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
    const [car, setCar] = useState(selectedCar);
    const [period, setPeriod] = useState(selectedPeriod);
    const [city, setCity] = useState(selectedCity);
    const [status, setStatus] = useState(selectedOrderStatus);
    const [correct, setCorrect] = useState(true);
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
        if (city && period && status && car) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    }, [city, period, status, car]);

    useEffect(() => {
        isChangedStatusOrder && dispatch(getFilteredOrderList());
        setisChangedStatusOrder(false);
    }, [isChangedStatusOrder]);

    useEffect(() => {
        setCity(selectedCity);
    }, [selectedCity]);

    useEffect(() => {
        setCar(selectedCar);
    }, [selectedCar]);

    useEffect(() => {
        setPeriod(selectedPeriod);
    }, [selectedPeriod]);

    useEffect(() => {
        setStatus(selectedOrderStatus);
    }, [selectedOrderStatus]);

    const typePeriod = (period) => setPeriod(period);

    const typeCar = (car) => setCar(car);

    const typeCity = (city) => setCity(city);

    const typeStatus = (status) => setStatus(status);

    const submitFilters = () => {
        dispatch(setSelectedCar(car));
        dispatch(setSelectedCity(city));
        dispatch(setSelectedPeriod(period));
        dispatch(setSelectedOrderStatus(status));
        dispatch(changeLastViewedPage(0));
    };

    const ResetFilters = () => {
        dispatch(resetAndUpdateFilteredOrderList());
        setCity(selectedCity);
        setCar(selectedCar);
        setPeriod(selectedPeriod);
        setStatus(selectedOrderStatus);
    };

    const printFilters = useMemo(() => {
        return (
            <Filters
                correctCondition={correct}
                submitFilters={submitFilters}
                resetAndUpdate={ResetFilters}
                filters={[
                    {
                        variants: periodList,
                        selectedValue: period?.name,
                        changeValue: typePeriod,
                        placeholder: "Период",
                    },
                    {
                        variants: carsList,
                        selectedValue: car?.name,
                        changeValue: typeCar,
                        placeholder: "Модель",
                    },
                    {
                        variants: cityList,
                        selectedValue: city?.name,
                        changeValue: typeCity,
                        placeholder: "Город",
                    },
                    {
                        variants: orderStatusList,
                        selectedValue: status?.name,
                        changeValue: typeStatus,
                        placeholder: "Статус",
                    },
                ]}
            />
        );
    }, [
        periodList,
        period,
        carsList,
        car,
        city,
        orderStatusList,
        status,
        correct,
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
