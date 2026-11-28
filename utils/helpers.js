require('dotenv').config();

const CURRENCY = process.env.CURRENCY || 'INR';

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

const formatNumber = (val, isCurrency = false) => {
    const options = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };

    if(isCurrency){
        options.style = "currency";
        options.currency = CURRENCY;
    }
    return Number(val).toLocaleString("en-IN", options )
};
const generateId = () => Math.floor(100000 + Math.random() * 900000);

const formatDate = (date) => date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
})

module.exports = {
    icons,
    formatNumber,
    generateId,
    formatDate
};