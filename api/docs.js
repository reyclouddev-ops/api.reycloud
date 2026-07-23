const { success } = require("../lib/response");

module.exports = (req, res) => {

    const start = Date.now();

    res.status(200).json(success({

        name: "ReyCloudAPI",

        description: "Simple REST API for Downloader & Tools",

        version: "1.0.0",

        baseURL: `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`,

        documentation: "/api/docs",

        endpoints: [

            {
                name: "TikTok Downloader",
                method: "GET",
                endpoint: "/api/tiktok",
                query: {
                    url: "https://vt.tiktok.com/xxxxx"
                }
            },

            {
                name: "Instagram Downloader",
                method: "GET",
                endpoint: "/api/instagram",
                query: {
                    url: "https://www.instagram.com/reel/xxxxx/"
                }
            },

            {
                name: "Facebook Downloader",
                method: "GET",
                endpoint: "/api/facebook",
                query: {
                    url: "https://facebook.com/..."
                }
            },

            {
                name: "MediaFire Downloader",
                method: "GET",
                endpoint: "/api/mediafire",
                query: {
                    url: "https://www.mediafire.com/file/..."
                }
            },

            {
                name: "Pinterest Downloader",
                method: "GET",
                endpoint: "/api/pinterest",
                query: {
                    url: "https://pin.it/..."
                }
            }

        ]

    }, start));

};
