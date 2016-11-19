module.exports = (req, res, next) => {
    console.log('user');
    req.user = {
        name: 'User'
    }
    next();
}
