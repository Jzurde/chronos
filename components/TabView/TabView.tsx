import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './TabView.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export function TabButton(
    { func, title, icon, isSelected = false, isHorizantal = false }
        : { func: () => void; title: string; icon: IconProp; isSelected?: boolean; isHorizantal?: boolean }
) {
    const style = (isHorizantal) ? styles.tab_button_horizantal : styles.tab_button_horizantal
    return (
        <button
            onClick={() => func()}
            className={(isSelected) ? `${style} ${styles.selected}` : style}>
            <FontAwesomeIcon icon={icon} />
            <span>{title}</span>
        </button>
    )
}

export function TabPanel(
    { isVisible, children }
        : { isVisible: boolean; children: React.ReactNode; }
) {
    const style = isVisible ? styles.panel_visible : styles.panel_invisible;
    return (
        <div className={style}>
            {children}
        </div>
    )
}