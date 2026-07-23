const response = require("../lib/response");

module.exports = (req, res) => {

    const start = Date.now();

    res.status(200).json(response({

        start,

        result: {

            name: "ReyCloudAPI",

            version: "1.0.0",

            documentation: "/docs",

            endpoints: [

                "/api/tiktok?url=",
                "/api/instagram?url=",
                "/api/facebook?url=",
                "/api/mediafire?url=",
                "/api/pinterest?url="

            ]

        }

    }));

};
