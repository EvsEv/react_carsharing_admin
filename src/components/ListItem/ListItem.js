import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithComplexParamters, putData } from "../../api/fetch";
import { getCityList } from "../../redux/thunks/listsOfEntities";
import ControlEdit from "../UIKit/ControlEdit";
import { SearchDropdown } from "../UIKit/SearchDropdown/SearchDropdown";

import styles from "./listItem.module.sass";

export const ListItem = ({ item, isChanged }) => {
    const [name, setName] = useState(item?.name);
    const [city, setCity] = useState(item?.cityId);
    const [address, setAddress] = useState(item?.address);
    const [description, setDescription] = useState(item?.description);
    const [price, setPrice] = useState(item?.price);
    const [tariff, setTariff] = useState(item?.rateTypeId);
    const [unit, setUnit] = useState(item?.unit);
    const [isEdited, setIsEdited] = useState(false);

    const { selectedEntity } = useSelector((state) => state.entitiesList);

    const { cityList } = useSelector((state) => state.listsOfEntities);
    const [listOfCities, setListOfCities] = useState([]);
    const [listOfRateTypes, setListOfRateTpes] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const correctCityList = cityList.slice(1, cityList.length);
        const index = correctCityList.findIndex(
            (city) => city?.id === item?.cityId?.id
        );
        const correctListOfCities = [
            correctCityList[index],
            ...correctCityList.slice(0, index),
            ...correctCityList.slice(index + 1, -1),
        ];
        setListOfCities(correctListOfCities);
    }, [cityList, item]);

    const editName = (event) => setName(event.target.value);
    const editCity = (city) => setCity({ name: city?.name, id: city?.id });
    const editAddress = (event) => setAddress(event.target.value);
    const editDescription = (event) => setDescription(event.target.value);
    const editPrice = (event) => setPrice(event.target.value);
    const editTariff = (event) => setTariff(event);
    const editUnit = (event) => setUnit(event.target.value);

    const onReset = () => {
        isChanged(false);
        setName(item?.name);
        setCity(item?.cityId);
        setAddress(item?.address);
        setDescription(item?.description);
        setPrice(item?.price);
        setTariff(item?.rateTypeId);
        setUnit(item?.unit);
        setIsEdited(false);
    };

    const onSubmit = async () => {
        const changedData = {};

        if (name && name !== item.name) {
            changedData.name = name;
        }

        if (address && address !== item.address) {
            changedData.address = address;
        }

        if (description && description !== item.description) {
            changedData.description = description;
        }

        if (price && price !== item.price) {
            changedData.price = price;
        }

        if (unit && unit !== item.unit) {
            changedData.unit = unit;
        }

        if (city?.id && city?.name && city.id !== item.cityId.id) {
            changedData.cityId = city;
        }

        if (tariff?.id && tariff?.name) {
            changedData.rateTypeId = tariff;
        }

        await putData(selectedEntity.name, { ...changedData }, item?.id);

        isChanged(true);
        setIsEdited(false);
    };

    const onChanged = async () => {
        setIsEdited(true);

        if (item?.cityId) {
            dispatch(getCityList());
        }

        if (item?.rateTypeId) {
            const rateIdFromServer = await fetchDataWithComplexParamters(
                "rateType",
                "page=0"
            );
            setListOfRateTpes(rateIdFromServer.data);
        }
    };

    return (
        <div style={{ border: "1px solid black" }}>
            {item?.cityId?.name && (
                <div>
                    Город:{" "}
                    <SearchDropdown
                        variants={listOfCities}
                        selectedValue={city?.name}
                        changeValue={editCity}
                        parameter={item.id}
                        type="small"
                        disabled={!isEdited}
                    />
                </div>
            )}
            {item?.address && (
                <p>
                    Адрес:{" "}
                    <input
                        onChange={editAddress}
                        disabled={!isEdited}
                        value={address}
                    />
                </p>
            )}
            {item?.name && (
                <p>
                    Название{" "}
                    <input
                        disabled={!isEdited}
                        value={name}
                        onChange={editName}
                    />
                </p>
            )}
            {item?.description && (
                <p>
                    Описание:{" "}
                    <input
                        onChange={editDescription}
                        disabled={!isEdited}
                        value={description}
                    />
                </p>
            )}
            {item?.price && (
                <p>
                    Цена:{" "}
                    <input
                        onChange={editPrice}
                        disabled={!isEdited}
                        value={price}
                    />
                </p>
            )}
            {item?.rateTypeId && (
                <div>
                    Тип тарифа:{" "}
                    <SearchDropdown
                        variants={listOfRateTypes}
                        selectedValue={tariff?.name}
                        changeValue={editTariff}
                        parameter={item.id}
                        type="small"
                        disabled={!isEdited}
                    />
                </div>
            )}
            {item?.unit && (
                <p>
                    Единица времени:{" "}
                    <input
                        onChange={editUnit}
                        disabled={!isEdited}
                        value={unit}
                    />
                </p>
            )}
            <ControlEdit
                onCancelled={onReset}
                onChanged={onChanged}
                onConfirmed={onSubmit}
            />
        </div>
    );
};
