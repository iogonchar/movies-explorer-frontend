import { useState, useCallback } from 'react'

const useFormWithValidation = () => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (evt) => {
    const target = evt.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    setValues({
      ...values,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: target.validationMessage,
    })

    setIsValid(target.closest('form').checkValidity())
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  }
}

export default useFormWithValidation;
