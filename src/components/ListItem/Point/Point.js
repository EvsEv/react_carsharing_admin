import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../../api/fetch";
import { getCityList } from "../../../redux/thunks/listsOfEntities";
import ControlEdit from "../../UIKit/ControlEdit";
import { SearchDropdown } from "../../UIKit/SearchDropdown/SearchDropdown";

import styles from "../listItem.module.sass";

export const Point = ({ point }) => {
    const [name, setName] = useState(point?.name);
    const [city, setCity] = useState(point?.cityId);
    const [address, setAddress] = useState(point?.address);
    const [isEdited, setIsEdited] = useState(false);
    const { cityList } = useSelector((state) => state.listsOfEntities);
    const { selectedEntity } = useSelector((state) => state.entitiesList);
    const [listOfCities, setListOfCities] = useState([]);
    const dispatch = useDispatch();

    const classesForItem = [styles.item];

    if (isEdited) {
        classesForItem.push(styles.changing);
    }

    useEffect(() => {
        const correctCityList = cityList.slice(1, cityList.length);
        const index = correctCityList.findIndex(
            (city) => city?.id === point?.cityId?.id
        );
        const correctListOfCities = [
            correctCityList[index],
            ...correctCityList.slice(0, index),
            ...correctCityList.slice(index + 1, correctCityList.length),
        ];
        setListOfCities(correctListOfCities);
    }, [cityList, point]);

    const editAddress = (event) => setAddress(event.target.value);
    const editCity = (city) => setCity({ name: city?.name, id: city?.id });
    const editName = (event) => setName(event.target.value);

    const onReset = () => {
        setName(point?.name);
        setCity(point?.cityId);
        setAddress(point?.address);
        setIsEdited(false);
    };

    const onChanged = async () => {
        setIsEdited(true);
        dispatch(getCityList());
    };

    const onSubmit = async () => {
        const changedData = {};

        if (name && name !== point.name) {
            changedData.name = name;
        }

        if (address && address !== point.address) {
            changedData.address = address;
        }

        if (city?.id && city?.name && city.id !== point.cityId.id) {
            changedData.cityId = city;
        }

        await putData(selectedEntity.name, { ...changedData }, point?.id);

        setIsEdited(false);
    };

    return (
        <div className={classesForItem.join(" ")}>
            <div className={styles.parameters}>
                <div className={[styles.parameter, styles.fixed].join(" ")}>
                    <span>Город: </span>
                    <SearchDropdown
                        variants={listOfCities}
                        selectedValue={city?.name}
                        changeValue={editCity}
                        parameter={point.id}
                        disabled={!isEdited}
                        type="auto"
                    />
                </div>
                <div className={styles.parameter}>
                    <span>Адрес:</span>
                    <input
                        className={styles.changingField}
                        onChange={editAddress}
                        disabled={!isEdited}
                        value={address}
                    />
                </div>
                <div className={styles.parameter}>
                    <span>Название:</span>
                    <input
                        className={styles.changingField}
                        disabled={!isEdited}
                        value={name}
                        onChange={editName}
                    />
                </div>
            </div>
            <ControlEdit
                type="edit"
                onCancelled={onReset}
                onChanged={onChanged}
                onConfirmed={onSubmit}
                isEdited={isEdited}
                itemId={point.id}
            />
        </div>
    );
};
