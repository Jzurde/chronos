import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CustomButton.module.css'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function CustomButton(
    {
        func,
        title = "",
        icon = null,
        isPrimary = false,
        isTransparent,
        isSmall = false
    }
        : {
            func: () => void;
            title?: string; icon?:
            IconProp | null;
            isPrimary?: boolean;
            isTransparent?: boolean;
            isSmall?: boolean;
        }
) {
    const style = (isPrimary) ? styles.primary : (isTransparent) ? styles.transparent : styles.normal;
    const padding = (isSmall) ? 6 : 12;
    const height = (isSmall) ? 30 : 42;
    return (
        <button
            style={{ padding: `${padding}px`, height: `${height}px` }}
            onClick={() => func()}
            className={style}>
            {(icon != null) && <FontAwesomeIcon icon={icon} />}
            {(title != "") && <span>{title}</span>}
        </button>
    )
}