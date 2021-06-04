import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../../api/fetch";
import { setNotification } from "../../../redux/thunks/auth";
import ControlEdit from "../../UIKit/ControlEdit";
import { rusification } from "../../../constants/rusification";

import styles from "../listItem.module.sass";

export const Basic = ({ element }) => {
    const [name, setName] = useState(element?.name);
    const [isEdited, setIsEdited] = useState(false);
    const { selectedEntity } = useSelector((state) => state.entitiesList);
    const dispatch = useDispatch();
    const classesForItem = [styles.item];

    if (isEdited) {
        classesForItem.push(styles.changing);
    }

    const editName = (event) => setName(event.target.value);

    const onReset = () => {
        setName(element?.name);
        setIsEdited(false);
    };

    const onSubmit = async () => {
        if (name && name !== element.name) {
            await putData(selectedEntity.name, { name }, element?.id);
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
            </div>
            <ControlEdit
                type="edit"
                onCancelled={onReset}
                onChanged={onChanged}
                onConfirmed={onSubmit}
                isEdited={isEdited}
                itemId={element.id}
            />
        </div>
    );
};
