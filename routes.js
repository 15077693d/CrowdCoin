const routes = require('next-routes');

module.exports = routes()
    .add(pattern = '/campaigns/new', page = '/campaigns/new')
    .add(pattern = '/campaigns/:address', page = '/campaigns/show')
    .add(pattern = '/campaigns/:address/requests', page = '/campaigns/requests/index')
    .add(pattern = '/campaigns/:address/requests/new', page = '/campaigns/requests/new')

