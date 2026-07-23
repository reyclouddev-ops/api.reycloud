exports.url = (url) => {

    if (!url)
        throw new Error("Parameter url wajib diisi.");

    try {

        new URL(url);

        return true;

    } catch {

        throw new Error("URL tidak valid.");

    }

};

exports.tiktok = (url) => {

    const regex =
        /^https?:\/\/(www\.)?(vt\.tiktok\.com|vm\.tiktok\.com|tiktok\.com)\//i;

    return regex.test(url);

};
