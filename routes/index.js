const express = require('express'),
     router = express.Router(),
ParksModel = require('../Models/parks');
/* GET home page. */
router.get('/', async (req, res, next)  => {
  const parkList = await ParksModel.getAll();

  res.render('template', { 
    locals:{
       title: 'Enjoy Nature my friends', 
       data: parkList,
       isLoggedIn : req.session.is_logged_in,
       userName: req.session.first_name
      },
      partials: {
        partial: 'partial-index'
      }
  });
});

router.get('/:park_id', async (req, res, next) => {
  const {park_id} = req.params;
  const  thePark = await ParksModel.getById(park_id);
  console.log("the park data:",thePark);

  res.render('template', { 
    locals:{
       title: 'Enjoy Nature my friends', 
       data: thePark,
       isLoggedIn: req.session.is_logged_in,
       userName: req.session.first_name
      },
      partials: {
        partial: 'partial-single-park'
      }
  });
})
module.exports = router;
