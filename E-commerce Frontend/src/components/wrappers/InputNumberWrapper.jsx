import { InputNumber } from 'primereact/inputnumber'
import { Controller } from 'react-hook-form'

export default function InputNumberWrapper({
    name,
    control,
    errors,
    label,
    placeholder,
    min = 0,
    useGrouping = false,
}) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <span className={`${label ? 'p-float-label' : ''}`}>
                        <InputNumber
                            {...field}
                            id={field.name}
                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            onChange={(e) => field.onChange(e.value)}
                            min={min}
                            placeholder={placeholder}
                            useGrouping={useGrouping}
                        />
                        {label && <label htmlFor={name}>{label}</label>}
                    </span>
                )}
            />
            {errors && errors[name] && <small className='p-error'>{errors[name].message}</small>}
        </>
    )
}
