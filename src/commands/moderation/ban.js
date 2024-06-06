const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {*} client
   * @param {*} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "You can't ban this user because they're the server owner."
      );
      return;
    }
    
    console.log(interaction.guild.members.me.roles)

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You can't ban that user because they have the same/higher role then you."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "You can't ban that user because they have the same/higher role then me."
      );
      return;
    }

    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `User ${targetUser} was banned \nReason: ${reason}`
      );
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },

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
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequried: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
};
