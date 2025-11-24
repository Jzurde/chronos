import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './TabView.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';

export function TabButton(
    { func, title, icon, isSelected = false, isHorizantal = false }
        : { func: () => void; title: string; icon: IconProp; isSelected?: boolean; isHorizantal?: boolean }
) {
    const style = (isHorizantal) ? styles.tab_button_horizantal : styles.tab_button_vertical
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
    { isVisible, children, scrollHeight = 0 }
        : { isVisible: boolean; children: React.ReactNode; scrollHeight?: number; }
) {
    const style = isVisible ? styles.panel_visible : styles.panel_invisible;
    const scrollStyle: CSSProperties = (scrollHeight === 0) ? {
        overflowY: "inherit"
    } : {
        overflowY: "auto",
        height: scrollHeight
    }
    return (
        <div
            style={scrollStyle}
            className={style}>
            {children}
        </div>
    )
}

export function TabContainer(
    { children }
        : { children: React.ReactNode; }
) {
    return (
        <div className={styles.tab_container}>
            {children}
        </div>
    )
}