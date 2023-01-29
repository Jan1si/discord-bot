import * as  dotenv from 'dotenv';
dotenv.config();

import { Client, Events, Collection,  GatewayIntentBits } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// создаём клиента и назначаем ему права
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// получаем путь до текущего файла
const __filename = fileURLToPath(import.meta.url);

// получаем путь до текущей директории
const __dirname = path.dirname(__filename);

// получаем путь до папки commands
const commandPath = path.join(__dirname, 'commands');

// массив всех файлов из папки commands
const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('js'));

for (const file of commandFiles) {
  // const filePath = path.join(__dirname, file);
  console.log(file)
  //  await import(`./commands/${file}`)
  //     .then((module) => {
  //       console.log(module);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
}


client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.login(process.env.TOKEN)

// console.log(process.env.TOKEN);