import React from 'react';
import styles from './ScreenLayout.module.css'
import Header from '../Header/Header';
import ScrollableView from '../ScrollableView/ScrollableView';
import { Cascadia_Code } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { DOMNode, domToReact } from 'html-react-parser';

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function ScreenLayout(
    { children, tabIndex }
        : { children: React.ReactNode; tabIndex: number; }
) {
    return (
        <div className={styles.container}>
            <Header selectedPage={tabIndex} />
            <div className={styles.page}>
                {children}
            </div>
        </div>
    )
}

export function ArticleArea(
    { children }
        : { children: React.ReactNode; }
) {
    return (
        <div className={styles.wrapper}>
            <ScrollableView>
                <div className={`${styles.article_area} article_area`}>
                    {children}
                </div>
            </ScrollableView>
        </div>
    )
}

export function BC(
    { children }
        : { children: React.ReactNode; }
) {
    return (
        <span className={`${styles.bc} ${CascadiaCode.className}`}>
            {children}
        </span>
    )
}