"use client";

import { CSSProperties, useState } from 'react';
import { ColorAnnotaion, GAPBlock, INSTBlock } from '../Timeblock/TimelineUtils';
import styles from './Timeline.module.css'
import { TimeBlock, TimeBlockColor, TimeBlockWrapper } from "@/utils/types";
import { HorizantalPanel } from '../Layout/Layout';
import CustomButton from '../Button/CustomButton';
import { faBarsStaggered, faChartLine, faExclamation, faRepeat, faRulerHorizontal, faXmark } from '@fortawesome/free-solid-svg-icons';
import { generateColor } from '@/utils/colorGenerator';
import { Cascadia_Code } from 'next/font/google'
import Ruler from '../Ruler/Ruler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogTextarea from '../LogTextarea/LogTextarea';
import DisplayPanel from '../DisplayPanel/DisplayPanel';
import { parseChronosLogs } from '@/utils/parser';
import FloatingControl, { FloatingP } from '../FloatingControl/FloatingControl';

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export const zoomVariation: number[] = [
    0.5, 2, 5, 20
];

export default function TimelineBlock(
    { data, zoomSelection = 1, deleteBlock }
        : { data: TimeBlockWrapper; zoomSelection?: number; deleteBlock: () => void; }
) {
    const [displayTimeline, changeDisplayTimeline] = useState(true);
    const [logText, updateLogText] = useState("");
    const [rulerType, setRulerType] = useState(0); // 0: relative, 1: absolute
    const [timeBlocks, setTimeBlocks] = useState([] as TimeBlock[])
    const [showDelete, setShowDelete] = useState(false);
    const logBuild = () => {
        const timeBlock: TimeBlock[] = parseChronosLogs(logText)
        setTimeBlocks(timeBlock)
        console.log(timeBlock)
        changeDisplayTimeline(true)
    }

    return (
        <div className={styles.wrapper} id={`block${data.blockId}`}>
            <HorizantalPanel align='Left' gap={16} marginBottom={8}>
                <span className={`${styles.wrapper_caption} ${CascadiaCode.className}`}>
                    {data.blockName}
                </span>
                <HorizantalPanel align='Left' gap={4}>
                    <CustomButton
                        func={() => { setRulerType((rulerType + 1) % 2) }}
                        icon={faRulerHorizontal}
                        isSmall />
                    <CustomButton
                        func={() => { changeDisplayTimeline((displayTimeline) ? false : true) }}
                        icon={faBarsStaggered}
                        isSmall />
                    <CustomButton
                        func={() => setShowDelete(true)}
                        icon={faXmark}
                        isSmall />
                    <FloatingControl
                        isVisible={showDelete}
                        onClose={() => setShowDelete(false)}
                        insetsVertical={20}
                        insetsHorizantal={-34}
                        width={300}
                        align='tl'>
                        <FloatingP>Are you sure you want to delete this time chart?</FloatingP>
                        <HorizantalPanel align='Right' gap={8}>
                            <CustomButton
                                isSmall
                                title='Delete'
                                func={deleteBlock}
                                isTransparent />
                            <CustomButton
                                isPrimary
                                isSmall
                                title='Cancel'
                                func={() => { setShowDelete(false) }} />
                        </HorizantalPanel>
                    </FloatingControl>
                </HorizantalPanel>
            </HorizantalPanel>
            <DisplayPanel visible={!displayTimeline}>
                <LogTextarea
                    textState={logText}
                    textUpdate={updateLogText}
                    textSubmit={logBuild}>
                    <span>[ChronosLog]  62827   FUNC0   DONE</span><br />
                    <span>[ChronosLog]  62828   FUNC1   STALL</span><br />
                    <span>[ChronosLog]  62829   FUNC2   DONE</span><br />
                    <span>...</span>
                </LogTextarea>
            </DisplayPanel>
            <DisplayPanel visible={displayTimeline}>
                <Timeline
                    blocks={timeBlocks}
                    rulerType={rulerType}
                    zoom={zoomVariation[zoomSelection]}
                    showTextarea={() => changeDisplayTimeline(false)} />

            </DisplayPanel>
        </div>
    )
}

export function Timeline(
    { blocks, zoom = 2, rulerType = 0, showTextarea }
        : { blocks: TimeBlock[]; zoom?: number; rulerType?: number; showTextarea: () => void }
) {
    if (blocks.length === 0) {
        return (
            <div className={styles.container_nodata}>
                <CustomButton
                    func={showTextarea}
                    icon={faBarsStaggered}
                    title='Input ChronosLog'
                    isPrimary
                />
                Timeline will be shown once logs are given.
            </div>
        );
    }

    const minCycle = blocks[0].startCycle;
    const totalWidth = (blocks[blocks.length - 1].endCycle - minCycle + 1) * zoom;

    let colorDictionary: TimeBlockColor[] = [];

    return (
        <>
            <div className={styles.container}>
                <Ruler
                    minCycle={blocks[0].startCycle}
                    maxCycle={blocks[blocks.length - 1].endCycle}
                    zoom={zoom}
                    step={100 / zoom}
                    showAbsolute={rulerType === 1}
                />
                <div
                    className={styles.slider}
                    style={{ width: `${totalWidth}px` }}
                >
                    {blocks.map((block) => {
                        const left = (block.startCycle - minCycle) * zoom;
                        const width = block.duration * zoom;

                        const blockStyle: CSSProperties = {
                            left: `${left}px`,
                            width: `${Math.max(width, 1)}px`,
                        };

                        if (block.type === 'GAP') {
                            return (
                                <GAPBlock
                                    key={block.id}
                                    layoutStyle={blockStyle}
                                    cycles={block.duration}
                                    showLabel={width >= 15}
                                />
                            )
                        }
                        else {
                            let targetItem = colorDictionary.find(item => item.opName === block.opName);
                            if (!targetItem) {
                                const newItem: TimeBlockColor = {
                                    opName: block.opName,
                                    color: generateColor(colorDictionary)
                                };
                                colorDictionary.push(newItem);
                                targetItem = newItem;
                            }
                            return (
                                <INSTBlock
                                    key={block.id}
                                    color={targetItem.color}
                                    layoutStyle={blockStyle}
                                    cycles={block.duration}
                                    showLabel={width >= 15}
                                />
                            )
                        }

                    })}
                </div>
            </div>
            <HorizantalPanel align='Right' gap={8}>
                {colorDictionary.map((colorData) => {
                    return <ColorAnnotaion key={colorData.opName} colorSet={colorData} />
                })}
            </HorizantalPanel>
        </>
    )
}