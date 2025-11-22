import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../Button/CustomButton';
import { HorizantalPanel } from '../Layout/Layout';
import style from './LogTextarea.module.css'
import { Cascadia_Code } from 'next/font/google'

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function LogTextarea(
    { textState, textUpdate, textSubmit }
        : { textState: string; textUpdate: (newValue: string) => void; textSubmit: () => void; }
) {
    return (
        <div className={style.container}>
            <textarea
                className={`${style.textarea} ${CascadiaCode.className}`}
                value={textState}
                onChange={(e) => textUpdate(e.target.value)} />
            <HorizantalPanel align='Right'>
                <CustomButton
                    icon={faCheck}
                    title='Analyze'
                    func={textSubmit}
                    isPrimary
                />
            </HorizantalPanel>
        </div>
    )
}