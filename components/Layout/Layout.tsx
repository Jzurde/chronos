import React from 'react';
import styles from './Layout.module.css'

export function HorizantalPanel(
    { align, children, gap = 0, marginBottom = 0 }
        : {
            align: "Left" | "Right" | "Center" | "Strech" | "Fit";
            children: React.ReactNode;
            gap?: Number;
            marginBottom?: Number
        }
) {
    const style =
        (align === "Left") ? styles.horizantal_left :
            (align === "Right") ? styles.horizantal_right :
                (align === "Center") ? styles.horizantal_center :
                    (align === "Fit") ? styles.horizantal_fit : styles.horizantal_stretch;
    return (
        <div
            style={{ gap: `${gap}px`, marginBottom: `${marginBottom}px` }}
            className={style}>
            {children}
        </div>
    )
}

export function TwoColumn(
    { left, right, minwidth = 200 }
        : { left?: React.ReactNode; right?: React.ReactNode; minwidth?: number; }
) {
    return (
        <div
            style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(min(${minwidth}px, 100%), 1fr))`
            }}
            className={styles.two_container}>
            <div className={styles.two_cells}>
                {left}
            </div>
            <div className={styles.two_cells}>
                {right}
            </div>
        </div>
    )
}