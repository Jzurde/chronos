import React, { CSSProperties, useEffect, useRef } from 'react';
import style from './FloatingControl.module.css'

export default function FloatingControl(
    { children, align, width = 100, insetsHorizantal = 0, insetsVertical = 0, isVisible, onClose }
        : {
            children: React.ReactNode;
            align: "tl" | "tr" | "bl" | "br";
            width?: number;
            insetsHorizantal?: number;
            insetsVertical?: number;
            isVisible: boolean;
            onClose: () => void;
        }
) {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (mouseEvent: MouseEvent) => {
            if (isVisible && menuRef.current && !menuRef.current.contains(mouseEvent.target as Node)) {
                onClose();
            }
        };
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, onClose]);

    const layoutStyle: CSSProperties =
        (align === "tl") ? { top: `${insetsVertical}px`, left: `${insetsHorizantal}px` } :
            (align === "tr") ? { top: `${insetsVertical}px`, right: `${insetsHorizantal}px` } :
                (align === "bl") ? { bottom: `${insetsVertical}px`, left: `${insetsHorizantal}px` } :
                    { bottom: `${insetsVertical}px`, right: `${insetsHorizantal}px` };
    return (
        <div
            style={{ display: (isVisible) ? "block" : "none" }}
            className={style.placeholder}>
            <div
                ref={menuRef}
                style={{ ...layoutStyle, width: width }}
                className={`${style.container}`}>
                {children}
            </div>
        </div>
    )
}

export function FloatingP(
    { children }
        : { children: React.ReactNode; }
) {
    return (
        <p className={style.floating_p}>
            {children}
        </p>
    )
}