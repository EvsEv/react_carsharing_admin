import React, { useEffect, useState } from "react";

import styles from "./carInfo.module.sass";

import basicCarImage from "../../assets/images/basicCar.png";

export const CarInfo = ({ information }) => {
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        if (information.thumbnail?.path) {
            const path = information.thumbnail.path;
            if (path.indexOf("base64") != -1) {
                setImageSrc(path);
            } else if (path.indexOf("blob") != -1) {
                setImageSrc(basicCarImage);
            } else if (path.indexOf("http") != -1) {
                setImageSrc(path);
            } else {
                setImageSrc(
                    `https://api-factory.simbirsoft1.com/${information.thumbnail.path}`
                );
            }
        } else {
            setImageSrc(basicCarImage);
        }
    }, []);
    return (
        <tr>
            <td>{information?.name}</td>
            <td>{information?.description || "Отсутсвует"}</td>
            <td>
                <picture className={styles.photo}>
                    <img src={imageSrc} />
                </picture>
            </td>
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
