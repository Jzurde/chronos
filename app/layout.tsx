import type { Metadata } from "next";
import { Noto_Sans, Cascadia_Code } from 'next/font/google'
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Chronos",
  description: "Innovative RISC-V CInst Profiler",
};

const NotoSans = Noto_Sans({
  weight: ["800", "500"],
  subsets: ["latin"]
});
// const CascadiaCode = Cascadia_Code({
//   weight: ["700", "400"],
//   subsets: ["latin"]
// });
// ${ CascadiaCode.className }

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
