const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { BeilinsonOrders } = require('../models/BeilinsonOrders');


// => localhost:3000/BeilinsonOrders/
router.get('/', (req, res) => {
    BeilinsonOrders.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving BeilinsonOrders :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        BeilinsonOrders.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving BeilinsonOrders :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var stk = new BeilinsonOrders({
        HospitalName:req.body.HospitalName,
        A: req.body.A,
        B: req.body.B,
        AB: req.body.AB,
        O: req.body.O,
        Am:req.body.Am,
        Bm:req.body.Bm,
        ABm:req.body.ABm,
        Om:req.body.Om,
        stock:req.body.stock,
        Date:req.body.Date,
    });
    stk.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in BeilinsonOrders Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var stk = {
        HospitalName:req.body.HospitalName,
        A: req.body.A,
        B: req.body.B,
        AB: req.body.AB,
        O: req.body.O,
        Am:req.body.Am,
        Bm:req.body.Bm,
        ABm:req.body.ABm,
        Om:req.body.Om,
        stock:req.body.stock,
        Date:req.body.Date,
    };
    BeilinsonOrders.findByIdAndUpdate(req.params.id, { $set: stk }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in BeilinsonOrders Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        BeilinsonOrders.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in BeilinsonOrders Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message:"Data to update cannot be empty!"
        });
    }
}

router.get("/",(req, res) =>{
    BeilinsonOrders.aggregate(
    [
      {
        $group: {
          
          total: {
            $sum: "$A"
          }
        }
      }
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});





//Stock.findOne({'A'})


module.exports = router;