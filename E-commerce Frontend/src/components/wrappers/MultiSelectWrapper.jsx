import { MultiSelect } from 'primereact/multiselect'
import { Controller } from 'react-hook-form'

export default function MultiSelectWrapper({
    name,
    control,
    label,
    options,
    optionLabel,
    optionValue,
    display,
    maxSelectedLabels,
}) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className='field'>
                    <span className={`${label ? 'p-float-label' : ''}`}>
                        <MultiSelect
                            {...field}
                            id={field.name}
                            value={field.value}
                            options={options}
                            optionLabel={optionLabel}
                            optionValue={optionValue}
                            display={display}
                            maxSelectedLabels={maxSelectedLabels}
                            onChange={(e) => field.onChange(e.value)}
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
