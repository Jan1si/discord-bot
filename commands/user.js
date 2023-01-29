import { SlashCommandBuilder } from "discord.js";

export default  {
  data: new SlashCommandBuilder()
        .setName('user')
        .setDescription("Выводит информацию о пользователе"),
        async execute(interaction) {
          await interaction.reply(`${interaction.user.username} присоединился к серверу ${interaction.member.joinedAt}`);
        } 
}