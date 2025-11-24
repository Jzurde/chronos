import { TwoColumn } from "@/components/Layout/Layout";
import ScreenLayout, { ArticleArea, BC } from "@/components/ScreenLayout/ScreenLayout";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Analyze Log",
    description: "Learn how to format simulation logs and use Chronos effectively.",
};

export default function Screen() {
    return (
        <ScreenLayout tabIndex={3}>
            <ArticleArea>
                <h2>Analyze Log</h2>
                <p>This section guides you through the process of visualizing your simulation logs, from creating a workspace to inspecting detailed instruction metrics.</p>

                <h3>Step 1: Create a Data Block</h3>
                <p>When you first open Chronos, the dashboard is empty. You need to create a container for your logs.</p>
                <TwoColumn
                    left={
                        <Image
                            className="screenshots"
                            src='/screenshots/1.png'
                            width={1268}
                            height={769}
                            alt="clicking add button"
                        />
                    }
                    right={
                        <Image
                            className="screenshots"
                            src='/screenshots/2.png'
                            width={1268}
                            height={769}
                            alt="clicking add button"
                        />
                    }
                    minwidth={500}
                />

                <ol>
                    <li>Navigate to the top-right corner of the dashboard.</li>
                    <li>Click the <BC>+ Add</BC> button.</li>
                    <li>Type in a label for this data.</li>
                    <li>A new "Data Block" will appear in the main workspace. This block represents a single simulation run or a specific trace segment.</li>
                </ol>

                <h3>Step 2: Input Simulation Logs</h3>
                <p>Next, feed your raw simulation logs into the Data Block.</p>
                <TwoColumn
                    left={
                        <Image
                            className="screenshots"
                            src='/screenshots/3.png'
                            width={1268}
                            height={769}
                            alt="clicking add button"
                        />
                    }
                    right={
                        <Image
                            className="screenshots"
                            src='/screenshots/4.png'
                            width={1268}
                            height={769}
                            alt="clicking add button"
                        />
                    }
                    minwidth={500}
                />
                <ol>
                    <li>Locate the header of your new Data Block.</li>
                    <li>Click the <BC>Input ChronosLog</BC> button.</li>
                    <li>A text input field will expand.</li>
                    <li><b>Paste</b> your formatted logs (starting with <BC>[ChronosLog]</BC>) into this area.</li>
                </ol>

                <h3>Step 3: Generate Visualization</h3>
                <p>Once the logs are pasted:</p>
                <ol>
                    <li>Click the <BC>Analyze</BC> button below the text area.</li>
                    <li>Chronos will instantly parse the data. The timeline (Gantt chart) will be rendered, displaying the execution flow of your custom instructions.</li>
                </ol>

                <h2>Interactive Features</h2>
                <h3>Zoom & Navigation</h3>
                <p>You can adjust the time scale to view the entire execution flow or focus on specific clock cycles.</p>
                <TwoColumn
                    left={
                        <Image
                            className="screenshots"
                            src='/screenshots/5.png'
                            width={1268}
                            height={769}
                            alt="clicking add button"
                        />
                    }
                    minwidth={500}
                />
                <ul>
                    <li><b>Zoom Controls</b>: Use the zoom buttons (or slider) to change the pixel-per-cycle ratio.</li>
                    <ul>
                        <li><b>Zoom In</b>: To see individual cycle gaps and short stalls.</li>
                        <li><b>Zoom Out</b>: To get a high-level overview of long-running processes.</li>
                    </ul>
                </ul>

                <h3>Inspector Panel (Detailed Metrics)</h3>
                <p>To analyze the performance of a specific instruction:</p>
                <TwoColumn
                    left={
                        <Image
                            className="screenshots"
                            src='/screenshots/6.png'
                            width={1268}
                            height={769}
                            alt="clicking add button"
                        />
                    }
                    minwidth={500}
                />
                <ol>
                    <li><b>Click</b> on any colored block (Instruction Ribbon) within the timeline.</li>
                    <li>The <b>Inspector Panel</b> will open (typically on the bottom half).</li>
                    <li>Here you can view critical metrics such as:</li>
                    <ul>
                        <li><b>Overall Cycles</b>: Total duration of the instruction.</li>
                        <li><b>Efficiency Rate</b>: The ratio of active execution (<BC>EXEC</BC>) versus memory stalls (<BC>STALL</BC>).</li>
                        <li><b>Context</b>: Cycle gaps before and after the instruction (Software Overhead).</li>
                        <li><b>Raw Data</b>: Detailed attributes like memory addresses or burst sizes.</li>
                    </ul>
                </ol>

                <h3>Comparing Multiple Traces</h3>
                <p>Chronos supports displaying multiple time charts simultaneously. This is ideal for comparing performance before and after optimizations (e.g., "v1" vs "v2") or analyzing different simulation scenarios side-by-side.</p>
                <TwoColumn
                    left={
                        <Image
                            className="screenshots"
                            src='/screenshots/7.png'
                            width={1268}
                            height={769}
                            alt="clicking add button"
                        />
                    }
                    minwidth={500}
                />
                <ol>
                    <li>While a timeline is already displayed, click the <BC>+ Add</BC> button again.</li>
                    <li>A new Data Block will appear below the existing one.</li>
                    <li>Input a different set of logs into the new block and click <BC>Analyze</BC>.</li>
                    <li>You can now visually compare the execution flows, latencies, and gaps between the two traces on the same screen.</li>
                </ol>
            </ArticleArea>
        </ScreenLayout>
    )
}