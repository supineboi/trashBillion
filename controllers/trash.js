const { generateId, icons, formatNumber } = require('../utils/helpers');
const {Trash, Category, User} = require('../models/sequelize');

exports.getList = async (req,res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    
    const trashList = await Trash.findAll();
    res.render('trash/list', { items: trashList.map(trash => ({
        ...trash.toJSON(),
        quantity: formatNumber(trash.quantity),
        growth: formatNumber(trash.growth),
        valuation: formatNumber(trash.valuation, true)
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

exports.trashPage = async (req,res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'sell.html'));
    const categories = await Category.findAll();
    res.render('trash/sell', {path: '/trash/sell', categories});
}

exports.createTrash = async (req, res) => {
    const user = req.user;
    const {
        title,
        categoryId,
        description,
        quantity,
        unit,
        valuation,
        location,
        discoveryContext,
        imageUrl
    } = req.body;
    let sellerId = req.body.sellerId;

    if(!sellerId){
        sellerId = user.id
    }

    await Trash.create({
        id: generateId(),
        title,
        description,
        quantity,
        unit,
        valuation,
        location,
        discoveryContext,
        imageUrl,
        categoryId,
        sellerId
    });
    // res.status(200).sendFile(path.join(__dirname, '..', 'views', 'sellList.html'));
    res.redirect('/trash');
}