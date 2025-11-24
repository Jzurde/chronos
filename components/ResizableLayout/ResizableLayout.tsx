"use client";

import React from 'react';
import styles from './ResizableLayout.module.css'
import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from "react-resizable-panels";

export default function ResizableLayout({
    topContent,
    bottomContent,
}: {
    topContent: React.ReactNode;
    bottomContent: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <PanelGroup direction="vertical">
                <Panel defaultSize={40} minSize={20}>
                    {topContent}
                </Panel>
                <PanelResizeHandle className={styles.thumb_area}>
                    <div className={styles.thumb}></div>
                </PanelResizeHandle>

                {/* 右側のパネル */}
                <Panel defaultSize={60} minSize={20}>
                    {bottomContent}
                </Panel>
            </PanelGroup>
        </div>
    );
}