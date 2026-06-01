const { EmbedBuilder } = require('discord.js');
const { caricaDati } = require('../utils/database');

module.exports = {
    name: 'calcolomn',
    async execute(interaction) {
        try {
            const dati = await caricaDati();

            if (Object.keys(dati.famiglie).length === 0) {
                return await interaction.reply({ content: "⚠️ La classifica è vuota. Usa `/pulizia` per iniziare!", ephemeral: true });
            }

            let totaleBottiglie = 0;
            let totalePrezzoGlobale = 0;
            for (const info of Object.values(dati.famiglie)) {
                totaleBottiglie += info.totale;
                totalePrezzoGlobale += info.prezzoTotale;
            }

            const prezzoBase = totaleBottiglie * 1000;
            const differenza = prezzoBase - totalePrezzoGlobale;
            const valoreFinale = differenza * 0.30;

            const embed = new EmbedBuilder()
                .setTitle("💎 ᴄᴀʟᴄᴏʟᴏ ᴍᴇʀᴄᴀᴛᴏ ɴᴇʀᴏ")
                .setColor(0x9C27B0)
                .addFields(
                    { name: "🍾 Totale Bottiglie", value: `**${totaleBottiglie}**`, inline: true },
                    { name: "💵 Bottiglie × 1000", value: `**$${prezzoBase.toLocaleString()}**`, inline: true },
                    { name: "💰 Valore Totale (Classifica)", value: `**$${totalePrezzoGlobale.toLocaleString()}**`, inline: true },
                    { name: "📊 Differenza", value: `**$${differenza.toLocaleString()}**`, inline: true },
                    { name: "✨ Valore MN (30%)", value: `**$${valoreFinale.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}**`, inline: true }
                );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in calcolomn command:', error);
            await interaction.reply({ content: "❌ Errore nel calcolare il valore MN!", ephemeral: true });
        }
    }
};
