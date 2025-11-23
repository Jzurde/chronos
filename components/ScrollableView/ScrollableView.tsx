import React from 'react';
import styles from './ScrollableView.module.css'

export default function ScrollableView(
    { children }
        : { children: React.ReactNode; }
) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}