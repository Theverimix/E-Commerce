import { Button } from 'primereact/button'

const CooldownBtn = ({
    label,
    onClick,
    isText = false,
    visible = true,
    className,
    icon,
    isRemove = false,
    isCooldown,
}) => {
    return (
        <Button
            className={className}
            loading={isCooldown}
            label={isCooldown && isRemove ? '' : label}
            onClick={onClick}
            disabled={isCooldown}
            visible={visible}
            text={isText}
            icon={icon}
        />
    )
}

export default CooldownBtn
