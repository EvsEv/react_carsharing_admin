import React from "react";

import styles from "./orderCard.module.sass";

export const OrderCard = ({ order }) => {
    return (
        <div>
            {/* <picture className={styles.picture}>
                <img
                    src={`https://api-factory.simbirsoft1.com${order?.carId?.thumbnail?.path}`}
                />
            </picture> */}
            <div className={styles.information}>
                <p className={styles.text}>
                    <span>{order?.carId?.name}</span> в г.{" "}
                    <span>{order?.cityId?.name}</span>,{" "}
                    {order?.pointId?.address}
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
        </div>
    );
};
