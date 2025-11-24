'use client';

import styles from "./Tools.module.css";
import { useState } from "react";
import { SelectedBlock, TimeBlock, TimeBlockWrapper } from "@/utils/types";
import { parseChronosLogs } from "@/utils/parser";
import TimelineBlock, { zoomVariation } from "@/components/Timeline/Timeline";
import Container, { Placeholder } from "@/components/Container/Container";
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
import ResizableLayout from "@/components/ResizableLayout/ResizableLayout";
import ScrollableView from "@/components/ScrollableView/ScrollableView";
import Inspector from "@/components/Analytis/Inspector/Inspector";

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function Tools() {

    const [zoomIndex, changeZoomIndex] = useState(1);
    const [blocks, updateBlocks] = useState<TimeBlockWrapper[]>([]);
    const [newname, setNewname] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState<SelectedBlock>({ wrapperId: -1, blockId: "" })
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
            <ResizableLayout
                topContent={
                    <Container>
                        <HorizantalPanel align="Strech" marginBottom={8}>
                            <h1>Time Charts</h1>
                            <HorizantalPanel align="Right" gap={8}>
                                <CustomButton func={() => zoomIn()} icon={faMagnifyingGlassPlus} />
                                <CustomButton func={() => zoomOut()} icon={faMagnifyingGlassMinus} />
                                <CustomButton func={() => setSelectedBlock({
                                    wrapperId: -1, blockId: ""
                                })} icon={faHandPointer} title="Unselect" />
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
                        <ScrollableView>
                            {(blocks.length === 0) && (
                                <Placeholder>
                                    <FontAwesomeIcon icon={faLineChart} size="2x" />
                                    <p>Press "Add" to start analyzing...</p>
                                </Placeholder>
                            )}
                            {blocks.map((block) => {
                                return (
                                    <TimelineBlock
                                        updateLog={(rawLog: string) => logBuild(block.blockId, rawLog)}
                                        key={block.blockId}
                                        deleteBlock={() => { deleteBlock(block.blockId) }}
                                        data={block}
                                        zoomSelection={zoomIndex}
                                        handleClick={(newSelectedBlock: SelectedBlock) => {
                                            setSelectedBlock(newSelectedBlock);
                                            changeSelectedTab(2);
                                        }}
                                        selectedBlock={selectedBlock}
                                    />
                                )
                            })}
                        </ScrollableView>
                    </Container>
                }
                bottomContent={
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
                                <Inspector
                                    datas={blocks}
                                    selectedBlock={selectedBlock}
                                />
                            </TabPanel>
                        </TabContainer>
                    </Container>
                }
            />


        </div>
    );
}
