const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { connectMongoDB } = require('./config/mongodb');

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions
    ]
});

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        discordClient.once(event.name, (...args) => event.execute(...args, discordClient));
    } else {
        discordClient.on(event.name, (...args) => event.execute(...args, discordClient));
    }
}

// Connect to MongoDB and start bot
connectMongoDB().then(() => {
    const TOKEN = process.env.DISCORD_TOKEN;
    if (!TOKEN) {
        console.error("ERRORE CRITICO: La variabile d'ambiente 'DISCORD_TOKEN' non è impostata.");
    } else {
        discordClient.login(TOKEN);
    }
});
