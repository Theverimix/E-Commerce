import { Dropdown } from 'primereact/dropdown'
import { Controller } from 'react-hook-form'

export default function DropdownWrapper({
    name,
    control,
    label,
    placeholder,
    options,
    onChange,
    optionLabel,
    optionValue,
    filter,
    disabled,
}) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className='field'>
                    <span className={`${label ? 'p-float-label' : ''}`}>
                        <Dropdown
                            {...field}
                            id={field.name}
                            {...(filter ? { filter } : {})}
                            options={options}
                            disabled={disabled}
                            onChange={(e) => {
                                field.onChange(e.target.value)
                                if (onChange) onChange(e.target.value)
                            }}
                            {...(optionLabel ? { optionLabel } : {})}
                            {...(optionValue ? { optionValue } : {})}
                            placeholder={placeholder}
                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                        />
                        {label && <label htmlFor={name}>{label}</label>}
                    </span>
                    {fieldState?.error?.message && <small className='p-error'>{fieldState.error.message}</small>}
                </div>
            )}
        />
    )
}
