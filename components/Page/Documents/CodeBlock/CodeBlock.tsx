// components/CodeBlock.tsx
"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBlock.module.css'
import { Cascadia_Code } from 'next/font/google';
import { HorizantalPanel } from '@/components/Layout/Layout';
import CustomButton from '@/components/Button/CustomButton';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';

const CascadiaCode = Cascadia_Code({
    weight: ["700", "400"],
    subsets: ["latin"]
});

export default function CodeBlock(
    { code, language = "c", fileName }
        : { code: string; language?: string; fileName?: string; }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HorizantalPanel align='Strech'>
                    <span className={`${styles.code_label} ${CascadiaCode.className}`}>
                        {fileName || language}
                    </span>
                    <CustomButton
                        isTransparent
                        func={handleCopy}
                        icon={(!copied) ? faCopy : faCheck}
                        isSmall
                    />
                </HorizantalPanel>
            </div>

            <SyntaxHighlighter
                language={language}
                style={base16AteliersulphurpoolLight}
                customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.9rem' }}
                showLineNumbers={true}
            >
                {code}
            </SyntaxHighlighter>
        </div >
    );
}