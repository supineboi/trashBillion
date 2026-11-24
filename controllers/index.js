exports.getHomePage = (req,res) => {
    const {isLoggedIn} = req.query;
    // res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    res.render('index', {
        isLoggedIn: isLoggedIn
    });
}