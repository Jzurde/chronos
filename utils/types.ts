export type LogStatus = 'EXEC' | 'STALL' | 'DONE';

export interface RawLog {
    cycle: number;
    opName: string;
    status: LogStatus;
    info?: string;
}

export interface TimeBlock {
    type: 'INSTRUCTION' | 'GAP';
    id: string;
    opName: string;
    startCycle: number;
    endCycle: number;
    duration: number;
    details?: RawLog[];
}

export interface TimeBlockWrapper {
    blockId: number;
    blockName: string;
    timeBlocks?: TimeBlock[];
}

export interface TimeBlockColor {
    opName: string;
    color: string;
}

export interface FunctionTime {
    opName: string;
    timeTaken: number;
}