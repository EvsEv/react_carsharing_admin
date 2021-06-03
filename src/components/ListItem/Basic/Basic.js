import React, { useState } from "react";
import { useSelector } from "react-redux";
import { putData } from "../../../api/fetch";
import ControlEdit from "../../UIKit/ControlEdit";

import styles from "../listItem.module.sass";

export const Basic = ({ element }) => {
    const [name, setName] = useState(element?.name);
    const [isEdited, setIsEdited] = useState(false);
    const { selectedEntity } = useSelector((state) => state.entitiesList);
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
