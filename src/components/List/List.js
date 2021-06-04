import React from "react";
import Basic from "../ListItem/Basic";
import BasicWithDescription from "../ListItem/BasicWithDescription";
import Point from "../ListItem/Point";
import Button from "../UIKit/Button";
import Rate from "../ListItem/Rate";
import RateType from "../ListItem/RateType";

import styles from "./list.module.sass";
import { useDispatch } from "react-redux";
import { openNewEntity } from "../../redux/thunks/auth";

export const List = ({ current, elements, isChanged, isDeleted }) => {
    const dispatch = useDispatch();
    const printList = () => {
        switch (current?.name) {
            case "point":
                return elements.map((element) => (
                    <Point point={element} key={element?.id} />
                ));
            case "rate":
                return elements.map((element) => (
                    <Rate key={element?.id} rate={element} />
                ));
            case "rateType":
                return elements.map((element) => (
                    <RateType key={element?.id} rateType={element} />
                ));
            case "city":
                return elements.map((element) => (
                    <Basic element={element} key={element.id} />
                ));
            case "orderStatus":
                return elements.map((element) => (
                    <Basic element={element} key={element.id} />
                ));
            case "category":
                return elements.map((element) => (
                    <BasicWithDescription key={element.id} element={element} />
                ));
            default:
                break;
        }
    };

    const onAddNewEntity = () => dispatch(openNewEntity(true));

    return (
        <>
            <Button
                text="Добавить"
                type="submit"
                mod="fullWidth"
                action={onAddNewEntity}
            />
            <div className={styles.wrapper}>{printList()}</div>
        </>
    );
};
