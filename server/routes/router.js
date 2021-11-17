const express = require('express');
const controller = require('../controllers/controller');
const { homeRoutes, addUser, updateUser } = require('../services/render');

const route = express.Router();

route.get('/', homeRoutes);

route.get('/add-user', addUser);

route.get('/update-user', updateUser);

//api
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route;