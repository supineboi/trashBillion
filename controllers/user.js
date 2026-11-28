const {User, Order, OrderItem} = require("../models/sequelize")
const { formatDate } = require("../utils/helpers")

exports.loginPage = (req,res) => {
    res.render('user/login', {
        path: "user/login"
    })
}

exports.signupPage = (req,res) => {
    res.render('user/signup', {
        path: "user/signup"
    })
}

exports.signup = async (req,res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } = req.body;

    const [user, created] = await User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            firstName,
            lastName,
            email,
            password
        }
    })

    if(created){
        console.log("User already exists :: ",user)
    } else {
        console.log("User created successfully :: ", user)
    }
    res.redirect("/user/login");
}

exports.login =  async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });

    if(user && user instanceof User){
        if(user.password === password){
            return res.redirect('/?isLoggedIn=true')
        }
        return res.render('user/login', {
            path: "/user/login",
            error: "Invalid Password"
        })
    }
    return res.render('user/login', {
        path: "/user/login",
        error: "Invalid Credentials"
    })
}

exports.orderPage = async (req,res) => {
    const {id} = req.user;
    const userOrders = await Order.findAll({
        where: {userId: id},
        include: {
            model: OrderItem,
            as: 'items'
        }
    });

    if(!userOrders || !userOrders instanceof Order){
        console.log("Order with this Id is not found");
    }

    const orders = userOrders.map( order => ({
        ...order.toJSON(),
        itemCount: order.items?.length
    }))
    res.render('user/orders', {orders});
}

exports.orderDetails = async (req, res) => {
    const {id} = req.params;
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
        date: formatDate(userOrder.createdAt),
        status: userOrder.status,
        totalAmount: userOrder.totalAmount,
        items: userOrder.items
    }
    res.render('user/order-details', {order})
}

exports.getProfile = (req, res) => {
    const user = {
        ...req.user,
        totalListings: 8,
        activeListings: 6,
        totalOrders: 3,
        createdAt: formatDate(req.user.createdAt)
    };

    res.render('user/profile', {user});
}