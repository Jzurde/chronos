import React, { CSSProperties } from 'react';
import style from './FloatingControl.module.css'

export default function FloatingControl(
    { children, align, width = 100, insetsHorizantal = 0, insetsVertical = 0, isVisible }
        : {
            children: React.ReactNode;
            align: "tl" | "tr" | "bl" | "br";
            width?: number;
            insetsHorizantal?: number;
            insetsVertical?: number;
            isVisible: boolean;
        }
) {
    const layoutStyle: CSSProperties =
        (align === "tl") ? { top: `${insetsVertical}px`, left: `${insetsHorizantal}px` } :
            (align === "tr") ? { top: `${insetsVertical}px`, right: `${insetsHorizantal}px` } :
                (align === "bl") ? { bottom: `${insetsVertical}px`, left: `${insetsHorizantal}px` } :
                    { bottom: `${insetsVertical}px`, right: `${insetsHorizantal}px` };
    return (
        <div className={style.placeholder}>
            <div
                style={{ ...layoutStyle, width: width }}
                className={`${style.container}`}>
                {children}
            </div>
        </div>
    )
}