import React from "react";
import Filters from "../../components/UIKit/Filters";
import TextInput from "../../components/UIKit/TextInput";
import SearchDropdown from "../../components/UIKit/SearchDropdown";

import styles from "./orderList.module.sass";

export const OrderList = () => {
    return (
        <div>
            <TextInput
                title='Модель автомобиля'
                placeholder='Введите название модели'
            />
            {/* <SearchDropdown
                label='Тип автомобиля'
                variants={variantsCategory}
                placeholder='Введите категорию'
            /> */}
            <Filters />
        </div>
    );
};
