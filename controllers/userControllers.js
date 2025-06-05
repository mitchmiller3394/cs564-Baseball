
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        await user.save();
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Registered Successfully');
            res.redirect('/');
        })
    } catch (e) {
        if (e.code === 11000 && e.keyValue.email) {
            req.flash('error', 'The email you input is already registered!');
            res.redirect('/register');
        } else {
            req.flash('error', e.message);
            res.redirect('/register');
        }
    }
}

module.exports.updateUser = async (req, res) => {
    const user = req.user;
    user.profilePic.filename = req.file.filename;
    user.profilePic.url = req.file.path;
    await user.save();
    res.redirect('/')
}

module.exports.loginUser = (req, res) => {
    const redirectURL = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectURL);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', 'Logout Succesful');
        res.redirect('/');
    })
}