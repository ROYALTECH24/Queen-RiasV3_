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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUFUVkJqNTJUYmd3WDd6MHkrZ05zc281cUJBOVV4Nlo4cGpJMzMrTkVrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0Q4Q00xNDBWaFE1YW03TTVyRzFQbkc2eTBROFNoMk9Oa24rU2lJMWpoVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5R1JrQzBXSUF2YXRtTGZucHdrVGxSRnhocCtSV3QrUGR6UElCbnlycFVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqeWtGZDdVSG0xT3RlbkhjMCtaYnYyV2lHMHU2ODM4SC9CWmZzVVp6NUNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlMaVVWeFFWQ0E1K3lYTTlGdHlNUFZrVmxCUDBFOVBRYnVlaGVmSVJtWG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVya2xGSVRRdHZrYTlzSUdLMXFDY0o5STRQd1F4QnIxL0dmTE9KaHk3Q289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic01NUWYzR3BIUFRNRlhsM3lzZmcvSks0MldTY0k5aDRuT2RRWDcxa1ozZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3N2aHBta0xYRit1OGRTTXR2TFFzQU5VRnJIbVdXeVJWMFJwSTEwWGpBND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkgwK1ZwS1ZvcW1MY2drRURXS0dJWkVUN3pVUGVLWjAxc3RoRDhUblc5ZlVmWU1Ec2I0My9QNjVlK0NQdDVVQ3lZKzlKZ0VXMXgwQWFqTjk4UVBHQkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJrcVpqbVJtSGVaM3Ria091UXBVT09ISSs3Nk9sN0tLVHdsWTkrbm11S3RjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJFTUc2OENMQiIsIm1lIjp7ImlkIjoiMjU0NzAwMTcyMDU5OjhAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxOTQ5MTQ3NzYyODUyNTM6OEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lpdDV2d0dFT0xROHI4R0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im0yZGZvZERiakpVWTQyeUNrcjlPRUg4cmgxbU8vQmxtWUhsSnAycEVHUXc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1mUjBybWx3eHl0d2wyRmMzVVI4YTVjdTlYS0M2Mjd5MkhldzFVa2tlME1VV3hYV1pyS25IOHlpQ2RuRkR2V0ZrdmpmcGpmSjVYSmhYNlRmYVBSTUNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIQnNpSHEydjJ3Q0FERHFuTVJ3TEJNK2dtUkxoMXdGNWt3OUxzQzVKenNrMjJuZ1pydGNhVzZiL1k1bG8yME11SW9acUNEREU3NlgyOUZaRGRnYmVEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwMDE3MjA1OTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlp0blg2SFEyNHlWR09Oc2dwSy9UaEIvSzRkWmp2d1pabUI1U2FkcVJCa00ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDYxMTQ0MCwibGFzdFByb3BIYXNoIjoiM1I5WjM5In0=",
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
