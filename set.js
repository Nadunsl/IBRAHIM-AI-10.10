const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU5CWVBPRXY3bFNQR3lsSjV5WlRwMkF2S0VCZXd1MVZycmU1bUIrUTYxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjV2SE8yQ3ZYSXU3SGphanNQTWhDUXBIZHlRTGZOTEQwa1A0dEpIL2pRdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQWR4WTYweTVFcW1ZUUp3UHhxZ0NrUndmWU82Q0ZCY25iWmhjQlI4ZEY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtV2JMSGZ6MzAyalhGY0FTUGlxS3hkeTE4QXBHTmE1TlVBcXRYWWxwTGhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlEaTBQeTdmV2FFZHVtY2FBWUZHV1ZzcTFoUHFjMkhNT2xvSkMvektqR1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR4aHphditHeDV1RncyRHo5bHI5OWRJZjdCdFI0MnBCNXZFYnpjenVuRnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEI0TW0vVGRSUkVpeEllMjFpcVJ4S2RrNDhic2xQdjNHRDZ2YS9qdmhGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTE2MGI2cURTL3dHZXpRaUZlbHZnaDV2ZDRnUkFjSDdFTzFkY0tiOUVDcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtnVmV1SUEybnRIdERSajVCNy9SWTZ4NXpUVFJ6QnNEZnNCaUFqbnFaVGt6a0o0dzhoYk5pYVN5ZmJta2xoTzhLRHhKR3lsRzVoQ2FCYldsNktaYmd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTksImFkdlNlY3JldEtleSI6ImYyZE5HeFVoSFVDQmhkbWZ4cjh5N1R1R0VkbVQyK05CYnRROVBQUyt2SWs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJ5N3VGNGpvUkJhTDBFbGhtYk9uZ2ciLCJwaG9uZUlkIjoiMWQ3YmU3M2EtMmY1NC00YzZlLWI0ODgtMDNlMDE1NGIwYWYzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9lZXExUXVaRlRiYU5VTU16WW5hSjhYRnVPRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGL1RVWUQwNEF1dDJPWUZWaVc0SzJFWTlwenM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQU5OREVDVlgiLCJtZSI6eyJpZCI6Ijk0NzYwNDA1MTAyOjc2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLekg4cVlHRUtYUnBiUUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOL3pzUTY4VFhmenZqYW5vVm9WSzlRRGxTczU3T1EwZzByZk1MTG1uNFNNPSIsImFjY291bnRTaWduYXR1cmUiOiJWeHBxQW5zVytpblUvZTJVR003R0VZUDZTWWpwQWI2VU1MT2kvbDBHSUQrQUJNOXNmRzBQK3dJRTNuQmcrLzhTUERMQTFzdHRlbDJJVGtWNi9Qd1ZBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOWY2cXl4aWY0d2ZCSXNDNGxaaVcwU2twOW9qaW81b2l6ZDdvUDlkZFFoeTYwbzJSdmc0R0o5bnpLY3NBNnR3cVBHQjk0Z3dGTitnaWV5ampaenIramc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc2MDQwNTEwMjo3NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUZjg3RU92RTEzODc0MnA2RmFGU3ZVQTVVck9lemtOSU5LM3pDeTVwK0VqIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMjgxMjU3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlFVSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nadun",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "+94760405102",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
