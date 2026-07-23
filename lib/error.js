const response = require("./response");

module.exports = (res, err, start) => {

    return res.status(500).json(response({

        success: false,

        status: 500,

        message: err.message,

        start

    }));

};
