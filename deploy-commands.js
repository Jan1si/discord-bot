import * as dotenv from "dotenv";
dotenv.config();

import { REST, Routes } from "discord.js";
import fs from "node:fs";

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('js'));
console.log(commandFiles);

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`)
    .then((module) => {
      console.log(`[SUCCESS] модуль ${file} подключен!`);
      return module;
    })
    .catch((err) => {
      console.log(`[ERROR] модуль ${file} ней найден`);
    });
    commands.push(command.default.data.toJSON());
    console.log(`[SUCCESS] модуль ${file} зарегестрирован!`);
}


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`Начинаем загрузку ${commands.length} комманд для бота`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD),
      {body: commands},
    );

    console.log(`Успешно загурженно ${data.length} команд дляя бота`);
    // console.log(data);

  } catch (error) {
    console.error(error);
  }

})();