const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'info',
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setTitle("📖 Informazioni Comandi")
                .setColor(0x00AFF4)
                .addFields(
                    {
                        name: "/pulizia",
                        value: "Registra una nuova pulizia per una famiglia. Specifica il ruolo della famiglia e il numero di bottiglie raccolte.",
                        inline: false
                    },
                    {
                        name: "/eliminapulizia",
                        value: "Rimuove l'ultima pulizia registrata per una famiglia. Utile per correggere errori.",
                        inline: false
                    },
                    {
                        name: "/classifica",
                        value: "Mostra la classifica completa di tutte le famiglie ordinate per numero di bottiglie raccolte.",
                        inline: false
                    },
                    {
                        name: "/calcolomn",
                        value: "Calcola il valore MN utilizzando la formula: (bottiglie_totali × 1000 - valore_totale) × 0.30",
                        inline: false
                    },
                    {
                        name: "/logpulizia",
                        value: "Imposta il canale dove verranno registrati i log delle pulizie. Solo per amministratori.",
                        inline: false
                    },
                    {
                        name: "/logclassifica",
                        value: "Imposta il canale dove verranno registrati i log della classifica. Solo per amministratori.",
                        inline: false
                    },
                    {
                        name: "/setbackupchannel",
                        value: "Imposta il canale dove verranno salvati i backup automatici dei dati. Solo per amministratori.",
                        inline: false
                    },
                    {
                        name: "/backup",
                        value: "Esegue manualmente un backup dei dati attuali. Solo per amministratori.",
                        inline: false
                    },
                    {
                        name: "/resetclassifica",
                        value: "Resetta completamente la classifica e cancella tutti i dati. ⚠️ IRREVERSIBILE - Solo per amministratori.",
                        inline: false
                    },
                    {
                        name: "/reactrole",
                        value: "Crea un messaggio con un bottone per assegnare automaticamente un ruolo agli utenti che lo cliccano. Dura 24 ore.",
                        inline: false
                    },
                    {
                        name: "/info",
                        value: "Mostra questo messaggio con le descrizioni di tutti i comandi disponibili.",
                        inline: false
                    }
                );

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error('Error in info command:', error);
            await interaction.reply({ content: "❌ Errore nel mostrare le informazioni!", ephemeral: true });
        }
    }
};
