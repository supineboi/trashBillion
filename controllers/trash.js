const path = require('path');
const fs = require('fs');
const { generateListingId, icons } = require('../utils/helpers');
const Trash = require('../models/trash');

exports.getList = (req,res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    const trashList = Trash.readAll();
    res.render('trash/list', { items: trashList });
}

exports.getTrash = (req,res, next) => {
    const {id} = req.params;
    const trash = Trash.read(+id);

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

exports.createTrash = (req, res) => {
    Trash.create({
        ...req.body,
        id: generateListingId()
    });
    // res.status(200).sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    res.redirect('/trash');
}