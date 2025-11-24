import ScreenLayout, { ArticleArea, BC } from "@/components/ScreenLayout/ScreenLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Screen",
    description: "Learn how to format simulation logs and use Chronos effectively.",
};

export default function Screen() {
    return (
        <ScreenLayout tabIndex={3}>
            <ArticleArea>
                <h2>Screen</h2>
                <p>Writing this page, RIGHT NOW!</p>
            </ArticleArea>
        </ScreenLayout>
    )
}