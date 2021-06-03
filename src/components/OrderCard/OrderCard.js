import React, { useEffect, useState } from "react";
import Checkbox from "../UIKit/Checkbox";
import ControlEdit from "../UIKit/ControlEdit";
import { putData } from "../../api/fetch";

import styles from "./orderCard.module.sass";

import basicCarImage from "../../assets/images/basicCar.png";

export const OrderCard = ({
    order,
    confirmedStatus,
    cancelledStatus,
    changeStatus,
}) => {
    const [city, setCity] = useState();
    const [isFullTank, setIsFullTank] = useState();
    const [isNeedChildChair, setIsNeedChildChair] = useState();
    const [isRightWheel, setIsRightWheel] = useState();
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        if (order.carId?.thumbnail?.path) {
            const path = order.carId.thumbnail.path;
            if (path.indexOf("base64") != -1) {
                setImageSrc(path);
            } else if (path.indexOf("blob") != -1) {
                setImageSrc(basicCarImage);
            } else if (path.indexOf("http") != -1) {
                setImageSrc(path);
            } else {
                setImageSrc(
                    `https://api-factory.simbirsoft1.com/${order.carId?.thumbnail.path}`
                );
            }
        } else {
            setImageSrc(basicCarImage);
        }
    }, []);

    const cardClasses = [styles.card];

    if (order.orderStatusId?.id === confirmedStatus.id) {
        cardClasses.push(styles.confirmed);
    }

    if (order.orderStatusId?.id === cancelledStatus.id) {
        cardClasses.push(styles.cancelled);
    }

    useEffect(() => {
        setCity(order?.cityId.name);
        setIsFullTank(order?.isFullTank);
        setIsNeedChildChair(order?.isNeedChildChair);
        setIsRightWheel(order?.isRightWheel);
    }, [order]);

    const onConfirmed = async () => {
        await putData("order", { orderStatusId: confirmedStatus }, order?.id);
        changeStatus(true);
    };

    const onCancelled = async () => {
        await putData("order", { orderStatusId: cancelledStatus }, order?.id);
        changeStatus(true);
    };

    return (
        <div className={cardClasses.join(" ")}>
            <picture className={styles.picture}>
                <img src={imageSrc} />
            </picture>
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
            <form className={styles.addedInformation}>
                <Checkbox
                    name="isFullTank"
                    value={isFullTank}
                    checked={isFullTank}
                    label="Полный бак"
                    notEditable={true}
                />
                <Checkbox
                    name="isNeedChildChair"
                    value={isNeedChildChair}
                    checked={isNeedChildChair}
                    label="Детское кресло"
                    notEditable={true}
                />
                <Checkbox
                    name="isRightWheel"
                    value={isRightWheel}
                    checked={isRightWheel}
                    label="Правый руль"
                    notEditable={true}
                />
            </form>
            <p className={styles.price}>
                <span>Цена: </span>
                {order?.price
                    ? order.price.toLocaleString() + " ₽"
                    : "Не указана"}
            </p>
            <ControlEdit
                onConfirmed={onConfirmed}
                onCancelled={onCancelled}
                onChanged={() => {}}
                order={true}
            />
        </div>
    );
};
