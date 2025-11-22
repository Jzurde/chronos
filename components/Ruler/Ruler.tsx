import styles from './Ruler.module.css';
import { Cascadia_Code } from 'next/font/google';

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function Ruler(
    { minCycle, maxCycle, zoom, step = 100, showAbsolute = false }
        : { minCycle: number; maxCycle: number; zoom: number; step?: number; showAbsolute?: boolean }
) {
    if (!showAbsolute) {
        const totalDuration = maxCycle - minCycle + 1;
        const totalWidth = totalDuration * zoom;
        const ticks = [];
        for (let t = step; t < totalDuration; t += step) {
            if (totalDuration - t >= step / 2)
                ticks.push(t);
        }
        return (
            <div
                style={{ width: `${totalWidth}px` }}
                className={styles.slider}>
                <RulerLine positionLeft={0} tickCycle={0} isFirst />
                {ticks.map((tickCycle) => {
                    const left = tickCycle * zoom;
                    return (
                        <RulerLine positionLeft={left} tickCycle={tickCycle} />
                    )
                })}
                <RulerLine
                    positionLeft={totalDuration * zoom}
                    tickCycle={totalDuration}
                    isLast />
            </div>
        )
    }
    else {
        const totalWidth = (maxCycle - minCycle + 1) * zoom;
        const ticks = [];
        const firstTick = Math.ceil(minCycle / step) * step;
        for (let c = firstTick; c <= maxCycle; c += step) {
            if (maxCycle - c >= step / 2 && c - minCycle >= step / 2)
                ticks.push(c);
        }

        return (
            <div
                style={{ width: `${totalWidth}px` }}
                className={styles.slider}>
                <RulerLine positionLeft={0} tickCycle={minCycle} isFirst />
                {ticks.map((tickCycle) => {
                    const left = (tickCycle - minCycle) * zoom;
                    return (
                        <RulerLine positionLeft={left} tickCycle={tickCycle} />
                    )
                })}
                <RulerLine
                    positionLeft={(maxCycle - minCycle + 1) * zoom}
                    tickCycle={minCycle}
                    isLast />
            </div>
        )
    }
}

export function RulerLine(
    { positionLeft, tickCycle, isFirst = false, isLast = false }
        : { positionLeft: number; tickCycle: number, isFirst?: boolean, isLast?: boolean }
) {
    const style = (isFirst) ? styles.first_line : (isLast) ? styles.last_line : styles.normal_line
    return (
        <div
            style={{ left: `${positionLeft}px` }}
            className={style}>
            <div className={styles.line_line}></div>
            <span className={`${styles.line_caption} ${CascadiaCode.className}`}>{tickCycle}</span>
        </div>
    )
}