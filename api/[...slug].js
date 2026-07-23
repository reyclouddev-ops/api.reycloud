const { load } = require("../lib/loader");
const { success, error } = require("../lib/response");
const validator = require("../lib/validator");

module.exports = async (req, res) => {

    const start = Date.now();

    try {

        // ==========================
        // GET ENDPOINT
        // ==========================

        let slug = req.query.slug || req.query["...slug"];

        if (!slug)
            return res.status(404).json(
                error("Endpoint tidak ditemukan.", 404, start)
            );

        if (Array.isArray(slug))
            slug = slug[0];

        const endpoint = String(slug).toLowerCase();

        // ==========================
        // LOAD SCRAPER
        // ==========================

        const scraper = load(endpoint);

        if (!scraper)
            return res.status(404).json(
                error("Scraper tidak ditemukan.", 404, start)
            );

        // ==========================
        // GET URL
        // ==========================

        const { url } = req.query;

        if (!url)
            return res.status(400).json(
                error("Parameter url wajib diisi.", 400, start)
            );

        // ==========================
        // VALIDATOR
        // ==========================

        const validate = validator[endpoint];

        if (typeof validate === "function") {

            if (!validate(url))
                return res.status(400).json(
                    error(`URL ${endpoint} tidak valid.`, 400, start)
                );

        } else {

            validator.url(url);

        }

        // ==========================
        // RUN SCRAPER
        // ==========================

        const result = await scraper(url);

        return res.status(200).json(
            success(result, start)
        );

    } catch (e) {

        console.error(e);

        return res.status(500).json(
            error(e.message || "Internal Server Error", 500, start)
        );

    }

};
