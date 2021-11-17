var userDB = require('../models/model');

module.exports.create = (req, res)=>{
    //validate request
    
    if(!req.body/*case when the body is empty */){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }
    //new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the database
    user.save()
        .then(data=>{
            res.redirect('/');
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message||'Some error occurred'
            });
        });
}
module.exports.find = (req, res)=>{
    if(req.query.id/* for singleuser */){
        const id = req.query.id;
        userDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
    }else{
        userDB.find()
        .then(u=>{
            res.send(u);
        }) 
        .catch(er=>{
            res.status(500).send(er.message||'Error occured while retrieving the data');
        }) 
    }
}
module.exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({message:'Data to update cannot be empty'})
    }
    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Cannot update with user id - ${id}`});
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:'Error'});
        })
}
module.exports.delete = (req, res)=>{
    const id = req.params.id;

    userDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}