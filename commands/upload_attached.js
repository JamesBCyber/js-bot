const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("upload_attached").setDescription("uploads the temp image if it exists"),
    async execute(interaction) {
        const fs = require('fs');

        const uploadsfolder = "uploads";

        const lastfile = `${uploadsfolder}/lastfile.txt`;
        const filename = fs.readFileSync(lastfile);
        
        if (!fs.existsSync(`${uploadsfolder}/${filename}`)){
            interaction.reply("Could not remember what file I had last");
            return;
        }

        interaction.reply({files: [`${uploadsfolder}/${filename}`]});
    },
};



