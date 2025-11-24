import Tools from "@/components/Page/Tools/Tools";
import styles from './page.module.css';
import Header from "@/components/Header/Header";
import ScreenLayout from "@/components/ScreenLayout/ScreenLayout";

export default function Home() {
    return (
        <ScreenLayout tabIndex={0}>
            <Tools />
        </ScreenLayout>
    )
}