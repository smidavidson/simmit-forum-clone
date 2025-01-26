import { formatDistance } from "date-fns";

export function displayUrl(url) {
    let cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.length > 25 ? `${cleanUrl.slice(0, 25)}...` : cleanUrl;
}

export function formatDistancePost(created_at) {
    return formatDistance(new Date(created_at), new Date(), {
        addSuffix: true,
    });
}
