import { CSSProperties } from 'react';
import styles from './TimelineUtils.module.css'
import { TimeBlockColor } from '@/utils/types';
import { HorizantalPanel } from '../Layout/Layout';
import { Cascadia_Code } from 'next/font/google'

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export function GAPBlock(
    { layoutStyle, cycles, showLabel }
        : { layoutStyle: CSSProperties; cycles: number; showLabel: boolean; }
) {
    return (
        <div
            className={styles.gap_block}
            style={layoutStyle}>
            <span className={`${styles.block_label} ${CascadiaCode.className}`}>
                {showLabel && cycles}
            </span>
            <div className={styles.gap_block_ribbon}></div>

        </div>
    )
}

export function INSTBlock(
    { layoutStyle, color, cycles, showLabel }
        : { layoutStyle: CSSProperties; color: string; cycles: number; showLabel: boolean; }
) {
    return (
        <div
            className={styles.inst_block}
            style={layoutStyle}>
            <span className={`${styles.block_label} ${CascadiaCode.className}`}>
                {showLabel && cycles}
            </span>
            <div
                style={{ backgroundColor: color }}
                className={styles.inst_block_ribbon}></div>
        </div>
    )
}

export function ColorAnnotaion(
    { colorSet }
        : { colorSet: TimeBlockColor; }
) {
    return (
        <div id={colorSet.opName}>
            <HorizantalPanel align='Left' gap={4}>
                <div
                    style={{ backgroundColor: `${colorSet.color}` }}
                    className={styles.annotation_window}></div>
                <span className={`${styles.annotation_caption} ${CascadiaCode.className}`}>
                    {colorSet.opName}
                </span>
            </HorizantalPanel>
        </div>
    )
}