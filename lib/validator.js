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
