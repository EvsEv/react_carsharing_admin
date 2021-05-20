import React, { useEffect, useState } from "react";
import Checkbox from "../UIKit/Checkbox";
import ControlEdit from "../UIKit/ControlEdit";

import styles from "./orderCard.module.sass";

export const OrderCard = ({ order }) => {
    const [isFullTank, setIsFullTank] = useState();
    const [isNeedChildChair, setIsNeedChildChair] = useState();
    const [isRightWheel, setIsRightWheel] = useState();

    useEffect(() => {
        setIsFullTank(order?.isFullTank);
        setIsNeedChildChair(order?.isNeedChildChair);
        setIsRightWheel(order?.isRightWheel);
    }, [order]);

    const toggleIsFullTank = () => setIsFullTank(!isFullTank);
    const toggleIsNeedChildChair = () => setIsNeedChildChair(!isNeedChildChair);
    const toggleIsRightWheel = () => setIsRightWheel(!isRightWheel);

    return (
        <div>
            {/* <picture className={styles.picture}>
                <img
                    src={`https://api-factory.simbirsoft1.com${order?.carId?.thumbnail?.path}`}
                />
            </picture> */}
            <div className={styles.information}>
                <p className={styles.text}>
                    <span contentEditable={false}>{order?.carId?.name}</span> в
                    г.{" "}
                    <span contentEditable={false}>{order?.cityId?.name}</span>,{" "}
                    <span contentEditable={false}>
                        {order?.pointId?.address}
                    </span>
                </p>
                <p className={styles.text}>
                    {new Date(order?.dateFrom).toLocaleString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(order?.dateTo).toLocaleString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>

                <p className={styles.text}>
                    Цвет: <span>{order?.color}</span>
                </p>
            </div>
            <form>
                <Checkbox
                    name="isFullTank"
                    value={isFullTank}
                    checked={isFullTank}
                    onChange={toggleIsFullTank}
                    label="Полный бак"
                />
                <Checkbox
                    name="isNeedChildChair"
                    value={isNeedChildChair}
                    checked={isNeedChildChair}
                    onChange={toggleIsNeedChildChair}
                    label="Детское кресло"
                />
                <Checkbox
                    name="isRightWheel"
                    value={isRightWheel}
                    checked={isRightWheel}
                    onChange={toggleIsRightWheel}
                    label="Правый руль"
                />
            </form>
            <p className={styles.price}>{order?.price.toLocaleString()} ₽</p>
            <ControlEdit />
        </div>
    );
};
