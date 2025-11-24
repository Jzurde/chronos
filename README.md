# Chronos
An interactive Gantt chart visualization tool for RISC-V cycle-accurate simulation logs. Analyze latency, detect memory stalls, and optimize custom instructions overhead.

![](./public/eyecatch-2.png)

## What is Chronos?
**Chronos** is a web-based profiling and visualization tool designed specifically for `RISC-V` custom instruction development and cycle-accurate simulator analysis.

While standard waveforms (like `.vcd`) are excellent for debugging signals, they are often too granular for performance tuning. Chronos bridges the gap between hardware simulation and software profiling by converting cycle logs into an interactive Gantt chart. This allows developers to instantly visualize instruction latency, memory stalls, and software overheads.

## Key Features

- **Cycle-Accurate Visualization**: Maps every execution cycle to a visual timeline, preserving the exact duration of custom instructions.
- **Stall Analysis**: Distinguishes between active execution (`EXEC`) and pipeline stalls (`STALL`), helping you identify memory bottlenecks immediately.
- **Overhead Detection**: Automatically detects "Gaps" between custom instructions. These gaps reveal hidden software overheads (such as loop control, branching, or compiler inefficiencies) that are often invisible in standard hardware simulations.
- **Zero-Setup**: Runs entirely in the browser using text-based log input. No installation or complex environment configuration is required.

## Use Cases
- **Custom Extension Profiling**: optimizing the latency of new `RISC-V` instructions (e.g., Matrix acceleration).
- **`HLS` (High-Level Synthesis) Verification**: confirming that synthesized hardware behaves with the expected throughput and latency.
- **Compiler Optimization**: measuring the ratio of useful computation time versus control flow overhead.

## How to Use
- **Chronos**: [https://chronos.jzurde.jp](https://chronos.jzurde.jp)
- **Full Documentaion**
  - [Getting Started](https://chronos.jzurde.jp/getting_started)
  - [Output Log](https://chronos.jzurde.jp/format)
  - [Analyze Log](https://chronos.jzurde.jp/screen)