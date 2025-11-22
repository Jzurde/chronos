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