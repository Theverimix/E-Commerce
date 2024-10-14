import { InputText } from 'primereact/inputtext'
import { Controller } from 'react-hook-form'

export default function InputTextWrapper({ name, control, placeholder, label, minLenght = 0 }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className='field'>
                    <span className={`${label ? 'p-float-label' : ''}`}>
                        <InputText
                            {...field}
                            id={field.name}
                            minLength={minLenght}
                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            placeholder={placeholder}
                        />
                        {label && <label htmlFor={name}>{label}</label>}
                    </span>
                    {fieldState?.error?.message && <small className='p-error'>{fieldState.error.message}</small>}
                </div>
            )}
        />
    )
}
