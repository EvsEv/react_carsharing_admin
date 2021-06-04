import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithComplexParamters, putData } from "../../../api/fetch";
import { rusification } from "../../../constants/rusification";
import { setNotification } from "../../../redux/thunks/auth";
import ControlEdit from "../../UIKit/ControlEdit";
import { SearchDropdown } from "../../UIKit/SearchDropdown/SearchDropdown";

import styles from "../listItem.module.sass";

export const Rate = ({ rate }) => {
    const [price, setPrice] = useState(rate?.price);
    const [tariff, setTariff] = useState(rate?.rateTypeId);
    const [listOfRateTypes, setListOfRateTpes] = useState([]);
    const [isEdited, setIsEdited] = useState(false);
    const { selectedEntity } = useSelector((state) => state.entitiesList);
    const dispatch = useDispatch();

    const classesForItem = [styles.item];

    if (isEdited) {
        classesForItem.push(styles.changing);
    }

    const editPrice = (event) => setPrice(event.target.value);
    const editTariff = (event) => setTariff(event);

    const onSubmit = async () => {
        const changedData = {};

        if (price && price !== rate.price) {
            changedData.price = price;
        }

        if (tariff?.id && tariff?.name) {
            changedData.rateTypeId = tariff;
        }

        if (Object.keys(changedData).length) {
            await putData(selectedEntity.name, { ...changedData }, rate?.id);

            dispatch(
                setNotification({
                    type: "correct",
                    text: `Элемент cущности "${
                        rusification[selectedEntity.name]
                    }" успешно изменен`,
                })
            );
        }

        setIsEdited(false);
    };

    const onReset = () => {
        setTariff(rate?.rateTypeId);
        setPrice(rate?.price);
        setIsEdited(false);
    };

    const onChanged = async () => {
        setIsEdited(true);
        const rateIdFromServer = await fetchDataWithComplexParamters(
            "rateType",
            "page=0"
        );
        setListOfRateTpes(rateIdFromServer.data);
    };

    return (
        <div className={classesForItem.join(" ")}>
            <div className={styles.parameters}>
                <div className={[styles.parameter, styles.fixed].join(" ")}>
                    <span>Цена в ₽ ({rate?.rateTypeId?.unit}):</span>
                    <input
                        className={styles.changingField}
                        onChange={editPrice}
                        disabled={!isEdited}
                        value={price}
                        type="number"
                    />
                </div>
                <div className={[styles.parameter, styles.fixed].join(" ")}>
                    <span>Тип:</span>
                    <SearchDropdown
                        variants={listOfRateTypes}
                        selectedValue={tariff?.name}
                        changeValue={editTariff}
                        parameter={rate.id}
                        disabled={!isEdited}
                        type="auto"
                    />
                </div>
            </div>
            <ControlEdit
                type="edit"
                onCancelled={onReset}
                onChanged={onChanged}
                onConfirmed={onSubmit}
                isEdited={isEdited}
                itemId={rate.id}
            />
        </div>
    );
};
