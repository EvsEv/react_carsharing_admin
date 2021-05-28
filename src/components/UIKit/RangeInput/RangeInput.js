import React, { useState } from "react";
import { getTrackBackground, Range } from "react-range";

import styles from "./rangeInput.module.sass";

export const RangeInput = ({ inputes }) => {
    const [values, setValues] = useState([inputes.minValue, inputes.maxValue]);
    const min = 0;
    const max = 100000;

    const setMinValue = (event) => {
        setValues((prev) => [event.target.value, prev[1]]);
        inputes.changeMinValue(event.target.value);
    };
    const setMaxValue = (event) => {
        setValues((prev) => [prev[0], event.target.value]);
        inputes.changeMaxValue(event.target.value);
    };
    const changeValuesFromRange = (values) => {
        if (inputes.maxValue || inputes.maxValue < inputes.minValue) {
            setValues((prev) => [values[0], prev[1]]);
            inputes.changeMinValue(values[0]);
        } else {
            setValues([values[0], max]);
        }

        if (inputes.minValue) {
            setValues((prev) => [prev[0], values[1]]);
            inputes.changeMaxValue(values[1]);
        } else {
            setValues((prev) => [min, values[1]]);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <input
                    value={inputes.minValue || ""}
                    type="number"
                    min={min}
                    max={inputes.maxValue}
                    onChange={setMinValue}
                    className={styles.input}
                />

                <input
                    value={inputes.maxValue || ""}
                    type="number"
                    min={inputes.minValue}
                    max={max}
                    onChange={setMaxValue}
                    className={styles.input}
                />
            </div>
            {/* <p className={styles.information}>
                {values[0] === values[1]
                    ? `Выбранная цена: ${values[0].toLocaleString()} Р`
                    : `Диапазон цен от ${values[0].toLocaleString()} до ${values[1].toLocaleString()} Р`}
            </p> */}
            <Range
                values={values}
                step={5000}
                min={min}
                max={max}
                onChange={changeValuesFromRange}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        className={styles.trackerWrapper}
                    >
                        <div
                            ref={props.ref}
                            className={styles.track}
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ["#818EA3", "#007BFF", "#818EA3"],
                                    min,
                                    max,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div {...props} className={styles.range}>
                        <button className={styles.thumb} />
                    </div>
                )}
            />
            {/* <output style={{ marginTop: "30px" }} id="output">
                {values[0].toFixed(1)}
            </output> */}
        </div>
    );
};
