import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../../api/fetch";
import { rusification } from "../../../constants/rusification";
import { setNotification } from "../../../redux/thunks/auth";
import ControlEdit from "../../UIKit/ControlEdit";

import styles from "../listItem.module.sass";

export const BasicWithDescription = ({ element }) => {
    const [name, setName] = useState(element?.name);
    const [description, setDescription] = useState(element?.description);
    const [isEdited, setIsEdited] = useState(false);
    const { selectedEntity } = useSelector((state) => state.entitiesList);
    const dispatch = useDispatch();
    const classesForItem = [styles.item];

    if (isEdited) {
        classesForItem.push(styles.changing);
    }

    const editName = (event) => setName(event.target.value);
    const editDescription = (event) => setDescription(event.target.value);

    const onReset = () => {
        setName(element?.name);
        setDescription(element?.description);
        setIsEdited(false);
    };

    const onSubmit = async () => {
        const changedData = {};

        if (name && name !== element.name) {
            changedData.name = name;
        }
        if (description && description !== element.description) {
            changedData.description = description;
        }

        if (Object.keys(changedData).length) {
            await putData(selectedEntity.name, { ...changedData }, element?.id);
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

    const onChanged = () => {
        setIsEdited(true);
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
                <div className={[styles.parameter, styles.large].join(" ")}>
                    <span>Описание:</span>
                    <textarea
                        row={3}
                        className={styles.changingField}
                        onChange={editDescription}
                        disabled={!isEdited}
                        value={description}
                    />
                </div>
            </div>
            <ControlEdit
                type="edit"
                onCancelled={onReset}
                onChanged={onChanged}
                onConfirmed={onSubmit}
                itemId={element.id}
                isEdited={isEdited}
            />
        </div>
    );
};
