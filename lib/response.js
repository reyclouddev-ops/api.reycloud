module.exports = function ({
    success = true,
    status = 200,
    message = "OK",
    result = null,
    start = Date.now()
}) {

    return {
        success,
        status,
        message,
        creator: "ReyCloudAPI",
        version: "1.0.0",
        runtime: `${Date.now() - start}ms`,
        result
    };

};
