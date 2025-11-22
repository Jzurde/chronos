import { TimeBlockColor } from "./types";

const readableColors: string[] = [
    "#F48FB1", // ピンク (画像1段目風)
    "#4DB6AC", // ミントグリーン/ティール
    "#9575CD", // 薄紫 (画像2段目風)
    "#FFB74D", // オレンジ (画像3段目風)
    "#81C784", // 薄緑 (画像4段目風)
    "#64B5F6", // 水色 (画像5段目風)
    "#FFD54F", // クリームイエロー
    "#BA68C8", // ラベンダーピンク
    "#A1887F", // モカブラウン (落ち着いたアクセント)
    "#90A4AE", // ブルーグレー (クールなアクセント)
    // "#1976D2", // 濃いブルー (Blue 700)
    // "#388E3C", // 濃いグリーン (Green 700)
    // "#D32F2F", // 濃いレッド (Red 700)
    // "#F57C00", // オレンジ (Orange 700)
    // "#7B1FA2", // パープル (Purple 700)
    // "#0097A7", // シアン/ティール (Cyan 700) - 蛍光より落ち着いた色
    // "#C2185B", // ピンク/マゼンタ (Pink 700)
    // "#FBC02D", // イエロー/ゴールド (Yellow 700) - 白背景でも見える黄色
    // "#5D4037", // ブラウン (Brown 700)
    // "#455A64", // ブルーグレー (Blue Grey 700)
];

export function generateColor(
    colorDictionary: TimeBlockColor[]
) {
    let assignedColor: string;
    if (colorDictionary.length < readableColors.length) {
        assignedColor = readableColors[colorDictionary.length];
    }
    else {
        const h = Math.floor(Math.random() * 360);
        const s = 70; // 彩度 MAX
        const l = 80;  // 輝度 高め（白に近い明るさ）
        assignedColor = `hsl(${h}, ${s}%, ${l}%)`;
    }
    return assignedColor;
}