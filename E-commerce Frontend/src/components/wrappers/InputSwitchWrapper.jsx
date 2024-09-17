import { InputSwitch } from 'primereact/inputswitch'
import { Controller } from 'react-hook-form'

export default function InputSwitchWrapper({ name, control, label, defaultValue }) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <div className='field'>
                    <span className={`${label ? 'p-float-label flex align-items-center' : ''}`}>
                        <InputSwitch
                            {...field}
                            id={field.name}
                            value={true}
                            checked={field.value}
                            className={`${fieldState.error ? 'p-invalid' : ''}`}
                            onChange={(e) => field.onChange(e.value)}
                        />
                        <span className='ml-3'>{label && <label htmlFor={name}>{label}</label>}</span>
                    </span>
                    {fieldState?.error?.message && <small className='p-error'>{fieldState.error.message}</small>}
                </div>
            )}
        />
    )
}
