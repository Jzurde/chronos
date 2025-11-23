import { FunctionTime, TimeBlockWrapper } from '@/utils/types';
import styles from './Overall.module.css'
import { Cascadia_Code } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function Overall(
    { datas }
        : { datas: TimeBlockWrapper[] }
) {
    return (
        <div className={styles.container}>
            {(datas.length === 0) && (
                <div className={styles.container_nodata}>
                    no data.
                </div>
            )}
            {datas.map((data) => {
                return (
                    <OverallCell
                        key={data.blockId}
                        data={data}
                    />
                )
            })}
        </div>
    )
}

export function OverallCell(
    { data }
        : { data: TimeBlockWrapper; }
) {
    const timeBlocks = data.timeBlocks;
    if (!timeBlocks) {
        return (
            <div className={styles.cell_nodata}>
                no data
            </div>
        )
    }
    else {
        let totalCycles = 0, registeredCycles = 0, GAPCycles = 0;
        // let functionTime: FunctionTime[] = [];
        const functionMap = new Map<string, number>();
        timeBlocks.forEach(timeblock => {
            totalCycles += timeblock.duration;
            if (timeblock.type === "GAP") {
                GAPCycles += timeblock.duration;
                return
            }
            else registeredCycles += timeblock.duration;

            const currentVal = functionMap.get(timeblock.opName) || 0;
            functionMap.set(timeblock.opName, currentVal + timeblock.duration);

            // let targetFunc = functionTime.find(item => item.opName === timeblock.opName);
            // if (!targetFunc) {
            //     const newFunc: FunctionTime = {
            //         opName: timeblock.opName,
            //         timeTaken: 0
            //     }
            //     functionTime.push(newFunc);
            //     targetFunc = newFunc;
            // }
            // targetFunc.timeTaken += timeblock.duration;
        });
        const functionTime: FunctionTime[] = Array.from(functionMap.entries()).map(([opName, timeTaken]) => ({
            opName,
            timeTaken
        }))
        return (
            <div className={styles.cell_container}>
                <span className={`${styles.cell_label} ${CascadiaCode.className}`}>
                    {data.blockName}
                </span>
                <div className={styles.cell_data_container}>
                    <div className={styles.cell_data_cell}>
                        <h3>Stats</h3>
                        <StatsList
                            label='total'
                            data={`${registeredCycles} cyls`}
                            explanation='recorded cycles with function execution'
                        />
                        <StatsList
                            label='duration'
                            data={`${totalCycles} cyls`}
                            explanation='duration between first and last cycle recorded'
                            isSub />
                        <StatsList
                            label='GAP'
                            data={`${GAPCycles} cyls`}
                            explanation='cycles with no Logs'
                            isSub />
                    </div>
                    <div className={styles.cell_data_cell}>
                        <h3>Functions</h3>
                        {functionTime.map((thisFunction) => {
                            const percentages = Math.round(thisFunction.timeTaken / registeredCycles * 1000) / 10;
                            return (
                                <>
                                    <StatsList
                                        label={thisFunction.opName}
                                        data={`${thisFunction.timeTaken} cyls`}
                                        noBorder
                                    />
                                    <StatsList
                                        isSub
                                        data={`${percentages} %`}
                                    />
                                </>
                            )
                        })}
                    </div>
                </div>
            </div >

        )
    }
}

export function StatsList(
    { label, data, isSub = false, explanation, noBorder = false }
        : { label?: string; data: string; isSub?: boolean; explanation?: string, noBorder?: boolean; }
) {
    const style = (isSub) ? styles.list_sub : styles.list_main;
    return (
        <div
            style={{
                borderBottomWidth: (noBorder) ? `0px` : `3px`
            }}
            className={`${style} ${CascadiaCode.className}`}>
            <div className={styles.list_row}>
                <div className={styles.list_label}>
                    {isSub && <FontAwesomeIcon icon={faArrowRight} />}
                    <span>{label}</span>
                </div>
                <div className={styles.list_data}>{data}</div>
            </div>
            {(explanation) && <span className={styles.list_info}>{explanation}</span>}
        </div>
    )
}