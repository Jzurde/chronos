import { SelectedBlock, TimeBlockWrapper } from '@/utils/types';
import styles from './Inspector.module.css'
import { Placeholder } from '@/components/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import ScrollableView from '@/components/ScrollableView/ScrollableView';
import { StatsList } from '../Overall/Overall';
import { HorizantalPanel } from '@/components/Layout/Layout';
import { ColorAnnotaion } from '@/components/Timeblock/TimelineUtils';
import { Cascadia_Code } from 'next/font/google'
import { LogArea } from '../Logs/Logs';

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function Inspector(
    { datas, selectedBlock }
        : { datas: TimeBlockWrapper[]; selectedBlock?: SelectedBlock }
) {
    const targetWrapper = datas.find(data => data.blockId === selectedBlock?.wrapperId);
    // const index = datas.findIndex(data => data.blockId === selectedBlock?.wrapperId);
    // const targetWrapper = datas[index];
    if (!targetWrapper || !targetWrapper.timeBlocks) return (
        <Placeholder>
            <FontAwesomeIcon icon={faHandPointer} size="2x" />
            <p>Select block from timeline</p>
        </Placeholder>
    )
    // const selectedBlockData
    //     = targetWrapper.timeBlocks?.find(block => block.id === selectedBlock?.blockId);
    const index = targetWrapper.timeBlocks.findIndex(block => block.id === selectedBlock?.blockId);
    const selectedBlockData = targetWrapper.timeBlocks[index];

    if (!selectedBlockData) return (
        <Placeholder>
            <FontAwesomeIcon icon={faHandPointer} size="2x" />
            <p>Select block from timeline</p>
        </Placeholder>
    )
    let stalled_cycles = 0, previous_cycle = -1;
    selectedBlockData.details?.forEach(rawLog => {
        if (rawLog.cycle !== previous_cycle && rawLog.status === "STALL") {
            stalled_cycles++;
            previous_cycle = rawLog.cycle;
        }
    });
    const percentage = Math.floor(stalled_cycles / selectedBlockData.duration * 1000) / 10
    const timeblockArray = targetWrapper.timeBlocks
    let preGAP = -1, postGAP = -1;
    if (index > 0) {
        preGAP = (timeblockArray[index - 1].type === "GAP") ? timeblockArray[index - 1].duration : 0;
    }
    if (index < timeblockArray.length - 1) {
        postGAP = (timeblockArray[index + 1].type === "GAP") ? timeblockArray[index + 1].duration : 0;
    }

    return (
        <ScrollableView>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.cell}>
                        <h3>Summary</h3>
                        <StatsList
                            label='Duration'
                            data={`${selectedBlockData.duration} cyls`}
                        />
                        <StatsList
                            isSub
                            label='Range'
                            data={`${selectedBlockData.startCycle} - ${selectedBlockData.endCycle} `}
                        />
                        {/* <StatsList
                            label='Status'
                            data={`warning`}
                            explanation='Taking longer than the average (15 cycles)'
                        /> */}
                    </div>
                    <div className={styles.cell}>
                        <h3>Efficiency</h3>
                        <EfficiencyBar percentage={percentage} />
                        <StatsList
                            label='Stall'
                            data={`${stalled_cycles} cyls`}
                            isSub
                        />
                        <StatsList
                            label='Active'
                            data={`${selectedBlockData.duration - stalled_cycles} cyls`}
                            isSub
                            explanation='Active includes status of EXEC and DONE'
                        />
                    </div>
                    <div className={styles.cell}>
                        <h3>Context</h3>
                        <StatsList
                            label='Pre-Gap'
                            data={(preGAP !== -1) ? `${preGAP} cyls` : '-'}
                            explanation='Possible load overhead'
                        />
                        <StatsList
                            label='Post-Gap'
                            data={(postGAP !== -1) ? `${postGAP} cyls` : '-'}
                            explanation='Possible store overhead'
                        />
                    </div>
                </div>
                <div className={styles.log_area}>
                    <h3>Logs</h3>
                    <div className={`${styles.label_bars} ${CascadiaCode.className}`}>
                        <div className={styles.bars_cycle}>cycles</div>
                        <div className={styles.bars_status}>status</div>
                        <div className={styles.bars_opname}>operation name</div>
                        <div className={styles.bars_info}>info</div>
                    </div>
                    <LogArea datas={[selectedBlockData]} />
                </div>
            </div>
        </ScrollableView>
    )
}

export function EfficiencyBar(
    { percentage }
        : { percentage: number; }
) {
    return (
        <div>
            <div className={styles.bar_container}>
                <div className={styles.bar_area}>
                    <div
                        style={{ width: `${percentage}%` }}
                        className={styles.bar_ribbon}></div>
                </div>
                <div className={`${styles.bar_label} ${CascadiaCode.className}`}>
                    {percentage}%
                </div>
            </div>
            <HorizantalPanel align='Right' gap={8}>
                <ColorAnnotaion colorSet={{
                    opName: "Active",
                    color: "#4DB6AC"
                }} />
                <ColorAnnotaion colorSet={{
                    opName: "Stall",
                    color: "#FFB74D"
                }} />
            </HorizantalPanel>
        </div>
    )
}