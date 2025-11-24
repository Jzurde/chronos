'use client'

import Image from 'next/image'
import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleQuestion, faCode, faFire, faFlagCheckered, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { TabButton } from '../TabView/TabView'
import Link from 'next/link'

export default function Header(
    { selectedPage }
        : { selectedPage: number }
) {
    return (
        <div className={styles.header}>
            <Image
                width={45}
                height={45}
                src="/symbol.png"
                className={styles.symbol}
                alt='Logo' />
            <div className={styles.placeholder}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={styles.gray_out}></div>
            <div className={styles.header_main}>
                <Image
                    className={styles.logo}
                    width={430}
                    height={138}
                    src="/full-in-steps.png"
                    alt='Logo' />
                <div className={styles.header_menu}>
                    <h3>Tools</h3>
                    <Link href='/'>
                        <TabButton
                            func={() => { }}
                            icon={faFire}
                            title='Timechart'
                            isSelected={selectedPage === 0}
                        />
                    </Link>
                    <h3>Documents</h3>
                    <Link
                        target={(selectedPage === 0) ? "_blank" : ""}
                        href='/getting_started'>
                        <TabButton
                            func={() => { }}
                            icon={faFlagCheckered}
                            title='Getting Started'
                            isSelected={selectedPage === 1}
                        />
                    </Link>

                    <Link
                        target={(selectedPage === 0) ? "_blank" : ""}
                        href='/format'>
                        <TabButton
                            func={() => { }}
                            icon={faCode}
                            title='Output Log'
                            isSelected={selectedPage === 2}
                        />
                    </Link>

                    <Link
                        target={(selectedPage === 0) ? "_blank" : ""}
                        href='/screen'>
                        <TabButton
                            func={() => { }}
                            icon={faHandPointer}
                            title='Analyze Log'
                            isSelected={selectedPage === 3}
                        />
                    </Link>
                    <h3>Support</h3>

                    <Link
                        target={(selectedPage === 0) ? "_blank" : ""}
                        href='/contact'>
                        <TabButton
                            func={() => { }}
                            icon={faCircleQuestion}
                            title='Contact'
                            isSelected={selectedPage === 4}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}