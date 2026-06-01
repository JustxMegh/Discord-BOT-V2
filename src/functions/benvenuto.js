const { EmbedBuilder } = require('discord.js');

const channelId = '123456789012345678'; 

const welcomeEmbed = new EmbedBuilder()
    .setColor('#2f3136') 
    .setDescription(`***💎 Benvenuto ${member} nel dark alcol, richiedi la tua sezione in <#${channelId}>***)
    .setImage('https://link-della-tua-immagine.com/immagine.png') // Inserisci qui il link dell'immagine sotto il testo
    .setTimestamp(); // Mostra l'orario del benvenuto (opzionale)

welcomeChannel.send({ embeds: [welcomeEmbed] });
