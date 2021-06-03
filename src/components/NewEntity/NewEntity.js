import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithComplexParamters } from "../../api/fetch";
import { postData } from "../../api/postData";
import { rusification } from "../../constants/rusification";
import { openNewEntity } from "../../redux/thunks/auth";
import { getFilteredEntityList } from "../../redux/thunks/entitiesList";
import { getCityList } from "../../redux/thunks/listsOfEntities";
import Button from "../UIKit/Button";
import SearchDropdown from "../UIKit/SearchDropdown";

import styles from "./newEntity.module.sass";

export const NewEntity = () => {
    const { selectedEntity } = useSelector((state) => state.entitiesList);
    const dispatch = useDispatch();
    const { cityList } = useSelector((state) => state.listsOfEntities);
    const [city, setCity] = useState({});
    const [rateTypeIdList, setRateTypeIdList] = useState([]);
    const [rateTypeId, setRateTypeId] = useState({});

    useEffect(async () => {
        if (selectedEntity.name === "point") {
            dispatch(getCityList());
        }

        if (selectedEntity.name === "rate") {
            const rateIdFromServer = await fetchDataWithComplexParamters(
                "rateType",
                "page=0"
            );

            setRateTypeIdList(rateIdFromServer.data);
        }
    }, []);

    const printParameters = () => {
        const printedParameters = [];
        for (let parameter in selectedEntity.options.fields) {
            printedParameters.push({
                name: parameter,
                type: selectedEntity.options.fields[parameter].type,
            });
        }
        return printedParameters.map((parameter, index) => {
            if (parameter.name === "cityId") {
                return (
                    <SearchDropdown
                        variants={cityList.slice(1, cityList.length)}
                        selectedValue={city?.name}
                        changeValue={setCity}
                        type="auto"
                        key={index}
                    />
                );
            }

            if (parameter.name === "rateTypeId") {
                return (
                    <SearchDropdown
                        variants={rateTypeIdList}
                        selectedValue={rateTypeId?.name}
                        changeValue={setRateTypeId}
                        type="auto"
                        key={index}
                    />
                );
            }
            return (
                <input
                    required
                    type={parameter.type}
                    key={index}
                    min={1}
                    placeholder={parameter.name}
                    name={parameter.name}
                />
            );
        });
    };

    const onClosePopup = () => dispatch(openNewEntity(false));

    const onSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const formToServer = {};

        for (let parameter of form.entries()) {
            formToServer[parameter[0]] = parameter[1];
        }

        if (city) {
            formToServer.cityId = { name: city.name, id: city.id };
        }

        try {
            await postData(selectedEntity.name, formToServer);
        } catch (e) {
            console.log(e);
        }

        dispatch(openNewEntity(false));
        dispatch(getFilteredEntityList());
    };

    return (
        <section className={styles.popup}>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>
                        Добавить новый элемент в "
                        {rusification[selectedEntity.name]}"
                    </h2>
                    <div>{printParameters()}</div>
                    <div className={styles.control}>
                        <Button
                            type="submit"
                            text="Добавить"
                            disabled={!city || !rateTypeId}
                        />
                        <Button
                            type="reset"
                            text="Отмена"
                            action={onClosePopup}
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};
