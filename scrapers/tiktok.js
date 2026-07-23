const axios = require("axios");

const browser = axios.create({
    baseURL: "https://www.tikwm.com",
    timeout: 30000,
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Origin": "https://www.tikwm.com",
        "Referer": "https://www.tikwm.com/"
    }
});

module.exports = async (url) => {

    if (!url)
        throw new Error("Parameter url wajib diisi.");

    const cookie = await getCookie();

    const payload = new URLSearchParams({
        url,
        hd: "1"
    });

    let data;

    try {

        const res = await browser.post(
            "/api/",
            payload.toString(),
            {
                headers: {
                    Cookie: cookie,
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }
        );

        data = res.data;

    } catch (e) {

        throw new Error("Gagal terhubung ke TikWM.");

    }

    if (!data || data.code !== 0)
        throw new Error(data?.msg || "Scrape gagal.");

    return format(data.data);

};

async function getCookie() {

    try {

        const res = await browser.get("/");

        return (res.headers["set-cookie"] || [])
            .map(v => v.split(";")[0])
            .join("; ");

    } catch {

        return "";

    }

}

function format(x) {

    return {

        id: x.id,

        type: x.images?.length
            ? "image"
            : "video",

        title: x.title,

        create_time: x.create_time,

        region: x.region,

        duration: x.duration,

        author: {

            id: x.author?.id,

            username: x.author?.unique_id,

            nickname: x.author?.nickname,

            avatar: x.author?.avatar

        },

        statistics: {

            views: x.play_count,

            likes: x.digg_count,

            comments: x.comment_count,

            shares: x.share_count,

            downloads: x.download_count

        },

        video: {

            no_watermark: x.play,

            watermark: x.wmplay,

            hd: x.hdplay,

            cover: x.cover,

            origin_cover: x.origin_cover

        },

        music: {

            id: x.music_info?.id,

            title: x.music_info?.title,

            author: x.music_info?.author,

            album: x.music_info?.album,

            url: x.music

        },

        images: x.images || []

    };

}
