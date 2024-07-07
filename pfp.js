const { Client, Intents } = require('discord.js');
const fs = require('fs').promises;
const fetch = require('node-fetch');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

const users = [
    { id: '320975452199976961', avatarURL: '' },
    { id: '166319802263142401', avatarURL: '' },
];

let data = {};

const fetchAvatarURLs = async () => {
    try {
        await Promise.all(users.map(async (user) => {
            const discordUser = await client.users.fetch(user.id);
            user.avatarURL = discordUser.displayAvatarURL({ dynamic: true, size: 1024 });
        }));

        const newData = {};
        users.forEach(user => {
            newData[`User_${user.id}_PFP`] = user.avatarURL;
        });

        if (!isEqual(data, newData)) {
            data = newData;
            await updateGitHub();
        } else {
            console.log(`[${new Date().toLocaleString()}] Skipping GitHub update as data has not changed.`);
        }

    } catch (error) {
        console.error(`[${new Date().toLocaleString()}] Error fetching avatar URLs:`, error);
    }

    process.exit(0);
};

const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

const updateGitHub = async () => {
    const token = process.env.GIT_TOKEN;
    const repo = 'Heruzinyo/KURAGE-STUDIO';
    const file = 'assets/js/data.js';

    const url = `https://api.github.com/repos/${repo}/contents/${file}`;
    const authHeader = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
    };

    try {
        const response = await fetch(url, { headers: authHeader });
        if (!response.ok) {
            throw new Error(`Failed to fetch ${file} details from GitHub`);
        }
        const fileInfo = await response.json();
        const sha = fileInfo.sha;

        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                ...authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Update avatar URLs in data.js',
                content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
                sha: sha,
            }),
        });

        if (updateResponse.ok) {
            console.log(`[${new Date().toLocaleString()}] Updated data.js on GitHub.`);
        } else {
            const errorData = await updateResponse.json();
            console.error(`[${new Date().toLocaleString()}] Error updating data.js on GitHub:`, errorData.message);
        }
    } catch (error) {
        console.error(`[${new Date().toLocaleString()}] Failed to update data.js on GitHub:`, error);
    }
};

client.once('ready', () => {
    fetchAvatarURLs();
});

const BOT_TOKEN = process.env.BOT_TOKEN;
client.login(BOT_TOKEN);
