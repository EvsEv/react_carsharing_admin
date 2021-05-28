import React from "react";

import styles from "./carInfo.module.sass";

export const CarInfo = ({ information }) => {
    return (
        <tr>
            <td>{information?.name}</td>
            <td>{information?.description || "Отсутсвует"}</td>
            <td>{information?.priceMin?.toLocaleString() || "Не указано"}</td>
            <td>{information?.priceMax?.toLocaleString() || "Не указано"}</td>
            <td>
                {information?.tank
                    ? information.tank.toLocaleString() + "%"
                    : information?.tank === 0
                    ? "0%"
                    : "Не указано"}
            </td>
            <td>
                <table>
                    <tbody>
                        {information?.colors.length ? (
                            information.colors.map((color, idx) => (
                                <tr key={idx}>
                                    <td>{color}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Не указаны</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </td>
            <td>
                {information?.number
                    ? information.number.toUpperCase()
                    : "Не указан"}
            </td>
        </tr>
    );
};
