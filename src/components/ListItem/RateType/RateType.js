import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../../api/fetch";
import { rusification } from "../../../constants/rusification";
import { setNotification } from "../../../redux/thunks/auth";
import ControlEdit from "../../UIKit/ControlEdit";

import styles from "../listItem.module.sass";

export const RateType = ({ rateType }) => {
    const [name, setName] = useState(rateType?.name);
    const [unit, setUnit] = useState(rateType?.unit);
    const [isEdited, setIsEdited] = useState(false);
    const { selectedEntity } = useSelector((state) => state.entitiesList);
    const dispatch = useDispatch();

    const classesForItem = [styles.item];

    if (isEdited) {
        classesForItem.push(styles.changing);
    }

    const editName = (event) => setName(event.target.value);
    const editUnit = (event) => setUnit(event.target.value);

    const onReset = () => {
        setName(rateType?.name);
        setUnit(rateType?.unit);
        setIsEdited(false);
    };

    const onChanged = () => {
        setIsEdited(true);
    };

    const onSubmit = async () => {
        const changedData = {};

        if (name && name !== rateType.name) {
            changedData.name = name;
        }

        if (unit && unit !== rateType.unit) {
            changedData.unit = unit;
        }

        if (Object.keys(changedData).length) {
            await putData(
                selectedEntity.name,
                { ...changedData },
                rateType?.id
            );

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

    return (
        <div className={classesForItem.join(" ")}>
            <div className={styles.parameters}>
                <div className={styles.parameter}>
                    <span>Название:</span>
                    <input
                        className={styles.changingField}
                        disabled={!isEdited}
                        value={name}
                        onChange={editName}
                    />
                </div>
                <div className={styles.parameter}>
                    <span>Время:</span>
                    <input
                        className={styles.changingField}
                        onChange={editUnit}
                        disabled={!isEdited}
                        value={unit}
                    />
                </div>
            </div>
            <ControlEdit
                type="edit"
                onCancelled={onReset}
                onChanged={onChanged}
                onConfirmed={onSubmit}
                isEdited={isEdited}
                itemId={rateType.id}
            />
        </div>
    );
};
