const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName("schedule").setDescription("Adds events to a schedule")
    .addStringOption((option) => option.setName("date").setDescription("format YYYY-MM-DD").setRequired(true))
    .addStringOption((option) => option.setName("time").setDescription("format HH:MM using 24 hour").setRequired(false)),
    async execute(interaction) {
        const date = interaction.options.getString("date");
        const time = interaction.options.getString("time") ?? "00:00";

        if (date.match(/^\d{4}-\d{2}-\d{2}$/) === null){ return await interaction.reply("Date not formatted correctly"); }
        if (time.match(/^\d{2}:\d{2}$/) === null){ return await interaction.reply("Time not formatted correctly"); }

        const scheduledTime = new Date(`${date} ${time}`);
        const currentTime = new Date();

        if (isNaN(scheduledTime.getTime())){
            return await interaction.reply("Failed to process Date/Time", MessageFlags.Ephemeral);
        } else if (scheduledTime <= currentTime){
            return await interaction.reply("Schedule must use a time in thefuture", MessageFlags.Ephemeral);
        }

        return await interaction.reply("This feature has not been implimented");

    },
};
