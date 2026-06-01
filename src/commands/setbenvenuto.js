// commands/setbenvenuto.js
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setbenvenuto')
        .setDescription('Imposta il canale dove inviare i messaggi di benvenuto')
        .addChannelOption(option =>
            option.setName('canale')
                .setDescription('Seleziona il canale di testo')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction, client) {
        const canaleScelto = interaction.options.getChannel('canale');
        
        // NOTA: Se la repository usa una mappa globale sul 'client' (es: client.welcomeChannels), usa quella.
        // Altrimenti serve un database o un file JSON per salvare il dato.
        if (!client.welcomeChannels) client.welcomeChannels = new Map();
        
        client.welcomeChannels.set(interaction.guildId, canaleScelto.id);

        await interaction.reply({ 
            content: `✅ Canale di benvenuto impostato correttamente su ${canaleScelto}!`, 
            ephemeral: true 
        });
    },
};
