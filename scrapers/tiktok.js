const axios = require("axios");

const client = axios.create({
    timeout: 30000,
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36"
    }
});

module.exports = async (url) => {

    if (!url)
        throw new Error("URL TikTok wajib diisi.");

    // nanti request TikWM atau parser TikTok masuk di sini

    const raw = await fetchTikTok(url);

    return format(raw);

};

async function fetchTikTok(url) {

    // TODO
    // Request TikWM / TikTok

    return {};

}

function format(data) {

    return {

        id: data.id,

        type: data.type,

        title: data.title,

        author: data.author,

        statistics: data.statistics,

        video: data.video,

        music: data.music,

        images: data.images

    };

}
