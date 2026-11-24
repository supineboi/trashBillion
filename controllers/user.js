const User = require("../models/user")

exports.loginPage = (req,res) => {
    res.render('login', {
        path: "/user/login"
    })
}

exports.signupPage = (req,res) => {
    res.render('signup', {
        path: "/user/signup"
    })
}

exports.signup = (req,res) => {
    User.create(req.body);
}

exports.login = (req, res) => {
    const {email, password} = req.body;
    const users = User.read();

    const user = users.find( user => user.email === email)

    if(user && Object.keys(user).length){
        if(user.password === password){
            return res.redirect('/')
        }
        return res.render('login', {
            path: "/user/login",
            error: "Invalid Password"
        })
    }
    return res.render('login', {
        path: "/user/login",
        error: "Invalid Credentials"
    })
}