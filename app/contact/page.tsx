import ScreenLayout, { ArticleArea, BC } from "@/components/ScreenLayout/ScreenLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact the creator for support",
};

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