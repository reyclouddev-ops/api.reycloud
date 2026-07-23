module.exports = (req, res) => {

    return res.json({
        url: req.url,
        query: req.query
    });

};
