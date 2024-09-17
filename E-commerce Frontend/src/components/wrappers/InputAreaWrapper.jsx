import { InputTextarea } from 'primereact/inputtextarea'
import { Controller } from 'react-hook-form'

export default function InputAreaWrapper({ name, control, label, autoResize = false }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className='field'>
                    <span className={`${label ? 'p-float-label' : ''}`}>
                        <InputTextarea
                            {...field}
                            id={field.name}
                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            autoResize={autoResize}
                        />
                        {label && <label htmlFor={name}>{label}</label>}
                    </span>
                    {fieldState?.error?.message && <small className='p-error'>{fieldState.error.message}</small>}
                </div>
            )}
        />
    )
}
