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
    return /^https?:\/\/(www\.)?(vt\.tiktok\.com|vm\.tiktok\.com|m\.tiktok\.com|tiktok\.com)\//i.test(url);
};

exports.instagram = (url) => {
    return /^https?:\/\/(www\.)?instagram\.com\/(reel|p|tv)\//i.test(url);
};

exports.facebook = (url) => {
    return /^https?:\/\/(www\.)?(facebook\.com|fb\.watch|fb\.com)\//i.test(url);
};

exports.mediafire = (url) => {
    return /^https?:\/\/(www\.)?mediafire\.com\//i.test(url);
};

exports.pinterest = (url) => {
    return /^https?:\/\/(www\.)?(pinterest\.com|pin\.it)\//i.test(url);
};

exports.youtube = (url) => {
    return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
};

exports.twitter = (url) => {
    return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\//i.test(url);
};

exports.capcut = (url) => {
    return /^https?:\/\/(www\.)?capcut\.com\//i.test(url);
};

exports.spotify = (url) => {
    return /^https?:\/\/(open\.)?spotify\.com\//i.test(url);
};

exports.github = (url) => {
    return /^https?:\/\/(www\.)?github\.com\//i.test(url);
};
