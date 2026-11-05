// Shared drawing for the Open Graph and Twitter preview images.
// Uses only the dark-theme tokens and the display font.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = site.title;

export async function renderOgImage() {
  const font = await readFile(join(process.cwd(), "src/assets/FamiljenGrotesk-SemiBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0F1012",
          color: "#ECEAE6",
          fontFamily: "Familjen Grotesk",
        }}
      >
        <div style={{ fontSize: 32, color: "#8D9097" }}>{site.name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 72, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          {hero.headline}&nbsp;<span style={{ color: "#E2A34B" }}>{hero.accentWord}.</span>
        </div>
        <div style={{ fontSize: 32, color: "#8D9097" }}>{site.role}</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Familjen Grotesk", data: font, weight: 600, style: "normal" }],
    },
  );
}
