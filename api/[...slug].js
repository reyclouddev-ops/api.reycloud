const { load } = require("../lib/loader");
const { success, error } = require("../lib/response");

module.exports = async (req, res) => {

    try {

        const slug = req.query.slug;

        if (!slug || !slug.length)
            return res.status(404).json(error("Endpoint tidak ditemukan."));

        const scraper = load(slug[0]);

        if (!scraper)
            return res.status(404).json(error("Scraper tidak ditemukan."));

        const url = req.query.url;

        if (!url)
            return res.status(400).json(error("Parameter url wajib diisi."));

        const result = await scraper(url);

        res.status(200).json(success(result));

    } catch (e) {

        res.status(500).json(error(e.message));

    }

};
