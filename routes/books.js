var express =  require('express');
var router = express.Router();
var db =  require('../db');

//Create
router.route("/")
    .post((req,res)=>{

      var getNewId=()=>{
        return new Promise((resolve,reject)=>{
            db.Book.count({})
            .then((count)=>{
              resolve(count+1) 
            })
            .catch((err)=>{
              reject(err)
            })
          });
      }
        
      getNewId()
      .then((newId)=>{
        req.body._id=newId;
        console.log(req.body)
        var newBook = new db.Book(req.body);

        newBook.save()
          .then((newBook)=>{
            res.status(200).send(newBook)
          })
          .catch((err)=>{
            res.status(500).send(err);
          });
        });
    })
    .get((req,res)=>{
        db.Book.find({})
        .then((books)=>{
            res.status(200).send(books);
        })
        .catch((err)=>{
          res.status(500).send(err);
        });
    })
  
    router.route("/search/:term")
    .get((req,res)=>{
        var term = req.params.term;
        const regex = new RegExp(term.toLowerCase().trim(), 'i')

        db.Book.find({title:regex})
        .then((books)=>{
          res.status(200).send(books);
        })
        .catch((err)=>{
          res.status(500).send(err);
        });
    })

  //Read single book
  router.route("/:id")
    .get((req,res)=>{
        var id = req.params.id;
        db.Book.findById(id,(err,book)=>{
          if(err) res.status(500).send(err);
          res.status(200).send(book);
        })
    })
    .put((req,res)=>{
      var id = req.params.id;
      var options={
        new:true
      }
  
      db.Book.findByIdAndUpdate(id,{$set:{"title":req.body.title}},options)
      .then((book)=>{
        res.status(200).send(book)
      })
      .catch((err)=>{
        res.status(500).send(err);
      });
  
      // db.Book.findByIdAndUpdate(id,req.body,(err,book)=>{
      //   if(err) res.status(500).send(err);
      //   res.status(200).send(book);
      // })
    })
    .delete((req,res)=>{
      var id = req.params.id;
  
      db.Book.deleteOne({_id:id})
      .then((book)=>{
        res.status(200).send(book)
      })
      .catch((err)=>{
        res.status(500).send(err);
      });
    })

  module.exports = router;