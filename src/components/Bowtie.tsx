// The "bowtie" diagram: wide on both ends, narrow in the middle.
// It's one SVG drawn on a 1192 x 305 grid (the viewBox). The SVG scales to
// fit its container, so all the numbers below are in that grid's units.
//
// On phones the diagram would be too small to read, so we show a simple
// list instead (see the bottom of this file).

import { LogoMark } from "./Logo";

const W = 1192; // total width
const H = 305; // total height
const SIDE = 177; // width of each outer column
const MID_TOP = 94; // where the narrow middle starts (top)
const MID_LEFT = SIDE * 3; // x where the middle box starts (531)
const MID_RIGHT = W - SIDE * 3; // x where the middle box ends (661)

// The slanted edge: how far down the top line is at position x.
function edgeY(x: number) {
  return (MID_TOP * x) / MID_LEFT;
}

const leftStages = [["Qualify"], ["Inspect"], ["Forecast"]];
const rightStages = [["Onboard", "& Adopt"], ["Value", "Realization"], ["Renew", "& Expand"]];

// One column of the bowtie (a 4-sided shape) with its label.
function Column({ x1, x2, lines, flip }: { x1: number; x2: number; lines: string[]; flip?: boolean }) {
  // On the right side the edge slopes the other way, so we mirror x.
  const y1 = edgeY(flip ? W - x1 : x1);
  const y2 = edgeY(flip ? W - x2 : x2);
  const points = `${x1},${y1} ${x2},${y2} ${x2},${H - y2} ${x1},${H - y1}`;
  const cx = (x1 + x2) / 2;

  return (
    <g className="group cursor-default">
      <polygon points={points} className="fill-transparent transition group-hover:fill-white/5" />
      <text
        x={cx}
        y={H / 2 - (lines.length - 1) * 11}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-zinc-400 text-[19px] transition group-hover:fill-white"
      >
        {lines.map((line, i) => (
          <tspan key={line} x={cx} dy={i === 0 ? 0 : 23}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function Bowtie() {
  const outline = [
    [0, 0], [MID_LEFT, MID_TOP], [MID_RIGHT, MID_TOP], [W, 0],
    [W, H], [MID_RIGHT, H - MID_TOP], [MID_LEFT, H - MID_TOP], [0, H],
  ].map((p) => p.join(",")).join(" ");

  return (
    <>
      {/* Desktop / tablet: the full bowtie */}
      <svg viewBox={`-2 -2 ${W + 4} ${H + 4}`} className="mx-auto mt-16 hidden w-full max-w-5xl md:block">
        <defs>
          <linearGradient id="bow-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f1f1f" />
            <stop offset="1" stopColor="#0c0c0c" />
          </linearGradient>
          <linearGradient id="bow-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#52525b" />
            <stop offset="1" stopColor="#22c55e" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Background shape */}
        <polygon points={outline} fill="url(#bow-fill)" stroke="url(#bow-stroke)" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Left 3 columns and right 3 columns */}
        {leftStages.map((lines, i) => (
          <Column key={lines[0]} x1={i * SIDE} x2={(i + 1) * SIDE} lines={lines} />
        ))}
        {rightStages.map((lines, i) => (
          <Column key={lines[0]} x1={MID_RIGHT + i * SIDE} x2={MID_RIGHT + (i + 1) * SIDE} lines={lines} flip />
        ))}

        {/* Faint divider lines between columns */}
        {[1, 2, 3].map((i) => {
          const xl = i * SIDE;
          const xr = W - i * SIDE;
          return (
            <g key={i} stroke="white" strokeOpacity="0.06">
              <line x1={xl} y1={edgeY(xl)} x2={xl} y2={H - edgeY(xl)} />
              <line x1={xr} y1={edgeY(xl)} x2={xr} y2={H - edgeY(xl)} />
            </g>
          );
        })}

        {/* Middle box with the logo */}
        <rect x={MID_LEFT} y={MID_TOP} width={MID_RIGHT - MID_LEFT} height={H - MID_TOP * 2} fill="#0a0a0a" stroke="white" strokeOpacity="0.08" />
        <svg x={W / 2 - 26} y={H / 2 - 26} width="52" height="52">
          <LogoMark className="h-full w-full" />
        </svg>
      </svg>

      {/* Phones: a simple list of the same stages */}
      <ul className="mx-auto mt-12 grid max-w-sm grid-cols-2 gap-2 text-sm text-zinc-300 md:hidden">
        {[...leftStages, ...rightStages].map((lines) => (
          <li key={lines[0]} className="border border-white/10 bg-white/[0.03] px-3 py-3 text-center">
            {lines.join(" ")}
          </li>
        ))}
      </ul>
    </>
  );
}
