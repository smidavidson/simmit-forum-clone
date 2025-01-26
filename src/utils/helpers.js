export function displayUrl(url) {
    let cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.length > 25 ? `${cleanUrl.slice(0, 25)}...` : cleanUrl;
}

