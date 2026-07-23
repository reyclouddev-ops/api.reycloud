const axios = require("axios");

const browser = axios.create({
    headers: {
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
        accept: "*/*",
        origin: "https://www.tikwm.com",
        referer: "https://www.tikwm.com/"
    },
    timeout: 30000
});

async function tiktok(url) {

    if (!url) throw new Error("URL kosong.");

    // Ambil cookie terlebih dahulu
    const home = await browser.get("https://www.tikwm.com/");

    const cookies = home.headers["set-cookie"]
        ?.map(v => v.split(";")[0])
        .join("; ");

    // Request API TikWM
    const payload = new URLSearchParams({
        url,
        hd: "1"
    });

    const { data } = await browser.post(
        "https://www.tikwm.com/api/",
        payload.toString(),
        {
            headers: {
                cookie: cookies,
                "content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }
    );

    if (data.code !== 0)
        throw new Error(data.msg);

    const x = data.data;

    return {
        id: x.id,
        type: x.images?.length ? "image" : "video",

        title: x.title,

        author: {
            id: x.author.id,
            username: x.author.unique_id,
            nickname: x.author.nickname,
            avatar: x.author.avatar
        },

        stats: {
            views: x.play_count,
            likes: x.digg_count,
            comments: x.comment_count,
            shares: x.share_count
        },

        video: {
            nowm: x.play,
            wm: x.wmplay,
            hd: x.hdplay,
            cover: x.cover
        },

        music: {
            title: x.music_info?.title,
            author: x.music_info?.author,
            url: x.music
        },

        images: x.images || []
    };

}

module.exports = tiktok;
