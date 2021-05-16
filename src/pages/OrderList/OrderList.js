import React, { useEffect, useState } from "react";
import Filters from "../../components/UIKit/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
    getCityList,
    getModelList,
    getStatusList,
    setSelectedCity,
    setSelectedModel,
    setSelectedPeriod,
    setSelectedStatus,
} from "../../redux/thunks/orderList";

import styles from "./orderList.module.sass";

export const OrderList = () => {
    // const [periodFilter, setPeriodFilter] = useState({});
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
        placeholder: "Выберите период",
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
            placeholder: "Выберите модель",
        });
    }, [modelList]);

    useEffect(() => {
        setCityFilter({
            variants: cityList,
            selectedValue: selectedCity?.name,
            changeValue: changeSelectedCity,
            // label: "Выбранный город",
            placeholder: "Выберите город",
        });
    }, [cityList]);

    useEffect(() => {
        setStatusFilter({
            variants: statusList,
            selectedValue: selectedStatus?.name,
            changeValue: changeSelectedStatus,
            // label: "Выбранный город",
            placeholder: "Выберите статус",
        });
    }, [statusList]);

    return (
        <>
            <Filters
                filters={[periodFilter, modelFilter, cityFilter, statusFilter]}
            />
        </>
    );
};
