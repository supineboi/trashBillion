const path = require('path');
const fs = require('fs');
const { generateListingId, icons, formattedNumber } = require('../utils/helpers');
const Trash = require('../models/sequelize/trash');

exports.getList = async (req,res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    const trashList = await Trash.findAll();
    res.render('trash/list', { items: trashList.map(trash => ({
        ...trash.toJSON(),
        quantity: formattedNumber(trash.quantity),
        growth: formattedNumber(trash.growth),
        valuation: formattedNumber(trash.valuation, true)
    })) });
}

exports.getTrash = async (req,res, next) => {
    const {id} = req.params;
    const trash = await Trash.findByPk(id);

    if(trash && Object.keys(trash).length){
        return res.render('trash/details', {
            item: trash
        })
    }
    return next();

}

exports.trashPage = (req,res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'sell.html'));
    res.render('trash/sell', {path: '/trash/sell', icons: icons});
}

exports.createTrash = async (req, res) => {
    console.log('creating trash with :: ', req.body)
    await Trash.create({
        ...req.body,
        id: generateListingId()
    });
    // res.status(200).sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    res.redirect('/trash');
}