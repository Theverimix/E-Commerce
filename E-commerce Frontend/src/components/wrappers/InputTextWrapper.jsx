import { InputText } from 'primereact/inputtext'
import { Controller } from 'react-hook-form'

export default function ControlledInputText({ name, control, errors, placeholder, label }) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <span className={`${label ? 'p-float-label' : ''}`}>
                        <InputText
                            {...field}
                            id={field.name}
                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            placeholder={placeholder}
                        />
                        {label && <label htmlFor={name}>{label}</label>}
                    </span>
                )}
            />
            {errors && errors[name] && <small className='p-error'>{errors[name].message}</small>}
        </>
    )
}
