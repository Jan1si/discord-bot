import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
        .setName('ping')
        .description('Выводит pong'),
        async execute(interaction) {
          await interaction.reply('Pong!');
        }
}