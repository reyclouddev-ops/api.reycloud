exports.success = (result = null, start = Date.now()) => ({
    success: true,
    status: 200,
    message: "OK",
    creator: "ReyCloudAPI",
    version: "1.0.0",
    runtime: `${Date.now() - start}ms`,
    result
});

exports.error = (message = "Internal Server Error", status = 500, start = Date.now()) => ({
    success: false,
    status,
    message,
    creator: "ReyCloudAPI",
    version: "1.0.0",
    runtime: `${Date.now() - start}ms`,
    result: null
});
