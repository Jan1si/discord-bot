import * as  dotenv from 'dotenv';
dotenv.config();

import { Client, Events, Collection,  GatewayIntentBits } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

(async () => {
  try {
    for (const file of commandFiles) {
      const command = await import(`./commands/${file}`)
        .then((module) => {
          console.log(`[SUCCESS] модуль ${file} подключен`);
          return module;
        })
        .catch((err) => {
          console.log(`[ERROR] модуль ${file} ней найден`);
        })
  
         if ('data' in command.default && 'execute' in command.default) {
            await client.commands.set(command.default.data.name, command.default.data.execute)
            console.log("OK");
         } else {
            console.log(`[WARNING] команда ${file} не содержит ключи "data" и "execute"`)
         }
     }
  } catch (error) {
    console.log("[ERROR] неудалось произвести подключение модулей");
  }
})()


client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`Несоответствующая команда!`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "При выполнении команды произошла ошибка!", ephemeral: true });
  }

})

client.login(process.env.TOKEN)
