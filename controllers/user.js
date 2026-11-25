const User = require("../models/mysql/user")

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
    await User.create(req.body);
    res.redirect("/user/login");
}

exports.login =  async (req, res) => {
    const {email, password} = req.body;
    console.log("this is email :: ", email)
    const user = await User.read(email);

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