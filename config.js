const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "254799211357",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || true,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVBQcVdtT2ZQNmVRcFZVNjYxNGNnWHNBZDNEYlExY3EvNk1LSXd1QlNtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUM2Uzc3eGNwa2ZLMm5NSGZKU1ZEYmFVYVFxSkQwVWRkR2NOODlYSnoyST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTlNlSDVLcGdmS0pscFNZOWk3RnVCN0FkeTVSQlRRT0I2VjVsMUN1cmtFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpai9heGJwMzVDdFJyOWZVSURSZGxtZ3RDRXBiTjhEbkFuRFQ3dkhsZXdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndEd2Y4bjJkM1hwdnlHd3VQNEVWUThBNXlDdzF4NzJMdHVmQ1pla2s0R3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNiNlJ2V2FxUkdMcHJvYndhZXFrQ1JsTng1dU1QVi9IWGFvOStnd2txd289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEVaQXd6ejZPQjVvc0UxbEU2YVpvY3dzWHZQMDRSTTBKT3JOMmtzck9Ycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzRlTTZCdjNrWERqVDVsUWFTRFFiOUJ1UXl2SUE4RFIwaHMxZjA5TWlIZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNTTmk1V2tHQTR5S2VpNkV3SzVuQUtaYXpmVUoxejRORll5RVRneENhNlZVSmZlYXVIU2lGRVFJa3J6d1l5U0JQaGtFUU9TNFczVy9FMXMyYzAyM2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUxLCJhZHZTZWNyZXRLZXkiOiJlZURZdTViUjROQTBoU04vWi83OXlmbG85NHo3d1k0ZGRObFhrWmQreDJZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJOQzY1VlFCMiIsIm1lIjp7ImlkIjoiMjU0Nzk5MjExMzU3OjU0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjI4MTUzNjk2MDEwNjk6NTRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPU0ZwOGtIRUlhcDhMOEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDM3cvRFBQQ3JUZ2pwMzZ5VXVLV0FuZ0s3SlExalFQeS9IME5wdEdBcWtJPSIsImFjY291bnRTaWduYXR1cmUiOiJNQ0R4T0NvYTV3UVI3bjVIdm9qZ0hrVjNVS3c0WjJXSWZTUDcyYzFHNU42WU4yeE9pSDNOczMxSG1SNG5ZWFV0OEQ3R1cvM2llZlhyWTBrb1lTYVZBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoieGdYcE5YUHZxN0w1K2VlbWhzRXB0V2lqMEJ5L0tGc2lZaTRVc202L0VvL243MlYyTlAxcU83akdBSFRrY1pyOHJEdjlOUSs1WmVtVGpQN2srdkd0aXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3OTkyMTEzNTc6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUXQ4UHd6endxMDRJNmQrc2xMaWxnSjRDdXlVTlkwRDh2eDlEYWJSZ0twQyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ0NTczNTg4LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxrYiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || true,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
