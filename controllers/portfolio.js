const { Trash, Portfolio, Category, Order, OrderItem } = require("../models/sequelize");
const { generateId } = require("../utils/helpers");

exports.getPortfolio = async (req, res) => {
    const {id} = req.user;

    const userPortfolios = await Portfolio.findAll({
        where: {
            userId: id
        },
        include: {
            model: Trash,
            as: 'trash',
            include: {
                model: Category,
                as: 'category'
            }
        }
    });

    const formattedPorts = userPortfolios.map(({trashId, quantity, trash}) => ({
        id: trashId,
        title: trash.title,
        category: trash.category.name,
        quantity: Number(quantity),
        unit: trash.unit,
        icon: trash.category.icon,
        imageUrl: trash.imageUrl,
        price: Number(trash.valuation) * Number(quantity),
        growth: 0
    }))

    res.render('portfolio', {investments: formattedPorts});
}

exports.getCheckout =  async (req, res) => {
    const {id} = req.user;

    const userPortfolios = await Portfolio.findAll({
        where: {
            userId: id
        },
        include: {
            model: Trash,
            as: 'trash',
            include: {
                model: Category,
                as: 'category'
            }
        }
    });

    const formattedPorts = userPortfolios.map(({trashId, quantity, trash}) => ({
        id: trashId,
        title: trash.title,
        imageUrl: trash.imageUrl,
        icon: trash.category.icon,
        quantity: Number(quantity),
        unit: trash.unit,
        growth: 0,
        category: trash.category.name,
        price: Number(trash.valuation) * Number(quantity),
    }))

    res.render('portfolio/checkout', {portfolio: formattedPorts});
}

exports.successPage = async (req, res) => {
    const {id} = req.query;
    const userOrder = await Order.findOne({
        where: {id},
        include: {
            model: OrderItem,
            as: 'items'
        }
    });

    if(!userOrder || !userOrder instanceof Order){
        console.log("Order with this Id is not found");
    }

    const order = {
        orderNumber: userOrder.orderNumber,
        date: userOrder.createdAt.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }),
        status: userOrder.status,
        totalAmount: userOrder.totalAmount,
        items: userOrder.items
    }
    res.render('portfolio/success', {order});
}

exports.addToPortfolio = async (req, res) => {
    const {id} = req.user;
    const {
        listingId,
        quantity
    } = req.body

    if(!listingId){
        console.log("Selected List Id missing");
    }
    const [portfolio, created] = await Portfolio.findOrCreate({
        where: {trashId: +listingId},
        defaults: {
            userId: id,
            trashId: +listingId,
            quantity: +quantity
        }
    })

    if(!created){
        portfolio.quantity = Number(portfolio.quantity) + Number(quantity);
        await portfolio.save();
    }
    res.redirect('/trash')
}

exports.removePortfolio = async (req, res) => {
    const {id} = req.user;
    const {listingId} = req.body;

    const isDestroyed = await Portfolio.destroy({
        where: {
            userId: id,
            trashId: listingId
        }
    })

    if(!isDestroyed){
        console.log("Error while deleting!")
    }
    res.redirect('/portfolio')
}

exports.createOrder = async (req, res) => {
    const {id} = req.user;

    const portfolio = await Portfolio.findAll({
        where: {
            userId: id
        },
        include: {
            model: Trash,
            as: 'trash',
            include: {
                model: Category,
                as: 'category'
            }
        }
    })

    const totalAmount = portfolio.reduce(
        (sum, item) => sum + (Number(item.quantity) * Number(item.trash.valuation)), 
        0
    )
    const order = await Order.create({
        userId: id,
        orderNumber: generateId(),
        totalAmount: totalAmount
    })

    await Promise.all(portfolio.map( async ({quantity, trash}) => {
        await OrderItem.create({
            orderId: order.id,
            trashId: trash.id,
            title: trash.title,
            categoryName: trash.category.name,
            imageUrl: trash.imageUrl,
            icon: trash.category.icon,
            quantity,
            unit: trash.unit,
            unitValuation: trash.valuation,
            lineTotal: Number(trash.valuation) * Number(quantity)
        })
    }))

    await Portfolio.destroy({
        where: {
            userId: id
        }
    })
    res.redirect(`/portfolio/success?id=${order.id}`)
}