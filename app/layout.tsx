import type { Metadata } from "next";
import { Noto_Sans, Cascadia_Code } from 'next/font/google'
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;

// export const metadata: Metadata = {
//   title: "Chronos",
//   description: "Innovative RISC-V CInst Profiler",
// };

const NotoSans = Noto_Sans({
  weight: ["800", "500"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default: "Chronos - RISC-V Cycle Profiler & Visualizer",
    template: "%s | Chronos",
  },
  description: "An interactive Gantt chart visualization tool for RISC-V cycle-accurate simulation logs. Analyze latency, detect memory stalls, and optimize custom instructions overhead.",

  keywords: [
    "RISC-V",
    "Profiler",
    "Cycle Accurate Simulator",
    "Visualization",
    "Gantt Chart",
    "Performance Tuning",
    "HLS",
    "Custom Instruction",
  ],

  authors: [{ name: "Jzurde" }],
  creator: "Jzurde",

  openGraph: {
    type: "website",
    locale: "en_JP",
    url: "https://chronos.jzurde.jp",
    title: "Chronos - RISC-V Cycle Profiler",
    description: "Visualize hardware simulation logs instantly. Detect stalls and optimize execution cycles.",
    siteName: "Chronos",
    images: [
      {
        url: "/eyecatch-2.png",
        width: 1200,
        height: 630,
        alt: "Chronos Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Chronos - RISC-V Cycle Profiler",
    description: "Interactive visualization for RISC-V simulation logs.",
    images: ["/eyecatch-2.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NotoSans.className}`}>
        {children}
      </body>
    </html>
  );
}
