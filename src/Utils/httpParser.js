export const httpParser = (url) => {
    if (url?.startsWith("http://") || url?.startsWith("https://")) {
        return url;
    } else {
        return "https://" + url;
    }
};
