exports.success = (result) => ({
    success: true,
    creator: "ReyCloudAPI",
    result
});

exports.error = (message) => ({
    success: false,
    message
});
