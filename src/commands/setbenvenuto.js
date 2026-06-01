const { salvaConfig } = require('../utils/database');

module.exports = {
    name: 'setbenvenuto',
    async execute(interaction) {
        // Recupera il canale selezionato dall'utente nell'interazione
        const canale = interaction.options.getChannel('canale');
        
        // Salva l'ID del canale nel database con la chiave 'welcome_channel'
        await salvaConfig('welcome_channel', canale.id);
        
        // Risponde all'utente confermando l'operazione
        await interaction.reply({ 
            content: `✅ Canale di benvenuto impostato a ${canale}`, 
            ephemeral: true 
        });
    }
};
