import React from 'react';
import styles from './DisplayPanel.module.css'

export default function DisplayPanel(
    { children, visible }
        : { children: React.ReactNode; visible: boolean }
) {
    const style = (visible) ? styles.visible : styles.invisible;
    return (
        <div className={style}>
            {children}
        </div>
    )
}