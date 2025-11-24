import ScreenLayout, { ArticleArea, BC } from "@/components/ScreenLayout/ScreenLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Getting Started",
    description: "Learn how to format simulation logs and use Chronos effectively.",
};

export default function GettingStarted() {
    return (
        <ScreenLayout tabIndex={1}>
            <ArticleArea>
                <h2>Getting Started</h2>
                <h3>What is Chronos?</h3>
                <p><b>Chronos</b> is a web-based profiling and visualization tool designed specifically for <BC>RISC-V</BC> custom instruction development and cycle-accurate simulator analysis.</p>
                <p>While standard waveforms (like <BC>.vcd</BC>) are excellent for debugging signals, they are often too granular for performance tuning. Chronos bridges the gap between hardware simulation and software profiling by converting cycle logs into an interactive Gantt chart. This allows developers to instantly visualize instruction latency, memory stalls, and software overheads.</p>

                <h3>Key Features</h3>
                <ul>
                    <li>
                        <b>Cycle-Accurate Visualization</b>: Maps every execution cycle to a visual timeline, preserving the exact duration of custom instructions.
                    </li>
                    <li>
                        <b>Stall Analysis</b>: Distinguishes between active execution (<BC>EXEC</BC>) and pipeline stalls (<BC>STALL</BC>), helping you identify memory bottlenecks immediately.
                    </li>
                    <li>
                        <b>Overhead Detection</b>: Automatically detects "Gaps" between custom instructions. These gaps reveal hidden software overheads (such as loop control, branching, or compiler inefficiencies) that are often invisible in standard hardware simulations.
                    </li>
                    <li>
                        <b>Zero-Setup</b>: Runs entirely in the browser using text-based log input. No installation or complex environment configuration is required.
                    </li>
                </ul>

                <h3>Use Cases</h3>
                <ul>
                    <li>
                        <b>Custom Extension Profiling</b>: optimizing the latency of new <BC>RISC-V</BC> instructions (e.g., Matrix acceleration).
                    </li>
                    <li>
                        <b><BC>HLS</BC> (High-Level Synthesis) Verification</b>: confirming that synthesized hardware behaves with the expected throughput and latency.
                    </li>
                    <li>
                        <b>Compiler Optimization</b>: measuring the ratio of useful computation time versus control flow overhead.
                    </li>
                </ul>
            </ArticleArea>
        </ScreenLayout>
    )
}