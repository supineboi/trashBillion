const User = require("../models/user")

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

exports.signup = (req,res) => {
    User.create(req.body);
    res.redirect("/user/login");
}

exports.login = (req, res) => {
    const {email, password} = req.body;
    const users = User.read();

    const user = users.find( user => user.email === email)

    if(user && Object.keys(user).length){
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