const axios = require("axios");

const client = axios.create({
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36"
    },
    timeout: 30000
});

async function instagram(url) {

    if (!url)
        throw new Error("URL Instagram wajib diisi.");

    const clean = url.split("?")[0].replace(/\/$/, "");

    const { data } = await client.get(clean + "/?__a=1&__d=dis");

    const media =
        data.items?.[0] ||
        data.graphql?.shortcode_media ||
        data;

    if (!media)
        throw new Error("Media tidak ditemukan.");

    const isVideo =
        media.is_video ??
        media.media_type === 2;

    const carousel =
        media.edge_sidecar_to_children?.edges ||
        media.carousel_media ||
        [];

    return {
        id: media.id,

        type: carousel.length
            ? "carousel"
            : isVideo
            ? "video"
            : "image",

        caption:
            media.edge_media_to_caption?.edges?.[0]?.node?.text ||
            media.caption?.text ||
            "",

        author: {
            username:
                media.owner?.username ||
                media.user?.username,

            fullname:
                media.owner?.full_name ||
                media.user?.full_name,

            avatar:
                media.owner?.profile_pic_url ||
                media.user?.profile_pic_url
        },

        stats: {
            likes:
                media.edge_media_preview_like?.count ||
                media.like_count,

            comments:
                media.edge_media_to_comment?.count ||
                media.comment_count
        },

        video: isVideo
            ? media.video_url
            : null,

        image:
            media.display_url ||
            media.image_versions2?.candidates?.[0]?.url,

        carousel: carousel.map(x => ({
            type:
                x.node?.is_video ||
                x.media_type === 2
                    ? "video"
                    : "image",

            url:
                x.node?.video_url ||
                x.node?.display_url ||
                x.image_versions2?.candidates?.[0]?.url
        }))
    };
}

module.exports = instagram;
