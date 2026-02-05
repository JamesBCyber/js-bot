const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("download_attached").setDescription("downloads a temp image")
    .addAttachmentOption((option) => option.setName("file").setDescription("The file you want to upload").setRequired(true)),
    async execute(interaction) {
        await interaction.reply("downloading file");
    
        const https = require('https');
        const fs = require('fs');

        const uploadsfolder = "uploads"
        const file = interaction.options.getAttachment("file");
        const filename = file.name
        const destination = `${uploadsfolder}/${filename}`;
        const lastfile = `${uploadsfolder}/lastfile.txt`;


        const filestream = fs.createWriteStream(destination);

        success = true
    
        https.get(file.url, (response) => {
            response.pipe(filestream);
            filestream.on('finish', () => {
                filestream.close(() => {
                    success = true;
                });
            });
        }).on('error', (err) => {
                fs.unlink(destination, () => {
                    success = false;
                });
            });

        if (success){
            await interaction.editReply("File Downloaded");
        } else{
            await interaction.editReply("Failed to download file");
        }

        fs.writeFileSync(lastfile, filename)
    },
};



