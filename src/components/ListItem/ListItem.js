import React, { useState } from "react";
import { useSelector } from "react-redux";
import { putData } from "../../api/fetch";
import ControlEdit from "../UIKit/ControlEdit";

import styles from "./listItem.module.sass";

export const ListItem = ({ item }) => {
    const [name, setName] = useState(item?.name);
    const [city, setCity] = useState(item?.cityId?.name);
    const [address, setAddress] = useState(item?.address);
    const [description, setDescription] = useState(item?.description);
    const [price, setPrice] = useState(item?.price);
    const [tariff, setTariff] = useState(item?.rateTypeId?.name);
    const [rateDescriptionUnit, setRateDescriptionUnit] = useState(
        item?.rateTypeId?.unit
    );
    const [unit, setUnit] = useState(item?.unit);
    const [isEdited, setIsEdited] = useState(false);

    const { selectedEntity } = useSelector((state) => state.entitiesList);

    const editName = (event) => setName(event.target.value);
    const editCity = (event) => setCity(event.target.value);
    const editAddress = (event) => setAddress(event.target.value);
    const editDescription = (event) => setDescription(event.target.value);
    const editPrice = (event) => setPrice(event.target.value);
    const editTariff = (event) => setTariff(event.target.value);
    const editRateDescriptionUnit = (event) =>
        setRateDescriptionUnit(event.target.value);
    const editUnit = (event) => setUnit(event.target.value);

    const onReset = () => {
        setIsEdited(false);
        setName(item?.name);
        setCity(item?.cityId?.name);
        setAddress(item?.address);
        setDescription(item?.description);
        setPrice(item?.price);
        setTariff(item?.price);
        setRateDescriptionUnit(item?.rateTypeId?.unit);
        setUnit(item?.unit);
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

        const answer = await putData(
            selectedEntity.name,
            { ...changedData },
            item?.id
        );

        console.log(answer);
    };

    return (
        <div style={{ border: "1px solid black" }}>
            {item?.cityId?.name && (
                <p>
                    Город:{" "}
                    <input
                        onChange={editCity}
                        disabled={!isEdited}
                        value={city}
                    />
                </p>
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
            {item?.rateTypeId?.name && (
                <p>
                    Тариф:{" "}
                    <input
                        onChange={editTariff}
                        disabled={!isEdited}
                        value={tariff}
                    />
                </p>
            )}
            {item?.rateTypeId?.unit && (
                <p>
                    Единица времени:{" "}
                    <input
                        disabled={!isEdited}
                        onChange={editRateDescriptionUnit}
                        value={rateDescriptionUnit}
                    />
                </p>
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
                onChanged={() => setIsEdited(true)}
                onConfirmed={onSubmit}
            />
        </div>
    );
};
