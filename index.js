

const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const path = require('path'); // Moduł do obsługi ścieżek plików
const ffmpeg = require('ffmpeg-static');

// Tworzenie zasobu audio
const resource = createAudioResource(path.join(__dirname, 'mateusz.mp3'), {
    inputType: ffmpeg
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates // Dodano obsługę kanałów głosowych
    ]
});

const TOKEN = 'chciałbyś kurwa?';

client.once('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}`);
});

client.on('messageCreate', async message => { 
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!ping') {
        message.reply('Pong!');
    }
    if (message.content.toLowerCase() === '!albion') {
        message.reply('online kleszczu.');
    }
    if (message.content.toLowerCase() === '!oplata') {
        message.reply('Abonament 5,900zł/miesiąc opłata dla @otiz3k_ lub dla @reqqel');
    }
    if (message.content.toLowerCase() === '!pinutt') {
        const imagePath = path.join(__dirname, 'ima2ge.png'); 
        message.channel.send({ files: [imagePath] }).catch(err => {
            console.error('Błąd podczas wysyłania pliku:', err);
            message.reply('Nie udało się wysłać obrazka.');
        });
    }
    if (message.content.toLowerCase() === '!pinut2') {
        const imagePath = path.join(__dirname, 'pinut2.mp4');
        message.channel.send({ files: [imagePath] }).catch(err => {
            console.error('Błąd podczas wysyłania pliku:', err);
            message.reply('Nie udało się wysłać filmu.');
        });
    }
    if (message.content.toLowerCase() === '!happy') {
        const imagePath = path.join(__dirname, 'So Excited Dancing GIF.gif');
        message.channel.send({ files: [imagePath] }).catch(err => {
            console.error('Błąd podczas wysyłania pliku:', err);
            message.reply('Nie udało się wysłać filmu.');
        });
    }
    if (message.content.toLowerCase() === '!phasmophobia') {
        const imagePath = path.join(__dirname, '1image.png');
        message.channel.send({ files: [imagePath] }).catch(err => {
            console.error('Błąd podczas wysyłania pliku:', err);
            message.reply('Nie udało się wysłać filmu.');
        });
    }
    if (message.content.toLowerCase() === '!stefan') {
        const imagePath = path.join(__dirname, 'i_am_steve.mp4');
        message.channel.send({ files: [imagePath] }).catch(err => {
            console.error('Błąd podczas wysyłania pliku:', err);
            message.reply('Nie udało się wysłać filmu.');
        });
    }

    // Komenda !ojciec - odtwarza dźwięk na kanale głosowym
    if (message.content.toLowerCase() === '!ojciec') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('Musisz być na kanale głosowym, aby użyć tej komendy!');
        }

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(path.join(__dirname, 'mati.mp3'));
            
            connection.subscribe(player);
            player.play(resource);

            player.on('idle', () => {
                connection.destroy();
            });

        } catch (err) {
            console.error('Błąd:', err);
            message.reply('Nie udało się dołączyć do kanału głosowego.');
        }
    }
});

client.login(TOKEN);
