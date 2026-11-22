function generateListingId() {
    return Math.floor(100000 + Math.random() * 900000);
}

const icons = [
    "🧴",
    "📰",
    "🗑️",
    "♻️",
    "🔌",
    "🛢️",
    "🪵",
    "🧹",
    "🧺",
    "🛍️",
    "🪣",
    "🪠",
    "🧻",
    "🧼",
    "🧽"
];

module.exports = {
    generateListingId,
    icons
};