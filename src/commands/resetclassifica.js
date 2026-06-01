const { EmbedBuilder } = require('discord.js');
const { salvaDati } = require('../utils/database');
const { getDB } = require('../config/mongodb');

module.exports = {
    name: 'resetclassifica',
    async execute(interaction) {
        try {
            const db = getDB();
            
            // Reset all family data
            const datiVuoti = { famiglie: {} };
            await salvaDati(datiVuoti);
            
            // Clear history
            await db.collection('history').deleteMany({});

            const embed = new EmbedBuilder()
                .setTitle("🔄 Classifica Resettata")
                .setDescription("La classifica è stata completamente resettata. Tutti i dati sono stati cancellati.")
                .setColor(0xFF6B6B);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error('Error in resetclassifica command:', error);
            await interaction.reply({ content: "❌ Errore nel resettare la classifica!", ephemeral: true });
        }
    }
};
