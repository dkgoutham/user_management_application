const axios = require('axios');

module.exports.homeRoutes = (req, res)=>{
    axios.get('http://localhost:3000/api/users')
        .then(response=>{
            // console.log(response);
            res.render('index', {users: response.data});
        })
        .catch(err=>{
            console.log(err);
        })
};
module.exports.updateUser = (req, res)=>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        });
};
module.exports.addUser = (req, res)=>{
    res.render('add_user');
};