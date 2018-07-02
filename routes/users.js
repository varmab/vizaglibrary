var express =  require('express');
var router = express.Router();


//Users API



//Create
router.route("/")
    .post((req,res)=>{
        var newUser = new db.User(req.body);
        newUser.save((err,user)=>{
        if(err) res.status(500).send(err);
        res.status(200).send(user);
        })
    })
    .get((req,res)=>{
        db.User.find({},(err,users)=>{
        if(err) res.status(500).send(err);
        res.status(200).send(users);
        })
    })
  
  //Update
  router.route("/:id")
    .put((req,res)=>{
        var id = req.params.id;
        var options={
        new:true
        }
  
        db.User.findByIdAndUpdate(id,{$set:{"name":req.body.name}},options,(err,user)=>{
        if(err) res.status(500).send(err);
        res.status(200).send(user);
        })
    
        // db.Book.findByIdAndUpdate(id,req.body,(err,book)=>{
        //   if(err) res.status(500).send(err);
        //   res.status(200).send(book);
        // })
    })
    .delete((req,res)=>{
        var id = req.params.id;
    
        db.User.deleteOne({_id:id},(err,user)=>{
        if(err) res.status(500).send(err);
        res.status(200).send(user);
        })
    })

  module.exports = router;