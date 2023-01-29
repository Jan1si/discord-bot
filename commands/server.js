import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Выводит информацию о сервере'),
        async  execute(interaction) {
          await interaction.reply(`${interaction.guild.name} количество участников ${interaction.guild.memberCount}`);
        }

}