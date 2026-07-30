import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();
const eventsPath = join(projectRoot, "content", "hiraad-facebook-events.json");
const imageManifestPath = join(projectRoot, "content", "hiraad-facebook-event-images.json");
const eventImageRoot = join(projectRoot, "public", "images", "events", "facebook");
const imagePattern = /\.(avif|gif|jpe?g|png|webp)$/i;

const events = JSON.parse(readFileSync(eventsPath, "utf8"));
const imageManifest = JSON.parse(readFileSync(imageManifestPath, "utf8"));
const manifestBySlug = new Map(imageManifest.events.map((entry) => [entry.slug, entry]));
const seenSlugs = new Set();
const issues = [];
let imageCount = 0;

for (const event of events) {
  const slug = event?.slug?.current;

  if (!slug) {
    issues.push(`Event "${event?.title ?? "Untitled"}" is missing a slug.`);
    continue;
  }

  if (seenSlugs.has(slug)) {
    issues.push(`Duplicate event slug: ${slug}`);
  }
  seenSlugs.add(slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date) || Number.isNaN(Date.parse(`${event.date}T00:00:00Z`))) {
    issues.push(`${slug} has an invalid date: ${event.date}`);
  }

  if (event.sourceUrl && !/^https:\/\//.test(event.sourceUrl)) {
    issues.push(`${slug} must use an HTTPS source URL.`);
  }

  const imageDirectory = join(eventImageRoot, slug);
  const images = existsSync(imageDirectory)
    ? readdirSync(imageDirectory).filter((file) => imagePattern.test(file))
    : [];

  if (!images.length) {
    issues.push(`${slug} has no local event images.`);
  }
  imageCount += images.length;

  const manifestEntry = manifestBySlug.get(slug);
  if (!manifestEntry) {
    issues.push(`${slug} is missing from hiraad-facebook-event-images.json.`);
  } else if (manifestEntry.imageCount !== images.length) {
    issues.push(
      `${slug} declares ${manifestEntry.imageCount} image(s), but ${images.length} exist on disk.`
    );
  }
}

for (const slug of manifestBySlug.keys()) {
  if (!seenSlugs.has(slug)) {
    issues.push(`Image manifest contains an event that is not in the event catalog: ${slug}`);
  }
}

if (issues.length) {
  console.error(`Content validation failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Validated ${events.length} event records and ${imageCount} local event images.`);
