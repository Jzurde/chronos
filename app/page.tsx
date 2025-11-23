'use client';

import styles from "./page.module.css";
import { useState } from "react";
import { TimeBlock, TimeBlockWrapper } from "@/utils/types";
import { parseChronosLogs } from "@/utils/parser";
import TimelineBlock, { zoomVariation } from "@/components/Timeline/Timeline";
import Container from "@/components/Container/Container";
import CustomButton from "@/components/Button/CustomButton";
import { faBarsStaggered, faChartArea, faCheck, faLineChart, faMagnifyingGlass, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TabButton, TabContainer, TabPanel } from "@/components/TabView/TabView";
import { HorizantalPanel } from "@/components/Layout/Layout";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";
import FloatingControl, { FloatingP } from "@/components/FloatingControl/FloatingControl";
import { Cascadia_Code } from 'next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Overall from "@/components/Analytis/Overall/Overall";
import Logs from "@/components/Analytis/Logs/Logs";

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function Home() {

    const [zoomIndex, changeZoomIndex] = useState(1);
    const [blocks, updateBlocks] = useState<TimeBlockWrapper[]>([]);
    const [newname, setNewname] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const zoomIn = () => {
        if (zoomIndex < zoomVariation.length - 1) {
            changeZoomIndex(zoomIndex + 1)
        }
    };
    const zoomOut = () => {
        if (zoomIndex > 0) {
            changeZoomIndex(zoomIndex - 1)
        }
    };
    const addBlock = (name: string) => {
        const newBlockId = (blocks.length) ? blocks[blocks.length - 1].blockId + 1 : 0;
        const newBlock: TimeBlockWrapper = {
            blockId: newBlockId,
            blockName: name
        };
        updateBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    };
    const deleteBlock = (targetId: number) => {
        updateBlocks((prevBlocks) => prevBlocks.filter((block) => block.blockId !== targetId));
    };
    const createClickHandle = () => {
        if (newname == "") return
        addBlock(newname);
        setModalIsOpen(false);
        setNewname("");
    }
    const logBuild = (targetId: number, logText: string) => {
        const timeBlock: TimeBlock[] = parseChronosLogs(logText)
        // setTimeBlocks(timeBlock)
        // console.log(timeBlock)
        updateBlocks((prevBlocks) => {
            return prevBlocks.map((block) => {
                if (block.blockId === targetId) {
                    return {
                        ...block,
                        timeBlocks: timeBlock
                    };
                }
                return block;
            })
        })
    }

    const [selectedTab, changeSelectedTab] = useState(0);



    return (
        <div className={styles.container}>
            <Container>
                <HorizantalPanel align="Strech" marginBottom={8}>
                    <h1>Time Charts</h1>
                    <HorizantalPanel align="Right" gap={8}>
                        <CustomButton func={() => zoomIn()} icon={faMagnifyingGlassPlus} />
                        <CustomButton func={() => zoomOut()} icon={faMagnifyingGlassMinus} />
                        <CustomButton func={() => { }} icon={faHandPointer} title="Unselect" />
                        <CustomButton func={() => setModalIsOpen(true)} icon={faPlus} title="Add" isPrimary />
                    </HorizantalPanel>
                </HorizantalPanel>
                <HorizantalPanel align="Right">
                    <FloatingControl
                        align="tr"
                        insetsVertical={8}
                        width={320}
                        isVisible={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                    >
                        <FloatingP>Input new data's label</FloatingP>
                        <input
                            type="text"
                            value={newname}
                            onChange={(e) => { setNewname(e.target.value) }}
                            className={`${styles.input_text} ${CascadiaCode.className}`}
                            placeholder="new data label" />
                        <HorizantalPanel align="Right">
                            <CustomButton
                                func={createClickHandle}
                                icon={faCheck}
                                title="Create"
                                isPrimary
                                isSmall
                            />
                        </HorizantalPanel>
                    </FloatingControl>
                </HorizantalPanel>
                {(blocks.length === 0) && (
                    <div className={styles.nodata}>
                        <FontAwesomeIcon icon={faLineChart} size="2x" />
                        <p>Press "Add" to start analyzing...</p>
                    </div>
                )}
                {blocks.map((block) => {
                    return (
                        <TimelineBlock
                            updateLog={(rawLog: string) => logBuild(block.blockId, rawLog)}
                            key={block.blockId}
                            deleteBlock={() => { deleteBlock(block.blockId) }}
                            data={block}
                            zoomSelection={zoomIndex} />
                    )
                })}
            </Container>
            <Container>
                <HorizantalPanel align="Left">
                    <TabButton
                        func={() => changeSelectedTab(0)}
                        icon={faChartArea}
                        title="Overall"
                        isSelected={selectedTab === 0}
                        isHorizantal />
                    <TabButton
                        func={() => changeSelectedTab(1)}
                        icon={faBarsStaggered}
                        title="Logs"
                        isSelected={selectedTab === 1}
                        isHorizantal />
                    <TabButton
                        func={() => changeSelectedTab(2)}
                        icon={faMagnifyingGlass}
                        title="Inspections"
                        isSelected={selectedTab === 2}
                        isHorizantal />
                </HorizantalPanel>
                <TabContainer>
                    <TabPanel isVisible={selectedTab === 0}>
                        <Overall datas={blocks} />
                    </TabPanel>
                    <TabPanel isVisible={selectedTab === 1}>
                        <Logs datas={blocks} />
                    </TabPanel>
                    <TabPanel isVisible={selectedTab === 2}>
                        <p>tab 2</p>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </TabPanel>
                </TabContainer>
            </Container>
        </div>
    );
}
