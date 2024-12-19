function timeAgo(timestamp: string) {
    const now = new Date();
    const createdAt = new Date(timestamp);

    const seconds = Math.floor((Number(now) - Number(createdAt)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `Posted ${interval} yr${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `Posted ${interval} mo${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `Posted ${interval} day${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `Posted ${interval} hr${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `Posted ${interval} min${interval === 1 ? "" : "s"} ago`;

    return "Posted Just Now";
}

export default timeAgo;
