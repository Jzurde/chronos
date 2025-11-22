'use client';

import styles from "./page.module.css";
import { useState } from "react";
import { TimeBlock, TimeBlockWrapper } from "@/utils/types";
import { parseChronosLogs } from "@/utils/parser";
import TimelineBlock, { zoomVariation } from "@/components/Timeline/Timeline";
import Container from "@/components/Container/Container";
import CustomButton from "@/components/Button/CustomButton";
import { faBarsStaggered, faChartArea, faCheck, faMagnifyingGlass, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TabButton } from "@/components/TabView/TabView";
import { HorizantalPanel } from "@/components/Layout/Layout";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";
import FloatingControl from "@/components/FloatingControl/FloatingControl";
import { Cascadia_Code } from 'next/font/google'

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function Home() {

    const [zoomIndex, changeZoomIndex] = useState(1);
    const [blocks, updateBlocks] = useState<TimeBlockWrapper[]>([]);
    const [newname, setNewname] = useState("");
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
        const newBlock: TimeBlockWrapper = {
            blockId: blocks.length,
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
        setNewname("");
    }

    const [selectedTab, changeSelectedTab] = useState(0);



    return (
        <div className={styles.container}>
            <Container>
                <HorizantalPanel align="Strech">
                    <h1>Time Charts</h1>
                    <HorizantalPanel align="Right" gap={8}>
                        <CustomButton func={() => zoomIn()} icon={faMagnifyingGlassPlus} />
                        <CustomButton func={() => zoomOut()} icon={faMagnifyingGlassMinus} />
                        <CustomButton func={() => { }} icon={faHandPointer} title="Unselect" />
                        <CustomButton func={() => { }} icon={faPlus} title="Add" isPrimary />
                    </HorizantalPanel>
                </HorizantalPanel>
                <HorizantalPanel align="Right">
                    <FloatingControl align="tr" insetsVertical={8} width={320} isVisible={false}>
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
                {blocks.map((block) => {
                    return (
                        <TimelineBlock data={block} zoomSelection={zoomIndex} />
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
            </Container>
        </div>
    );
}
