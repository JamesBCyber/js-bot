// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

token = process.env.Bot_Token;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Register commands
client.commands = new Collection();

const folderPath = path.join('commands');
const commandFolder = fs.readdirSync(folderPath).filter((file) => file.endsWith('.js'));

for (const commandfile of commandFolder) {
    const commandPath = path.join(folderPath, commandfile);
    const command = require(`./${commandPath}`);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`[WARNING] The ${filePath} file does not contain the correct command setup`)
    }
}

client.on(Events.InteractionCreate, async (interaction) => {
	// console.log(interaction);
    const command = interaction.client.commands.get(interaction.commandName);

    if (!interaction.isChatInputCommand()) return;
    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});


// Log in to Discord with your client's token
client.login(token);
