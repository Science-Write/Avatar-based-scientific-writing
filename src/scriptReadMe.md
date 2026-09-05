# Avatar-based Scientific Writing
## Script Documentation v2.0

---

# 1. Project Overview

This project is a WorkAdventure-based learning environment for avatar-based scientific writing.

The world combines:

- WorkAdventure maps
- TypeScript map scripts
- H5P learning materials
- NPC dialogue areas
- quest progression
- player tracking
- area tracking
- bot communication tracking
- workbook completion tracking
- Moodle code generation
- Google Sheets / TaskMagic automation
- NPC sound effects
- final challenge logic

The goal is to create an interactive learning world where students move through different modules, complete learning materials, talk to NPCs, interact with bots and other players, and generate learning analytics in the background.

---

# 2. Repository Structure

```text
science-write-avatar-based-scientific-writing/
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── H5P/
│   │   ├── keypad.html
│   │   └── test-activity.html
│   └── scripts/
│       ├── completionEventScript(pre tracking).js
│       ├── completionEventScript.js
│       ├── completionM2MCodeEventScript.js
│       ├── completionM3MCodeEventScript.js
│       ├── completionM4MCodeEventScript.js
│       └── trackBook.js
├── src/
│   ├── botTracking.ts
│   ├── chatArea.ts
│   ├── finalChallenge.ts
│   ├── footstep.ts
│   ├── hubMain.ts
│   ├── huh.ts
│   ├── main.ts
│   ├── m1Maints
│   ├── m2Main.ts
│   ├── m3Main.ts
│   ├── notlogMain.ts
│   ├── notlogSolvedMain.ts
│   ├── quests.ts
│   ├── scriptReadMe.md
│   ├── worldTracking.ts
│   ├── config/
│   │   └── footstep.config.ts
│   └── models/
│       └── footstep.model.ts
├── tilesets/
└── .github/
    └── workflows/
        └── build-and-deploy.yml
```

---

# 3. Technology Stack

## Runtime and Build

The project uses:

```text
Node.js
Vite
TypeScript
WorkAdventure iframe API
WorkAdventure scripting-api-extra
WorkAdventure quests
wa-map-optimizer-vite
```

## Relevant Dependencies

From `package.json`:

```json
{
  "@workadventure/iframe-api-typings": "^1.20.00",
  "@workadventure/upload-maps": "^1.6.11",
  "@workadventure/quests": "^1.1.6",
  "@workadventure/scripting-api-extra": "^1.9.3",
  "typescript": "^4.9.5",
  "vite": "^4.5.3",
  "wa-map-optimizer-vite": "^1.1.29"
}
```

## Important Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run prod
```

```bash
npm run upload
```

---

# 4. Map Entry Points

The project contains multiple map-specific TypeScript files.

| File | Purpose |
|---|---|
| `src/main.ts` | General / shared map script |
| `src/hubMain.ts` | Hub map logic |
| `src/m1Main.ts` | Module 1 map logic |
| `src/m2Main.ts` | Module 2 map logic |
| `src/m3Main.ts` | Module 3 map logic |
| `src/notlogMain.ts` | Notlog map logic |
| `src/notlogSolvedMain.ts` | Solved Notlog map logic |

These scripts are automatically included in the build through `vite.config.ts` using WorkAdventure map optimizer utilities.

---

# 5. index.html Test Page

The `index.html` file provides a simple browser-based launcher for testing maps.

It contains a selector for different TMJ maps, for example:

```text
notlog.tmj
matrix-hub.tmj
modul_1.tmj
modul_2.tmj
modul_3.tmj
modul_4.tmj
modul_5.tmj
feature-templates.tmj
```

The page generates WorkAdventure test URLs in this format:

```text
https://play.workadventu.re/_/{instanceId}/{host}/{path}/{selectedMap}
```

This is useful for quickly opening different maps in WorkAdventure during development.

---

# 6. Vite Configuration

The project uses `vite.config.ts`.

Important configuration details:

```ts
base: "./"
```

The build input includes:

```ts
index: "./index.html",
...getMapsScripts(maps)
```

The development server runs on:

```text
localhost
```

and sets CORS headers:

```ts
"Access-Control-Allow-Origin": "*"
```

This helps with local testing of WorkAdventure map scripts and embedded H5P HTML pages.

---

# 7. Core Script Modules

## 7.1 worldTracking.ts

Main tracking module.

Responsible for:

- world enter tracking
- tab close tracking
- ping tracking
- area enter tracking
- area leave tracking
- NPC interaction tracking
- player-player interaction tracking
- roomKey extraction
- Google Sheets ID mapping
- webhook routing

---

## 7.2 botTracking.ts

Dedicated tracking module for bot players.

Responsible for:

- tracking messages from players to bots
- tracking messages from bots to players
- enabling nearby player tracking for chat author data
- sending bot-related events to a dedicated bot webhook

---

## 7.3 chatArea.ts

Discovers NPC chat areas from Tiled object layers.

Responsible for:

- reading object layers via `getLayersMap()`
- detecting NPC objects
- extracting NPC metadata
- returning structured `ChatArea` objects

---

## 7.4 huh.ts

NPC sound system.

Responsible for:

- mapping NPC names to sound collections
- choosing a random sound
- playing sound files when entering NPC areas

---

## 7.5 trackBook.js

H5P workbook tracking script.

Responsible for:

- tracking when a workbook is opened
- tracking when a workbook / tab is closed
- sending H5P open / close events to TaskMagic

---

## 7.6 completionEventScript.js

General H5P completion tracking script.

Responsible for:

- detecting full H5P completion
- setting `WA.player.state[workbookName] = "solved"`
- tracking solved events
- sending completion messages via WA chat
- closing co-websites after a delay

---

## 7.7 completionM2MCodeEventScript.js

Module 2 completion and Moodle code script.

Responsible for:

- detecting Module 2 H5P completion
- assigning Moodle codes from a large code pool
- saving assigned codes in WA state
- caching codes in player state
- preventing duplicate code assignment
- detecting code pool usage
- recycling old entries
- sending Moodle code messages to the player

---

## 7.8 completionM3MCodeEventScript.js

Module 3 equivalent of the Module 2 Moodle code assignment script.

---

## 7.9 completionM4MCodeEventScript.js

Module 4 equivalent of the Module 2 / Module 3 Moodle code assignment script.

---

## 7.10 keypad.html

A small embedded HTML keypad.

Responsible for:

- accepting number input
- checking if a correct code was entered
- setting player state values for solved terminal codes
- showing a solved state if already completed

---

# 8. Tracking Philosophy

The tracking system follows these principles:

1. Track real actions only.
2. Avoid false events during initialization.
3. Do not count bot interactions as player-player interactions.
4. Keep H5P tracking separate from world tracking.
5. Use TaskMagic webhooks as the integration layer.
6. Use Google Sheets IDs to route ping data into the correct sheets.
7. Use cooldowns to prevent duplicate area events.
8. Use player state to prevent duplicate completion events.

---

# 9. Common Payload Structure

Most tracking payloads follow this structure:

```json
{
  "id": "player-uuid",
  "name": "Player Name",
  "roomId": "https://play.workadventu.re/_/instance/host/path/modul_1.tmj",
  "roomKey": "modul_1",
  "timestamp": 1780321002120,
  "eventType": "..."
}
```

## Field Meaning

| Field | Meaning |
|---|---|
| `id` | `WA.player.uuid` |
| `name` | `WA.player.name` |
| `roomId` | Full `WA.room.id` |
| `roomKey` | Simplified room key extracted from `roomId` |
| `timestamp` | `Date.now()` in milliseconds | !!THE TIME AND DATE IS UTC+0 -> -2:00hrs from Berlin Summertime
| `eventType` | Type of event being tracked |
| `object` | Optional target object, NPC, area, workbook, or player list |
| `sheetsId` | Optional Google Sheets sheet ID for ping routing |
| `firstPing` | Whether a ping is the first ping after entering the room |

---

# 10. Room Key Logic

The `roomKey` is extracted from `WA.room.id`.

Example input:

```text
https://play.workadventu.re/_/instance/example.github.io/map/modul_1.tmj
```

Expected output:

```text
modul_1
```

Recommended logic:

```ts
function getRoomKey(roomId: string): string {
  const key = roomId.split("/").filter(Boolean).pop() || "unknown_room";
  return key.replace(".tmj", "");
}
```

The `.tmj` suffix should be removed so that mappings can use clean keys like:

```text
modul_1
modul_2
modul_3
matrix-hub
notlog
```

---

# 11. World Tracking Events

## 11.1 enter

Triggered when a non-bot player enters a world.

```json
{
  "eventType": "enter"
}
```

Usually sent once during setup.

---

## 11.2 tab_closed

Triggered when the page is hidden or closed.

Uses:

```ts
window.addEventListener("pagehide", ...)
```

with:

```ts
keepalive: true
```

Example payload:

```json
{
  "eventType": "tab_closed"
}
```

Important note:

Browser close tracking is best effort. It is not guaranteed if the browser crashes, the device disconnects, or the network is unavailable.

---

## 11.3 ping

Regular heartbeat event.

Purpose:

- detect active players
- keep track of session duration
- detect users who leave without a clean close event

Default interval:

```text
180000 ms
3 minutes
```

Example:

```json
{
  "eventType": "ping",
  "firstPing": true,
  "sheetsId": 410008593
}
```

---

## 11.4 action

Generic action tracking event.

Used for manually triggered actions.

Example:

```json
{
  "eventType": "action",
  "actionName": "opened_info_panel"
}
```

---

# 12. Ping Webhook and Sheet Mapping

All ping events should go to one central ping webhook:

```text
https://apps.taskmagic.com/api/v1/webhooks/abc123
```

## Google Sheets IDs

The ping payload includes a `sheetsId` value depending on the current room.

Known mappings:

```ts
const ROOM_SHEET_IDS: Record<string, number> = {
  notlog: 1419742566,
  "matrix-hub": 1527348245,
  modul_1: 410008593,
  modul_2: 366813808,
  modul_3: 1800670407,
  "notlog-solved": 526346111,
};
```

If the actual room key differs, adjust the mapping.

Examples:

| Room file | roomKey | sheetsId |
|---|---|---|
| `notlog.tmj` | `notlog` | `1419742566` |
| `matrix-hub.tmj` | `matrix-hub` | `1527348245` |
| `modul_1.tmj` | `modul_1` | `410008593` |
| `modul_2.tmj` | `modul_2` | `366813808` |
| `modul_3.tmj` | `modul_3` | `1800670407` |
| `notlog-solved.tmj` | `notlog-solved` | `526346111` |

---

# 13. Ping Safety

The ping system must prevent duplicate intervals.

Problem:

```ts
setInterval(..., undefined)
```

can produce a rapid-fire webhook loop.

Therefore `setupPingTracking()` should always have a default value:

```ts
function setupPingTracking(intervalMs: number = DEFAULT_PING_INTERVAL_MS) {
  ...
}
```

And it should protect against duplicate setup:

```ts
let pingIntervalId: number | undefined;

if (pingIntervalId !== undefined) {
  console.warn("Ping tracking is already running. Skipping duplicate setup.");
  return;
}
```

It should also reject invalid intervals:

```ts
if (!intervalMs || intervalMs < 30_000) {
  intervalMs = DEFAULT_PING_INTERVAL_MS;
}
```

---

# 14. Area Tracking

Area tracking is handled in `worldTracking.ts`.

Areas are discovered from Tiled object layers via:

```ts
getLayersMap()
```

Tracked areas are selected using custom Tiled properties.

## Supported Properties

### trackEnter

```json
{
  "trackEnter": true
}
```

### trackLeave

```json
{
  "trackLeave": true
}
```

If either property is true, the area is registered for tracking.

---

# 15. Area Event Types

## area_entered

Triggered when a player enters a tracked area.

```json
{
  "eventType": "area_entered",
  "object": "area_name"
}
```

## area_left

Triggered when a player leaves a tracked area.

```json
{
  "eventType": "area_left",
  "object": "area_name"
}
```

---

# 16. Area Cooldown

Area tracking uses a cooldown.

Current intended value:

```text
10000 ms
10 seconds
```

Purpose:

- prevent border jitter
- prevent double events
- prevent rapid leave / enter spam

---

# 17. Area Startup Protection

Area tracking should ignore events fired directly after initialization.

Current intended value:

```text
2000 ms
2 seconds
```

Purpose:

- prevent false area enter events at world load
- prevent false area leave events at world load

---

# 18. Player-Player Interaction Tracking

WorkAdventure proximity meetings are used to detect when a player starts or stops interacting with another nearby player.

Relevant API:

```ts
WA.player.proximityMeeting.onJoin()
WA.player.proximityMeeting.onLeave()
```

## start_player-player

Triggered when a proximity meeting begins with at least one real player.

```json
{
  "eventType": "start_player-player",
  "object": [
    "remote-player-uuid-1",
    "remote-player-uuid-2"
  ]
}
```

## stop_player-player

Triggered when a proximity meeting ends.

```json
{
  "eventType": "stop_player-player"
}
```

---

# 19. Bot Filtering in Player-Player Tracking

Bot interactions must not be counted as player-player interactions.

Bots are visually marked with a purple outline:

```ts
WA.player.setOutline(147, 51, 234);
```

This produces:

```text
outlineColor = 9645034
```

The player-player tracking filters out remote players with this outline color.

Recommended constant:

```ts
const BOT_OUTLINE_COLOR = 9645034;
```

Recommended check:

```ts
function isRemoteBot(player: { outlineColor?: number }) {
  return player.outlineColor === BOT_OUTLINE_COLOR;
}
```

---

# 20. Bot Tracking

Bot tracking is handled in:

```text
src/botTracking.ts
```

It uses a dedicated webhook:

```text
https://apps.taskmagic.com/api/v1/webhooks/abc123
```

## Bot Detection

A player is treated as a bot if:

```ts
WA.player.tags.includes("bot")
```

or, during local testing:

```ts
WA.player.name.toLowerCase() === "bot"
```

## Bot Setup Example

```ts
WA.onInit().then(async () => {
  if (
    WA.player.name.toLowerCase() === "bot" ||
    WA.player.tags.includes("bot")
  ) {
    WA.player.setOutline(147, 51, 234);
    await setupBotInteractionTracking();
    return;
  }

  await setupTracking();
  setupPlayerInteractionTracking();
});
```

---

# 21. Bot Message Tracking

The bot listens to chat messages in the same bubble.

The script enables player tracking:

```ts
await WA.players.configureTracking({
  players: true,
  movement: false,
});
```

This makes remote player information available.

## player_message

Triggered when a real player writes a message to the bot.

```json
{
  "eventType": "player_message",
  "message": "Hallo Bot",
  "authorName": "player-uuid-or-id"
}
```

## bot_message

Triggered when the bot writes a message.

```json
{
  "eventType": "bot_message",
  "message": "Hallo Mensch",
  "authorName": "bot"
}
```

Important:

- `event.authorId === undefined` means the message comes from the local user.
- For a bot script, the local user is the bot.
- `event.authorId !== undefined` means the message comes from another player in the bubble.

---

# 22. NPC Chat Areas

NPC areas are handled by:

```text
src/chatArea.ts
```

NPC areas are read from Tiled object layers.

## ChatArea Interface

```ts
interface ChatArea {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  chatText: string;
  npcName: string;
  triggerQuest: string;
}
```

## Required Tiled Properties

### isNpc

```json
{
  "isNpc": true
}
```

### npcName

```json
{
  "npcName": "Zitierende Zirze"
}
```

### chatText

```json
{
  "chatText": "Hallo {NameOfPlayer}!"
}
```

### triggerQuest

Optional.

```json
{
  "triggerQuest": "quest_001"
}
```

---

# 23. NPC Interaction Tracking

When a player enters an NPC area, an action message appears:

```text
[LEERTASTE] drücken um mit {npcName} zu sprechen.
```

When the player interacts, the NPC sends a chat message.

At this point the interaction should be tracked:

```ts
trackNpcInteraction(area.name);
```

or, if the NPC name should be tracked:

```ts
trackNpcInteraction(area.npcName);
```

## Event

```json
{
  "eventType": "npc-interact",
  "object": "Zitierende Zirze"
}
```

---

# 24. NPC Sound System

NPC sounds are handled by:

```text
src/huh.ts
```

The idea:

- each NPC name maps to a sound collection
- when the player enters an NPC area, a random sound is played
- if no sound is configured for an NPC, nothing happens

## Example

```ts
playRandomNPCSound(area.npcName);
```

## Example Mapping

```ts
const npcSounds: Record<string, string[]> = {
  "Zitierende Zirze": [
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_1.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_2.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_3.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_4.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_5.wav"
  ]
};
```

---

# 25. H5P Workbook Tracking

H5P workbook open and close tracking is handled by:

```text
public/scripts/trackBook.js
```

Each H5P HTML can load it like this:

```html
<script src="../scripts/trackBook.js"></script>

<script>
  const workbookName = "testi-H5Pi";
  trackBookOpen(workbookName);
</script>
```

---

# 26. H5P_open

Triggered when a workbook is opened.

```json
{
  "eventType": "H5P_open",
  "object": "WorkbookName"
}
```

---

# 27. H5P_closed

Triggered when the workbook / page is closed.

Uses:

```ts
navigator.sendBeacon()
```

with a `Blob` payload.

Example:

```json
{
  "eventType": "H5P_closed",
  "object": "WorkbookName"
}
```

Important:

Close tracking is best effort. It can fail if:

- the browser crashes
- the network is gone
- the device shuts down
- the tab is killed too fast

---

# 28. Workbook Completion Tracking

General workbook completion tracking is handled by:

```text
public/scripts/completionEventScript.js
```

It detects when an H5P activity is fully completed.

The script checks:

```ts
instance.getScore() === instance.getMaxScore()
```

When true, it sets:

```ts
WA.player.state[workbookName] = "solved";
```

Then it sends a solved tracking payload.

## solved Event

```json
{
  "eventType": "solved",
  "object": "WorkbookName"
}
```

---

# 29. Preventing Duplicate Completion Events

The completion script checks:

```ts
if (WA.player.state[workbookName] !== "solved") {
  ...
}
```

This prevents the same workbook from triggering repeated completion logic.

---

# 30. Co-Website Closing

After successful completion, the script waits two minutes and then closes all co-websites:

```ts
setTimeout(async () => {
  const cowebsites = await WA.nav.getCoWebSites();

  for (const cowebsite of cowebsites) {
    cowebsite.close();
  }
}, 120000);
```

---

# 31. Moodle Code Assignment Scripts

There are module-specific code assignment scripts:

```text
completionM2MCodeEventScript.js
completionM3MCodeEventScript.js
completionM4MCodeEventScript.js
```

These scripts:

- detect H5P completion
- assign a Moodle code
- store assignment in WA state
- cache assignment in player state
- prevent duplicate assignment
- handle race conditions
- warn when the code pool is nearly full
- recycle old entries
- send the Moodle code to the player via chat

---

# 32. Code Pool Concept

Each module has a large pool of unique numeric codes.

Example:

```js
const CODE_POOL = [
  "0949",
  "5321",
  "4093"
];
```

The script assigns one unused code to a player.

---

# 33. Central Code Storage

Codes are stored in a world state variable.

Example for Module 2:

```js
const STATE_KEY = "assignedCodesM2";
```

Expected data format:

```json
{
  "playerId": {
    "code": "0949",
    "semester": "WS2526",
    "assignedAt": "2026-06-01T12:00:00.000Z"
  }
}
```

---

# 34. Player Code Cache

Each player also receives a private cached copy.

Example for Module 2:

```js
const PLAYER_STATE_KEY = "assignedCodeM2";
const PLAYER_SEMESTER_KEY = "assignedSemesterM2";
```

This allows quick retrieval if the player has already completed the module.

---

# 35. Semester Awareness

Each module has a semester key.

Example:

```js
const SEMESTER_KEY = "currentSemesterM2";
```

If the semester changes, old cached codes can be ignored and a new code can be assigned.

---

# 36. Race Condition Protection

The code assignment scripts use retries.

Example values:

```js
const MAX_RETRIES = 5;
const VERIFY_DELAY_MS = 300;
```

Flow:

1. Read assigned code map
2. Find free code
3. Save assignment
4. Wait shortly
5. Verify assignment
6. Retry if conflict is detected

---

# 37. Code Pool Warning System

The scripts check how full the code pool is.

Example thresholds:

```js
const WARN_THRESHOLD = 0.80;
const CRITICAL_THRESHOLD = 0.95;
```

At 80% usage:

```text
console warning
```

At 95% usage:

```text
critical warning and possible chat message
```

---

# 38. Recycling Old Code Assignments

Old entries can be recycled.

Example:

```js
const RECYCLE_AFTER_DAYS = 180;
```

Entries are removed if:

- they are older than the configured limit
- they belong to a previous semester
- they use an old invalid format

---

# 39. Keypad HTML

The keypad is located at:

```text
public/H5P/keypad.html
```

It is a small HTML interface for entering numeric codes.

It reads URL parameters:

```js
const correctCode = urlParams.get("code") || "1337";
const moduleParam = urlParams.get("module");
const room = urlParams.get("room");
```

When the correct code is entered, it sets a player state variable:

```js
WA.player.state["m" + moduleParam + "terminal" + room] = "correct";
```

This can be used to unlock later content or detect solved terminals.

---

# 40. Quest System

Quests are defined in:

```text
src/quests.ts
```

Each quest contains:

```ts
{
  questId: "quest17",
  questDescription: "Bearbeite das Lernmaterial zu den Textarten",
  requireQuest: "quest16"
}
```

The system supports linear dependencies through `requireQuest`.

NPC interactions can trigger quests when the required previous quest is active.

Example logic:

```ts
const currentQuest = WA.player.state.currentQuest;

const requiredQuest = quests.find(
  (q) => q.questId === area.triggerQuest
)?.requireQuest;

if (currentQuest === requiredQuest) {
  WA.player.state.currentQuest = area.triggerQuest;
}
```

---

# 41. Main Script Pattern

Most map scripts follow this general pattern:

```ts
WA.onInit().then(async () => {
  await setupTracking();
  setupPlayerInteractionTracking();

  const chatAreas = await getChatAreas();

  for (const area of chatAreas) {
    // setup NPC interactions
  }
});
```

For bot maps or bot players:

```ts
WA.onInit().then(async () => {
  if (
    WA.player.name.toLowerCase() === "bot" ||
    WA.player.tags.includes("bot")
  ) {
    WA.player.setOutline(147, 51, 234);
    await setupBotInteractionTracking();
    return;
  }

  await setupTracking();
  setupPlayerInteractionTracking();
});
```

---

# 42. Important Webhooks

## Main Action / Event Webhook

Used by general world tracking events.

```text
https://apps.taskmagic.com/api/v1/webhooks/abc123
```

## Ping Webhook

Used by all ping events.

```text
https://apps.taskmagic.com/api/v1/webhooks/abc123
```

## Bot Tracking Webhook

Used by bot message tracking.

```text
https://apps.taskmagic.com/api/v1/webhooks/abc123
```

---

# 43. Known Important Event Types

```text
enter
tab_closed
ping
action
area_entered
area_left
npc-interact
start_player-player
stop_player-player
H5P_open
H5P_closed
solved
player_message
bot_message
```

---

# 44. Testing Notes

## Local Testing

Start dev server:

```bash
npm run dev
```

Open the local test page and select a map.

Avoid opening HTML files directly with `file://`, because WorkAdventure iframe scripts and localhost scripts can trigger CORS or local network access issues.

Use:

```text
http://localhost:5173/
```

not:

```text
file:///...
```

---

# 45. Debugging Room Keys

If ping mapping does not work, log:

```ts
console.log("WA.room.id:", WA.room.id);
console.log("roomKey:", getRoomKey(WA.room.id));
```

If the roomKey does not match the mapping, update either:

- the room file name
- the `getRoomKey()` logic
- the `ROOM_SHEET_IDS` mapping

---

# 46. Debugging Bot Detection

For proximity player objects, log:

```ts
console.log("Remote player:", {
  name: player.name,
  uuid: player.uuid,
  outlineColor: player.outlineColor
});
```

A bot should have:

```text
outlineColor = 9645034
```

---

# 47. Debugging H5P Completion

Useful logs:

```js
console.log(instance.getScore());
console.log(instance.getMaxScore());
console.log(WA.player.state[workbookName]);
```

If `instance` is null, H5P may not have initialized yet.

---

# 48. Important Safety Notes

## Duplicate Pings

Always prevent multiple intervals.

Do not call `setupPingTracking()` repeatedly unless the function protects itself.

## Area Event Spam

Use cooldowns.

## Startup False Positives

Ignore area events immediately after setup.

## Browser Close Events

Treat close tracking as best effort only.

## Bot / Player Mixing

Always filter bots from player-player proximity tracking.

---

# 49. Recommended Future Improvements

## 49.1 Central Config File

Move all webhook URLs and Google Sheet IDs into one config file.

Example:

```ts
src/config/tracking.config.ts
```

## 49.2 Event Type Constants

Avoid string typos by defining event types as constants.

Example:

```ts
export const TRACKING_EVENTS = {
  PING: "ping",
  NPC_INTERACT: "npc-interact",
};
```

## 49.3 Shared Payload Builder

Create one reusable function that builds common payload data.

## 49.4 Better Error Reporting

Currently errors are logged to console. In the future, critical tracking failures could be sent to a debug webhook.

## 49.5 More Robust RoomKey Mapping

If file names and logical module names differ, use an explicit map:

```ts
const ROOM_KEY_ALIASES = {
  "matrix-hub": "hub",
  "modul_1": "module_1"
};
```

## 49.6 Separate Analytics Layers

Potential split:

```text
worldTracking.ts
areaTracking.ts
h5pTracking.js
botTracking.ts
questTracking.ts
```

Currently `worldTracking.ts` is central, which is convenient, but it may grow too large.

---

# 50. Version

```text
Documentation Version: 2.0
Project Context: Avatar-based Scientific Writing
Runtime: WorkAdventure + TypeScript + H5P + TaskMagic
```