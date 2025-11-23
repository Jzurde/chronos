import { SelectedBlock, TimeBlockWrapper } from '@/utils/types';
import styles from './Inspector.module.css'
import { Placeholder } from '@/components/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';

export default function Inspector(
    { datas, selectedBlock }
        : { datas: TimeBlockWrapper[]; selectedBlock?: SelectedBlock }
) {
    const targetWrapper = datas.find(data => data.blockId === selectedBlock?.wrapperId);
    if (!targetWrapper) return (
        <Placeholder>
            <FontAwesomeIcon icon={faHandPointer} size="2x" />
            <p>Select block from timeline</p>
        </Placeholder>
    )
    const selectedBlockData
        = targetWrapper.timeBlocks?.find(block => block.id === selectedBlock?.blockId);
    if (!selectedBlockData) return (
        <Placeholder>
            <FontAwesomeIcon icon={faHandPointer} size="2x" />
            <p>Select block from timeline</p>
        </Placeholder>
    )
    return (
        <div>
            <span>{selectedBlockData.opName}</span>
            <span>{selectedBlockData.id}</span>
            <span>{selectedBlockData.duration}</span>
        </div>
    )
}