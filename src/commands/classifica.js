const { EmbedBuilder } = require('discord.js');
const { caricaDati } = require('../utils/database');
const { getDB } = require('../config/mongodb');

module.exports = {
    name: 'classifica',
    async execute(interaction, discordClient) {
        try {
            const db = getDB();
            const dati = await caricaDati();

            if (Object.keys(dati.famiglie).length === 0) {
                return await interaction.reply({ content: "⚠️ La classifica è attualmente vuota. Usa `/pulizia` per iniziare!", ephemeral: true });
            }

            const classificaOrdinata = Object.entries(dati.famiglie).sort((a, b) => b[1].totale - a[1].totale);
            
            let testoClassifica = "";
            let totaleGeneraleBottiglie = 0;
            let totalePrezzoGlobale = 0;
            let posizione = 1;

            for (const [idRuolo, info] of classificaOrdinata) {
                const totaleFamiglia = info.totale;
                const prezzoFamiglia = info.prezzoTotale;
                
                totaleGeneraleBottiglie += totaleFamiglia;
                totalePrezzoGlobale += prezzoFamiglia;
                
                testoClassifica += `**${posizione}°** | <@&${idRuolo}> — \`${totaleFamiglia}\` bottiglie — **$${prezzoFamiglia.toLocaleString()}**\n`;
                posizione++;
            }

            const embed = new EmbedBuilder()
                .setTitle("🏆***CLASSIFICA BOTTIGLIE FAMIGLIE***🏆")
                .setDescription(testoClassifica)
                .setColor(0xFFD700)
                .addFields(
                    { 
                        name: "✨ Totale Globale Complessivo", 
                        value: `**${totaleGeneraleBottiglie}** bottiglie totali raccolte.`, 
                        inline: false 
                    },
                    {
                        name: "💰 Valore Totale",
                        value: `**$${totalePrezzoGlobale.toLocaleString()}**`,
                        inline: false
                    }
                );

            await interaction.reply({ embeds: [embed] });

            const configDoc = await db.collection('config').findOne({ key: 'classifica_logs_channel' });
            if (configDoc && configDoc.value) {
                try {
                    const logChannel = await discordClient.channels.fetch(configDoc.value);
                    if (logChannel) {
                        await logChannel.send({ embeds: [embed] });
                    }
                } catch (error) {
                    console.error('Errore nell\'invio al canale log:', error);
                }
            }
        } catch (error) {
            console.error('Error in classifica command:', error);
            await interaction.reply({ content: "❌ Errore nel mostrare la classifica!", ephemeral: true });
        }
    }
};
