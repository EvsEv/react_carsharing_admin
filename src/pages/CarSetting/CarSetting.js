import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../api/postData";
import ArrayInput from "../../components/UIKit/ArrayInput";
import SearchDropdown from "../../components/UIKit/SearchDropdown";
import TextInput from "../../components/UIKit/TextInput";
import Button from "../../components/UIKit/Button";
import { russificationCarEdit } from "../../constants/rusification";
import { getCategoryList } from "../../redux/thunks/listsOfEntities";
import { getCarEntity } from "../../redux/thunks/mainEntities";

import styles from "./carSetting.module.sass";

import basicCarImage from "../../assets/images/basicCar.png";
import {
    setBasicError,
    setErrorOfLoggedAuth,
    setNotification,
    setPopup,
} from "../../redux/thunks/auth";
import { useHistory, useParams } from "react-router";
import { fetchDataById } from "../../api/fetchDataById";
import { putData } from "../../api/fetch";
import { deleteData } from "../../api/deleteData";
import { getFilteredCarsTable } from "../../redux/thunks/carsTable";

export const CarSetting = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState({});
    const [imageSrc, setImageSrc] = useState("");
    const [description, setDescription] = useState("");
    const [carInfo, setCarInfo] = useState(null);
    const [percentValue, setPercentValue] = useState(0);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [colors, setColors] = useState([]);
    const [tank, setTank] = useState("");
    const [number, setNumber] = useState("");
    const { carEntity } = useSelector((state) => state.mainEntities);
    const { categoryList } = useSelector((state) => state.listsOfEntities);
    const [selectedCategory, setSelectedCategory] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    useEffect(async () => {
        if (id) {
            const car = await fetchDataById("car", id);
            setCarInfo(car);
            if (car.code) {
                return dispatch(setBasicError(car.code));
            }
        } else {
            setCarInfo(null);
        }
    }, [id]);

    useEffect(() => {
        if (carInfo?.thumbnail?.path && !image) {
            const path = carInfo.thumbnail.path;
            if (path.indexOf("base64") !== -1) {
                setImageSrc(path);
            } else if (path.indexOf("blob") !== -1) {
                setImageSrc(basicCarImage);
            } else if (path.indexOf("http") !== -1) {
                setImageSrc(path);
            } else {
                setImageSrc(
                    `https://api-factory.simbirsoft1.com/${carInfo.thumbnail.path}`
                );
            }
        } else if (carInfo && !image) {
            setImageSrc(basicCarImage);
        } else if (image) {
            setImageSrc(image.path || basicCarImage);
        }
    }, [carInfo, image]);

    useEffect(() => {
        if (carInfo) {
            setName(carInfo.name);
            setDescription(carInfo.description);
            setPercentValue(
                Math.ceil((carInfo.description?.length / 167) * 100)
            );
            setImage(carInfo.thumbnail);
            setSelectedCategory(carInfo.categoryId);
            setColors(carInfo.colors);
            setMinPrice(carInfo.priceMin);
            setMaxPrice(carInfo.priceMax);
            setTank(carInfo.tank);
            setNumber(carInfo.number);
        } else {
            setName("");
            setDescription("");
            setPercentValue(0);
            setImage({});
            setSelectedCategory("");
            setColors([]);
            setMinPrice("");
            setMaxPrice("");
            setTank("");
            setNumber("");
        }
    }, [carInfo]);

    useEffect(() => {
        dispatch(setBasicError(null));

        dispatch(getCarEntity());
        dispatch(getCategoryList());
    }, []);

    const onUploadFile = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        if (file) {
            reader.onloadend = () => {
                setImage({
                    size: file.size,
                    originalname: file.name,
                    path: reader.result,
                    mimetype: file.type,
                });
            };
            reader.readAsDataURL(file);
        } else {
            setImage({});
        }
    };

    const changeName = (event) => setName(event.target.value);

    const changeDescription = (event) => {
        setPercentValue(Math.ceil((event.target.value.length / 167) * 100));
        setDescription(event.target.value);
    };
    const changeMinPrice = (event) => setMinPrice(event.target.value);

    const changeMaxPrice = (event) => setMaxPrice(event.target.value);

    const changeTank = (event) => setTank(event.target.value);
    const changeNumber = (event) => setNumber(event.target.value);

    const printFields = useMemo(() => {
        const printedFields = [];
        for (let field in carEntity?.options.fields) {
            printedFields.push({
                name: field,
                type: carEntity.options.fields[field].type,
            });
        }

        return printedFields.map((field, index) => {
            return (
                field.name !== "thumbnail" &&
                field.name !== "description" && (
                    <div
                        className={[styles.parameter, styles[field.name]].join(
                            " "
                        )}
                        key={index}
                    >
                        {field.name === "categoryId" ? (
                            <SearchDropdown
                                variants={categoryList.slice(
                                    1,
                                    categoryList.length
                                )}
                                changeValue={setSelectedCategory}
                                selectedValue={selectedCategory?.name}
                                type="likeInput"
                                label="Тип автомобиля"
                                parameter={field.name}
                                required={true}
                                placeholder="Выберите категорию"
                            />
                        ) : field.name === "colors" ? (
                            <ArrayInput
                                array={colors}
                                setArray={setColors}
                                title="Доступные цвета"
                            />
                        ) : field.name === "name" ? (
                            <TextInput
                                title={russificationCarEdit[field.name]}
                                type={field.type}
                                placeholder="Заполните поле"
                                name={field.name}
                                required={true}
                                onChange={changeName}
                                value={name}
                            />
                        ) : (
                            <TextInput
                                title={russificationCarEdit[field.name]}
                                type={field.type}
                                placeholder="Заполните поле"
                                name={field.name}
                                required={true}
                                min={field.name === "priceMax" ? minPrice : 0}
                                max={
                                    field.name === "priceMin"
                                        ? maxPrice
                                        : field.name === "tank"
                                        ? 100
                                        : ""
                                }
                                value={
                                    field.name === "priceMin"
                                        ? minPrice
                                        : field.name === "priceMax"
                                        ? maxPrice
                                        : field.name === "tank"
                                        ? tank
                                        : field.name === "number"
                                        ? number
                                        : ""
                                }
                                onChange={
                                    field.name === "priceMax"
                                        ? changeMaxPrice
                                        : field.name === "priceMin"
                                        ? changeMinPrice
                                        : field.name === "tank"
                                        ? changeTank
                                        : field.name === "number"
                                        ? changeNumber
                                        : ""
                                }
                            />
                        )}
                    </div>
                )
            );
        });
    }, [
        carEntity,
        categoryList,
        maxPrice,
        minPrice,
        colors,
        name,
        tank,
        number,
    ]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const formToServer = {};
        if (carInfo) {
            if (image.path !== carInfo?.thumbnail?.path) {
                formToServer.thumbnail = image;
            }

            if (selectedCategory.id !== carInfo?.categoryId?.id) {
                formToServer.categoryId = selectedCategory;
            }

            if (minPrice !== carInfo.priceMin) {
                formToServer.priceMin = minPrice;
            }

            if (maxPrice !== carInfo.priceMax) {
                formToServer.priceMax = maxPrice;
            }

            if (tank !== carInfo.tank) {
                formToServer.tank = tank;
            }

            if (description !== carInfo.description) {
                formToServer.description = description;
            }

            if (name !== carInfo.name) {
                formToServer.name = name;
            }

            if (number !== carInfo.number) {
                formToServer.number = number;
            }

            formToServer.colors = colors;

            Object.keys(formToServer).length &&
                (await putData("car", formToServer, carInfo.id));
            dispatch(
                setNotification({
                    type: "correct",
                    text: `Автомобиль ${carInfo.id} успешно изменен`,
                })
            );
            history.push("/admin/carsTable");
        } else {
            formToServer.name = name;
            formToServer.description = description;
            formToServer.thumbnail = image;
            formToServer.priceMin = minPrice;
            formToServer.priceMax = maxPrice;
            formToServer.tank = tank;
            formToServer.colors = colors;
            formToServer.number = number;
            formToServer.categoryId = selectedCategory;
            await postData("car", formToServer);
            history.push("/admin/carsTable");
        }
    };

    const onReset = (event) => {
        event.preventDefault();
        dispatch(
            setPopup({
                type: "cancell",
                title: "Несохраненные изменения будут утеряны, продолжить?",
                action: () => history.push("/admin/carsTable"),
            })
        );
    };

    const onDelete = () => {
        dispatch(
            setPopup({
                type: "delete",
                entity: "car",
                idOfItem: carInfo.id,
                title: "Вы действительно хотите удалить данный автомобиль?",
                action: () => history.push("/admin/carsTable"),
            })
        );
    };

    return (
        <>
            <h1 className={styles.title}>Карточка автомобиля</h1>
            <form className={styles.content} onSubmit={onSubmit}>
                <div className={styles.asideInfo}>
                    <div className={styles.asideTop}>
                        <picture className={styles.preview}>
                            <img src={imageSrc} />
                        </picture>
                        <p className={styles.model}>{name || "Не указано"}</p>
                        <p className={styles.category}>
                            {selectedCategory?.name || "Не указано"}
                        </p>
                        <div className={styles.file}>
                            <label htmlFor="file">
                                {image.originalname || "Выберите файл..."}
                            </label>
                            <input
                                id="file"
                                onChange={onUploadFile}
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <div className={styles.percentage}>
                        <div className={styles.percentageInfo}>
                            <span>Заполнено описания</span>
                            <span>{percentValue}%</span>
                        </div>
                        <div className={styles.scale}>
                            <span
                                style={{ width: `${percentValue}%` }}
                                className={styles.filled}
                            ></span>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <label htmlFor="description">Описание</label>
                        <textarea
                            name="description"
                            maxLength={167}
                            id="description"
                            required
                            placeholder="Заполните описание (макс. 100%)"
                            value={description}
                            onChange={changeDescription}
                        />
                    </div>
                </div>
                <div className={styles.editInfo}>
                    <h2 className={styles.subtitle}>Настройка автомобиля</h2>
                    <div className={styles.wrapper}>{printFields}</div>
                    <div className={styles.control}>
                        <Button
                            type="submit"
                            disabled={
                                !colors.length || !selectedCategory || !image
                            }
                            text="Сохранить"
                        />
                        <Button
                            action={onReset}
                            type="cancell"
                            text="Отменить"
                        />
                        {id && (
                            <Button
                                type="reset"
                                text="Удалить"
                                action={onDelete}
                            />
                        )}
                    </div>
                </div>
            </form>
        </>
    );
};
