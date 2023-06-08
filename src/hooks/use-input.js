import { useState } from "react";

const useInput = (validateValue) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) =>{
        setValue(event.target.value);
    }
    const inputBlurHandler = (event)=>{
        setIsTouched(true);
    };

    const reset = () =>{
        setIsTouched(false);
        setValue('');
    };

    return({
        value,
        valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    })


};

export default useInput;