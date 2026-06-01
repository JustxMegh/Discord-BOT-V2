const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { salvaConfig } = require('../utils/database');

module.exports = {
    // Questa parte serve al bot per registrare il comando su Discord
    data: new SlashCommandBuilder()
        .setName('setbenvenuto')
        .setDescription('Imposta il canale per i messaggi di benvenuto')
        .addChannelOption(option =>
            option.setName('canale')
                .setDescription('Seleziona il canale di testo')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // Solo admin/moderatori

    async execute(interaction) {
        const canale = interaction.options.getChannel('canale');
        await salvaConfig('welcome_channel', canale.id);
        await interaction.reply({ content: `✅ Canale di benvenuto impostato a ${canale}`, ephemeral: true });
    }
};
