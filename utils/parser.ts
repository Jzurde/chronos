import { LogStatus, RawLog, TimeBlock } from "./types";

export function parseChronosLogs(logText: string): TimeBlock[] {
    const lines = logText.split('\n');

    const rawLogs: RawLog[] = parseLogstoRawLog(lines);
    const timeBlock: TimeBlock[] = parseRawLogtoTimelineBlock(rawLogs);

    return timeBlock
}

export function parseLogstoRawLog(lines: string[]): RawLog[] {
    const logRegex = /^\[ChronosLog\]\s+(\d+)\s+(\S+)\s+(\S+)(?:\s+(.*))?$/;
    const rawLogs: RawLog[] = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        const match = trimmedLine.match(logRegex);

        if (!match) return;

        rawLogs.push({
            cycle: parseInt(match[1]),
            opName: match[2],
            status: match[3] as LogStatus,
            info: match[4] || ""
        });
    });

    return rawLogs
}

export function parseRawLogtoTimelineBlock(rawLogs: RawLog[]): TimeBlock[] {
    const blocks: TimeBlock[] = [];
    let currentOp: TimeBlock | null = null;
    let lastEndCycle = -1;

    const commitBlock = (block: TimeBlock) => {
        block.duration = block.endCycle - block.startCycle + 1;
        blocks.push(block);
    };

    rawLogs.forEach((log, index) => {
        if (lastEndCycle === -1) lastEndCycle = log.cycle - 1;

        const isGap = log.cycle > lastEndCycle + 1;
        const isDifferentOp = currentOp && currentOp.opName !== log.opName;

        if (currentOp && (isGap || isDifferentOp)) {
            commitBlock(currentOp);
            currentOp = null;
        }

        if (isGap) {
            blocks.push({
                id: `gap-${index}`,
                opName: 'Overhead',
                startCycle: lastEndCycle + 1,
                endCycle: log.cycle - 1,
                duration: (log.cycle - 1) - (lastEndCycle + 1) + 1,
                type: 'GAP',
            });
        }

        if (!currentOp) {
            currentOp = {
                id: `op-${index}`,
                opName: log.opName,
                startCycle: log.cycle,
                endCycle: log.cycle,
                duration: 1,
                type: 'INSTRUCTION',
                details: [log]
            };
        } else {
            currentOp.endCycle = log.cycle;
            if (currentOp.details) currentOp.details.push(log);
        }
        if (log.status === 'DONE') {
            if (currentOp) {
                commitBlock(currentOp);
                currentOp = null;
            }
        }
        lastEndCycle = log.cycle;
    });
    if (currentOp) {
        commitBlock(currentOp);
    }

    return blocks;
    // const blocks: TimeBlock[] = [];
    // let currentOp: Partial<TimeBlock> | null = null;
    // let lastEndCycle = -1;

    // rawLogs.forEach((log, index) => {
    //     if (lastEndCycle === -1) lastEndCycle = log.cycle - 1;

    //     if (log.cycle > lastEndCycle + 1 && currentOp === null) {
    //         blocks.push({
    //             id: `gap-${index}`,
    //             opName: 'Overhead',
    //             startCycle: lastEndCycle + 1,
    //             endCycle: log.cycle - 1,
    //             duration: (log.cycle - 1) - (lastEndCycle + 1) + 1,
    //             type: 'GAP'
    //         });
    //     }

    //     if (!currentOp) {
    //         currentOp = {
    //             id: `op-${index}`,
    //             opName: log.opName,
    //             startCycle: log.cycle,
    //             endCycle: log.cycle,
    //             type: 'INSTRUCTION',
    //             details: [log]
    //         };
    //     }
    //     else {
    //         currentOp.endCycle = log.cycle;
    //         currentOp.details?.push(log);
    //     }

    //     if (log.status === 'DONE') {
    //         if (currentOp) {
    //             blocks.push({
    //                 ...currentOp,
    //                 duration: currentOp.endCycle! - currentOp.startCycle! + 1
    //             } as TimeBlock);

    //             lastEndCycle = currentOp.endCycle!;
    //             currentOp = null;
    //         }
    //     }
    //     else {
    //         lastEndCycle = log.cycle;
    //     }
    // });

    // return blocks;
}