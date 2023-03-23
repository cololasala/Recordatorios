import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, formValidations = {}, formInputsFocus = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setformValidation] = useState({});
  const [touched, setTouched] = useState(formInputsFocus);

  useEffect(() => {
    createValidators();
  }, [formState])


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(value)
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
    setTouched({});
  };

  const handleTouch = (key) => {
    const newTouched = { ...touched, [key]: true };
    setTouched(newTouched);
  };

  const isFormValid = useMemo(() => {
    if (Object.keys(formValidation).length === 0) {
      return false;
    }
    for(const formValue of Object.keys(formValidation)) {
      if(formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const createValidators = () => {
    const formCheckValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]; //obtengo el primer y segundo elemento del array de la property del objeto
      formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
      console.log(formCheckValues)
      setformValidation(formCheckValues);
    }
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
    handleTouch,
    touched
  };
};
