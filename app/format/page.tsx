import CodeBlock from "@/components/Page/Documents/CodeBlock/CodeBlock";
import ScreenLayout, { ArticleArea, BC } from "@/components/ScreenLayout/ScreenLayout";

export default function Format() {
    const formatExample = `[ChronosLog]  <Cycle>  <OpName>  <Status>  <OptionalInfo>`;
    const cCodeExample = `// Example logic inside your simulator's step function
void step_custom_instruction() {
    // 1. Check if the instruction is finished
    if (is_finished) {
        printf("[ChronosLog]\\t%d\\t%s\\tDONE\\n", current_cycle, "my_custom_op");
        return;
    }

    // 2. Check if the instruction is stalled (e.g., waiting for memory)
    if (is_memory_stalled) {
        printf("[ChronosLog]\\t%d\\t%s\\tSTALL\\twaiting_mem\\n", current_cycle, "my_custom_op");
        return;
    }

    // 3. Otherwise, it is executing
    printf("[ChronosLog]\\t%d\\t%s\\tEXEC\\n", current_cycle, "my_custom_op");
}`;
    const outputExample = `[ChronosLog]    100    conv2d    EXEC
[ChronosLog]    101    conv2d    STALL    addr=0xFF00
[ChronosLog]    102    conv2d    STALL
[ChronosLog]    103    conv2d    DONE     result=42`;
    return (
        <ScreenLayout tabIndex={2}>
            <ArticleArea>
                <h2>Format</h2>
                <p>To visualize your simulation in Chronos, your simulator must output logs in a specific format via standard output (stdout) or a text file.</p>

                <h3>Basic Syntax</h3>
                <p>Chronos parses lines that start with the <BC>[ChronosLog]</BC> prefix. Lines not matching this prefix are ignored. The fields should be separated by whitespace (tabs or spaces).</p>

                <CodeBlock
                    code={formatExample}
                    fileName="PlainText"
                />

                <table>
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                        <tr>
                            <td><b>Prefix</b></td>
                            <td>The literal string <BC>[ChronosLog]</BC>.</td>
                            <td><BC>[ChronosLog]</BC></td>
                        </tr>
                        <tr>
                            <td><b>Cycle</b></td>
                            <td>Current simulation cycle (integer).</td>
                            <td><BC>1024</BC></td>
                        </tr>
                        <tr>
                            <td><b>OpName</b></td>
                            <td>The name of the instruction or function being executed.</td>
                            <td><BC>loadData</BC></td>
                        </tr>
                        <tr>
                            <td><b>Status</b></td>
                            <td>The execution state of the instruction (see below).</td>
                            <td><BC>STALL</BC></td>
                        </tr>
                        <tr>
                            <td><b>Info</b></td>
                            <td>(Optional) Additional context like addresses, data values, or error messages.</td>
                            <td><BC>addr=0x8000</BC></td>
                        </tr>
                    </tbody>
                </table>

                <h3>Status Definitions</h3>
                <p>Chronos uses three distinct statuses to render the timeline. <BC>START</BC> is not required; the tool automatically infers the start of an instruction.</p>
                <h4><BC>EXEC</BC></h4>
                <ul>
                    <li><b>Meaning</b>: The instruction is actively executing logic inside the hardware (e.g., multi-cycle arithmetic).</li>
                    <li><b>Usage</b>: Use this when the instruction occupies the pipeline but is not waiting for external resources.</li>
                </ul>
                <h4><BC>STALL</BC></h4>
                <ul>
                    <li><b>Meaning</b>: The instruction is paused, waiting for external resources (e.g., Memory Load/Store, Bus access).</li>
                    <li><b>Usage</b>: Critical for identifying bottlenecks.</li>
                </ul>
                <h4><BC>DONE</BC></h4>
                <ul>
                    <li><b>Meaning</b>: The instruction completed in this cycle.</li>
                    <li><b>Usage</b>: <b>Mandatory.</b> This signals the end of the block. If an instruction finishes in a single cycle, you can output <BC>DONE</BC> immediately without <BC>EXEC</BC> or <BC>STALL</BC>.</li>
                </ul>

                <h3>The "Continuous Logging" Principle (Important)</h3>
                <p>Chronos relies on a strict rule: <b>"No Log = No Execution."</b></p>
                <ul>
                    <li>You must output a log <b>every cycle</b> while your custom instruction is active.</li>
                    <li>If logs are missing for a range of cycles, Chronos interprets this as a <b>"Gap" (Software Overhead)</b>.</li>
                    <li><b>Do not extrapolate</b>. If your instruction takes 10 cycles, print 10 lines of logs.</li>
                </ul>

                <h3>Example</h3>
                <h4>Implementation Example (C/C++)</h4>
                <p>The following example uses <BC>C</BC> syntax to demonstrate the logging logic.
                    Since the actual implementation depends on your specific simulation environment (e.g., <BC>SystemVerilog testbench</BC>, <BC>C++ wrapper for Verilator</BC>, or <BC>ISS</BC>), please adapt this logic to your language of choice.</p>
                <CodeBlock
                    code={cCodeExample}
                    language="c"
                    fileName="risc-v_custom_step.c"
                />
                <h4>Sample Output</h4>
                <CodeBlock
                    code={outputExample}
                    fileName="standard output"
                />


            </ArticleArea>
        </ScreenLayout>
    )
}