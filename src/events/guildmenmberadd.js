// events/guildMemberAdd.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        // Recupera l'ID del canale (adattalo al sistema di memorizzazione del bot)
        if (!client.welcomeChannels) return;
        const channelId = client.welcomeChannels.get(member.guild.id);
        if (!channelId) return;

        const channel = member.guild.channels.cache.get(channelId);
        if (!channel) return;

        const canaleRichiesteId = "1464003262523900140"; // ID del tuo canale richieste
        const IMMAGINE_BENVENUTO = "https://esempio.com/tua-immagine.png"; 

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription(`💎 Benvenuto ${member} nel dark alcol, richiedi la tua sezione in <#${canaleRichiesteId}>`)
            .setImage(IMMAGINE_BENVENUTO)
            .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] }).catch(console.error);
    },
};
