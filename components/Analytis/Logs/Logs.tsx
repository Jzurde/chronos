import { RawLog, TimeBlock, TimeBlockWrapper } from '@/utils/types';
import styles from './Logs.module.css'
import { TabButton, TabContainer, TabPanel } from '@/components/TabView/TabView';
import { useState } from 'react';
import { faBarsStaggered, faLineChart } from '@fortawesome/free-solid-svg-icons';
import { Cascadia_Code } from 'next/font/google'
import { Placeholder } from '@/components/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollableView from '@/components/ScrollableView/ScrollableView';

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function Logs(
    { datas }
        : { datas: TimeBlockWrapper[]; }
) {
    const [selectedTab, changeSelectedTab] = useState(0);
    if (datas.length === 0) {
        return (
            <Placeholder>
                <FontAwesomeIcon icon={faLineChart} size="2x" />
                <p>Press "Add" to start analyzing...</p>
            </Placeholder>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.left_menu}>
                {datas.map((data, index) => {
                    return (
                        <TabButton
                            key={index}
                            func={() => { changeSelectedTab(index) }}
                            icon={faBarsStaggered}
                            title={data.blockName}
                            isSelected={selectedTab === index}
                        />
                    )
                })}
            </div>
            <div className={styles.right_area}>
                <h2 className={styles.log_title}>Logs</h2>
                <div className={`${styles.label_bars} ${CascadiaCode.className}`}>
                    <div className={styles.bars_cycle}>cycles</div>
                    <div className={styles.bars_status}>status</div>
                    <div className={styles.bars_opname}>operation name</div>
                    <div className={styles.bars_info}>info</div>
                </div>
                <TabContainer>
                    {datas.map((data, index) => {
                        if (!data.timeBlocks) {
                            return;
                        }
                        else {
                            return (
                                <TabPanel key={index} isVisible={selectedTab === index}>
                                    <LogArea datas={data.timeBlocks} />
                                </TabPanel>
                            )
                        }
                    })}
                </TabContainer>
            </div>
        </div>
    )
}

export function LogArea(
    { datas }
        : { datas: TimeBlock[] }
) {
    let visiual_index = 0;
    return (
        <ScrollableView>
            <div className={styles.log_table}>
                {datas.map((data: TimeBlock, index) => {
                    if (data.type === "GAP") {
                        visiual_index = 0;
                        return (
                            <div key={index} className={styles.log_gap}>
                                GAP
                            </div>
                        )
                    }
                    else {
                        return (<div key={index}>
                            {data.details?.map((logs) => {
                                visiual_index++;
                                return (
                                    <LogLine rawLogData={logs} isgray={visiual_index % 2 === 0} />
                                )
                            })}
                        </div>
                        )
                    }
                })
                }
            </div>
        </ScrollableView>

    )
}

export function LogLine(
    { rawLogData, isgray }
        : { rawLogData: RawLog; isgray: boolean; }
) {
    const style = isgray ? styles.gray_line : styles.white_line;
    const status_style =
        (rawLogData.status === "DONE") ? styles.line_status_done :
            (rawLogData.status === "EXEC") ? styles.line_status_exec :
                styles.line_status_stall;
    return (
        <div className={`${style} ${CascadiaCode.className}`}>
            <div className={styles.line_cycle}>{rawLogData.cycle}</div>
            <div className={status_style}>{rawLogData.status}</div>
            <div className={styles.line_opname}>{rawLogData.opName}</div>
            <div className={styles.line_info}>{rawLogData.info}</div>
        </div>
    )
}