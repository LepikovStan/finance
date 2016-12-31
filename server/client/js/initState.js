module.exports = {
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
