const { load } = require("../lib/loader");
const { success, error } = require("../lib/response");
const validator = require("../lib/validator");

module.exports = async (req, res) => {

    const start = Date.now();

    try {

        const slug = req.query.slug;

        if (!slug || !slug.length)
            return res.status(404).json(
                error("Endpoint tidak ditemukan.", 404, start)
            );

        const endpoint = slug[0].toLowerCase();

        const scraper = load(endpoint);

        if (!scraper)
            return res.status(404).json(
                error("Scraper tidak ditemukan.", 404, start)
            );

        const { url } = req.query;

        if (!url)
            return res.status(400).json(
                error("Parameter url wajib diisi.", 400, start)
            );

        // ==========================
        // VALIDATOR
        // ==========================

        switch (endpoint) {

            case "tiktok":
                if (!validator.tiktok(url))
                    return res.status(400).json(
                        error("URL TikTok tidak valid.", 400, start)
                    );
                break;

            case "instagram":
                if (!validator.instagram(url))
                    return res.status(400).json(
                        error("URL Instagram tidak valid.", 400, start)
                    );
                break;

            case "facebook":
                if (!validator.facebook(url))
                    return res.status(400).json(
                        error("URL Facebook tidak valid.", 400, start)
                    );
                break;

            case "mediafire":
                if (!validator.mediafire(url))
                    return res.status(400).json(
                        error("URL MediaFire tidak valid.", 400, start)
                    );
                break;

            case "pinterest":
                if (!validator.pinterest(url))
                    return res.status(400).json(
                        error("URL Pinterest tidak valid.", 400, start)
                    );
                break;

        }

        const result = await scraper(url);

        return res.status(200).json(
            success(result, start)
        );

    } catch (e) {

        return res.status(500).json(
            error(e.message, 500, start)
        );

    }

};
