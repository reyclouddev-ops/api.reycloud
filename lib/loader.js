const fs = require("fs");
const path = require("path");

exports.load = (name) => {

    const file = path.join(
        process.cwd(),
        "scrapers",
        `${name}.js`
    );

    if (!fs.existsSync(file))
        return null;

    return require(file);

};
