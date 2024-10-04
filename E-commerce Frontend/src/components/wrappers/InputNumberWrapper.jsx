import { InputNumber } from 'primereact/inputnumber'
import { Controller } from 'react-hook-form'

export default function InputNumberWrapper({
    name,
    control,
    label,
    placeholder,
    min = 0,
    useGrouping = false,
    mode,
    currency,
    locale,
    defaultValue,
}) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <div className='field'>
                    <span className={`${label ? 'p-float-label' : ''}`}>
                        <InputNumber
                            {...field}
                            id={field.name}
                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            onChange={(e) => field.onChange(e.value)}
                            min={min}
                            placeholder={placeholder}
                            useGrouping={useGrouping}
                            mode={mode}
                            currency={currency}
                            locale={locale}
                        />
                        {label && <label htmlFor={name}>{label}</label>}
                    </span>
                    {fieldState?.error?.message && <small className='p-error'>{fieldState.error.message}</small>}
                </div>
            )}
        />
    )
}
