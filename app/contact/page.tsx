import ScreenLayout, { ArticleArea } from "@/components/ScreenLayout/ScreenLayout";
import { Metadata } from "next";
import styles from './Contact.module.css';

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact the creator for support.",
};

export default function Screen() {
    return (
        <ScreenLayout tabIndex={4}>
            <ArticleArea>
                <h2>Contact</h2>

                {/* Feedback Section */}
                <h3>Feedback / Suggestions</h3>
                <p>
                    Thank you for visiting this page. Any comments are welcome in either English or Japanese.
                </p>
                <div className={styles.infoBox}>
                    <ul className={styles.contactList}>

                        {/* Creator Name */}
                        <li className={styles.listItem}>
                            <strong className={styles.label}>Creator:</strong>
                            <span className={styles.creatorName}>Jzurde</span>
                        </li>

                        {/* Email */}
                        <li className={styles.listItem}>
                            <strong className={styles.label}>Email:</strong>
                            <a href="mailto:contact@jzurde.jp" className={styles.contactLink}>
                                contact@jzurde.jp
                            </a>
                        </li>

                        {/* X (Twitter) */}
                        <li className={styles.listItem}>
                            <strong className={styles.label}>X:</strong>
                            <a href="https://x.com/Jzurde_" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                @Jzurde_
                            </a>
                        </li>

                        {/* Website */}
                        <li className={styles.websiteItem}>
                            <strong className={styles.label}>Website:</strong>
                            <a href="https://www.jzurde.jp/contact" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                https://www.jzurde.jp/contact
                            </a>
                        </li>

                        {/* Note for Japanese Website */}
                        <li className={styles.noteItem}>
                            <small className={styles.noteText}>
                                (Note: The website content is available in Japanese only)
                            </small>
                        </li>

                    </ul>
                </div>

                {/* Contributions Section (New!) */}
                <h3>Contributions</h3>
                <p>
                    Chronos is an open-source project. Bug reports, feature requests, and pull requests are highly appreciated.
                </p>

                <div className={styles.githubContainer}>
                    <a
                        href="https://github.com/Jzurde/chronos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubButton}
                    >
                        {/* GitHub Icon (SVG) - Optional but looks good */}
                        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        Visit GitHub Repository
                    </a>
                </div>
            </ArticleArea>
        </ScreenLayout>
    )
}