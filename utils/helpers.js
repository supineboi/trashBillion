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

const formattedNumber = (val, isCurrency = false) => {
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
const generateListingId = () => Math.floor(100000 + Math.random() * 900000);

module.exports = {
    icons,
    formattedNumber,
    generateListingId
};