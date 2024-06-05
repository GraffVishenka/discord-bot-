const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban",
  //devOnly: Boolean
  //testOnly: Boolean
  options: [
    {
      name: "target-user",
      description: "The user to ban",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reson",
      description: "The reason for banning",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
  permissionsRequried: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply(`Ban`);
  },
};
