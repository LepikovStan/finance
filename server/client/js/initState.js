module.exports = {
    user: {
        status: 'guest'
    },
    auth: false,
    mainmenu: {
        active: location.pathname || ''
    },
    categories: [],
    categoriesByType: {
        income: [],
        outgo: []
    },
    payments: {
        last: {},
        future: {}
    }
}
