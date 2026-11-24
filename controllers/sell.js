const path = require('path');
const fs = require('fs');
const { generateListingId, icons } = require('../utils/helpers');

exports.getList = (req,res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    const sellList = fs.readFileSync(path.join(__dirname, '..', 'data', 'sell', 'list.json'));
    const sellData = JSON.parse(sellList);
    res.render('sellList', { items: sellData });
}

exports.sellPage = (req,res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'sell.html'));
    res.render('sell', {path: '/sell', icons: icons});
}

exports.createSell = (req, res) => {
    const { title, icon, category, description, quantity, unit, location, phone } = req.body;
    const sellList = fs.readFileSync(path.join(__dirname, '..', 'data', 'sell', 'list.json'));
    const sellData = JSON.parse(sellList);

    const newSellItem = {
        id: generateListingId(),
        title,
        icon,
        category,
        description,
        quantity,
        unit,
        location,
        phone
    };

    sellData.push(newSellItem);

    fs.writeFileSync(path.join(__dirname, '..', 'data', 'sell', 'list.json'), JSON.stringify(sellData, null, 2));   

    // res.status(200).sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    res.redirect('/sell/list');
}