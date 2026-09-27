import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const source = path.join(dist, "index.html");

const html = fs.readFileSync(source, "utf8");

const routeHtml = html
  .replace(
    /<title>[\s\S]*?<\/title>/,
    "<title>Garden Maintenance in Bhopal | MUNDER</title>"
  )
  .replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    '<meta name="description" content="MUNDER provides professional garden maintenance services in Bhopal for homes, villas, offices, resorts, hotels and schools. Lawn mowing, pruning, hedge trimming, weeding, watering and regular garden care." />'
  )
  .replace(
    /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/>/,
    '<meta name="keywords" content="garden maintenance Bhopal, garden maintenance services Bhopal, gardening services Bhopal, lawn maintenance Bhopal, hedge trimming Bhopal, plant care Bhopal, MUNDER" />'
  )
  .replace(
    /<link rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
    '<link rel="canonical" href="https://munder.in/garden-maintenance-bhopal" />'
  )
  .replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    '<meta property="og:title" content="Garden Maintenance in Bhopal | MUNDER" />'
  )
  .replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    '<meta property="og:description" content="Professional garden maintenance services in Bhopal by MUNDER for homes, villas, offices, resorts, hotels and schools." />'
  )
  .replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
    '<meta property="og:url" content="https://munder.in/garden-maintenance-bhopal" />'
  )
  .replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
    '<meta name="twitter:title" content="Garden Maintenance in Bhopal | MUNDER" />'
  )
  .replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    '<meta name="twitter:description" content="Professional garden maintenance services in Bhopal by MUNDER for homes, villas, offices, resorts, hotels and schools." />'
  );

const routeDir = path.join(dist, "garden-maintenance-bhopal");
fs.mkdirSync(routeDir, { recursive: true });
fs.writeFileSync(path.join(routeDir, "index.html"), routeHtml);

console.log("Created:", path.join(routeDir, "index.html"));
