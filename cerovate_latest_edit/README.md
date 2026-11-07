# CEROVATE — 3D Guided Experience

## Run locally

1. Install Node.js 18 or newer.
2. Extract the ZIP. Open the extracted **CEROVATE** folder (the one containing `package.json`) in VS Code.
3. Open Terminal → New Terminal. Confirm the terminal is in the same folder as `package.json`.
4. Run `npm start` (no `npm install` is needed).
5. Open `http://localhost:3000`.

No npm dependencies are required. Search uses the Wikipedia public API and the NASA image API through the local server. Network access is required for live search. Without `OPENAI_API_KEY`, the robot chat runs in its clearly labelled starter mode; add the key to a local `.env` file to enable open-ended AI chat.

## What changed

- Cero greets visitors once on first load, then stays small and parked in the bottom corner.
- Cero's arms do not wave and the robot no longer follows the mouse.
- Every 10 seconds, Cero's head peeks from a different screen edge and position.
- A visible **3D** navigation item takes visitors directly to the 3D Explorer.
- The explorer accepts one search or two searches; two results appear side by side.
- Search result previews can be dragged to rotate. These are interactive 3D-style visual previews, not scientific 3D meshes or measured terrain models.
- Fixed a front-end JavaScript error that prevented the page scripts from finishing initialization.

## Important limitation

The current search service retrieves encyclopedia summaries and available thumbnails. It does not download verified 3D geometry. The circular depth-styled preview is an interactive visual treatment of the retrieved image; do not present it as a scientifically accurate 3D model.


## CEROVATE update — Cero + separate comparisons
- Cero now appears larger for the welcome moment, with a larger greeting bubble that fades after the initial visit. His arms stay down and spaced apart; two separated legs replace the clustered wheel feet in the floating sidekick.
- The edge-head peek remains a separate animation that runs every 10 seconds.
- The 3D explorer remains under the 3D section. A separate **Text Compare** section performs a normal side-by-side text comparison without 3D previews.
- Search now uses the Wikimedia MediaWiki search API and page details API. The server must have outbound internet/DNS access for arbitrary live searches and NASA image search. If live search is offline, recognized Solar System objects (Earth, Moon, Mars, Mercury, Venus, Jupiter, Saturn, Sun, Pluto) use clearly labelled built-in NASA topic references; unknown terms return an explicit connection error instead of fake results.
- Verification in this environment: JavaScript syntax checks passed; `/api/place-search` successfully returned the offline Mars/Moon fallback; `/api/compare-text` successfully returned Earth/Mars text results. External DNS was unavailable here, so arbitrary live lookups and NASA image API calls could not be verified in this runtime.

## Latest interaction update
- Intro choreography: Cero enters gently first, the greeting appears afterward, then both fade away together. A smaller Cero returns once in the lower corner with “How can I help you?” and opens the chat when clicked.
- NASA image galleries are requested for each destination shown in 3D search and standard text comparison. Space-related chat questions also attempt to show NASA mission photos inline. Image tiles link to the original NASA image-library record. Live NASA imagery requires an internet connection; failures are shown rather than replaced with fabricated photos.
- Background stars gently twinkle at different rates.
