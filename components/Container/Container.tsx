import React, { CSSProperties } from 'react';
import styles from './Container.module.css'

export default function Container(
    { children, padding = 16 }
        : { children: React.ReactNode, padding?: Number }
) {
    return (
        <div
            style={{ padding: `${padding}px` }}
            className={styles.container}>
            {children}
        </div>
    )
}

export function Placeholder(
    { children, layoutStyles }
        : { children: React.ReactNode; layoutStyles?: CSSProperties }
) {
    return (
        <div
            style={layoutStyles}
            className={styles.placeholder}>
            {children}
        </div>
    )
}