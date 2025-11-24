import ScreenLayout, { ArticleArea, BC } from "@/components/ScreenLayout/ScreenLayout";

export default function Screen() {
    return (
        <ScreenLayout tabIndex={4}>
            <ArticleArea>
                <h2>Contact</h2>
                <p>Writing this page, RIGHT NOW!</p>
            </ArticleArea>
        </ScreenLayout>
    )
}