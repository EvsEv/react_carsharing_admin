import React, { useEffect, useState } from "react";
import SearchDropdown from "../SearchDropdown";

import styles from "./filters.module.sass";

// const variantsModel = [
//     { name: "Первый вариант" },
//     { name: "Второй вариант" },
//     { name: "Третий вариант" },
//     { name: "Четвертый вариант" },
//     { name: "6 вариант" },
//     { name: "7 вариант" },
//     { name: "8 вариант" },
//     { name: "9 вариант" },
//     { name: "Test" },
//     { name: "Testing" },
//     { name: "Varios test suggestion" },
//     { name: "77 вариант тестовый" },
// ];

// const variantsCity = [
//     { name: "Ульяновск" },
//     { name: "Димитровград" },
//     { name: "Саранск" },
//     { name: "Владивосток" },
//     { name: "Санкт-Петербург" },
//     { name: "Казань" },
//     { name: "8 вариант" },
//     { name: "9 вариант" },
//     { name: "Test" },
//     { name: "Testing" },
//     { name: "Varios test suggestion" },
//     { name: "77 вариант тестовый" },
// ];

// export const Filters = () => {
//     const [carList, setCarList] = useState([{ name: "Неважно" }]);
//     const [cityList, setCityList] = useState([{ name: "Неважно" }]);
//     const [selectedModel, setSelectedModel] = useState(carList[0].name);
//     const [selectedCity, setSelectedCity] = useState(cityList[0].name);

//     useEffect(() => {
//         setCarList(carList.concat(variantsModel));
//         setCityList(cityList.concat(variantsCity));
//     }, []);

//     const onSubmit = (event) => {
//         event.preventDefault();
//         console.log(event);
//     };

//     const onReset = (event) => {
//         event.preventDefault();
//         setSelectedModel(carList[0].name);
//         setSelectedCity(cityList[0].name);
//     };

//     return (
//         <form className={styles.form} onSubmit={onSubmit}>
//             <div className={styles.parameters}>
//                 <SearchDropdown
//                     type='small'
//                     variants={carList}
//                     placeholder='Модель'
//                     selectedValue={selectedModel}
//                     changeValue={setSelectedModel}
//                     parameter='model'
//                 />
//                 <SearchDropdown
//                     type='small'
//                     variants={cityList}
//                     placeholder='Город'
//                     selectedValue={selectedCity}
//                     changeValue={setSelectedCity}
//                     parameter='city'
//                 />
//             </div>
//             <button type='reset' onClick={onReset}>
//                 reset
//             </button>
//             <button type='submit'>twrwt</button>
//         </form>
//     );
// };

export const Filters = ({ filters }) => {
    return (
        <form className={styles.form}>
            <div className={styles.parameters}>
                {filters.map((filter, index) => (
                    <SearchDropdown
                        key={index}
                        label={filter?.label}
                        variants={filter.variants}
                        placeholder={filter.placeholder}
                        selectedValue={filter?.selectedValue}
                        changeValue={filter.changeValue}
                        type="small"
                    />
                ))}
            </div>
            <div className={styles.control}>
                <button type="reset">reset</button>
                <button type="submit">twrwt</button>
            </div>
        </form>
    );
};
