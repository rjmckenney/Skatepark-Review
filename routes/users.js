const express = require('express');
bcrypt = require('bcryptjs'),
 router = express.Router();

 const UserModel = require('../Models/user');

router.get("/login", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Login"
        },
        partials: {
            partial: "partial-login"
        }
    });
});

router.get("/signup", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Sign Up"
        },
        partials: {
            partial: "partial-sign"
        }
    });
});

router.post("/signup", async (req, res, next) => {
    console.log(req.body);
    const{ first_name, last_name, email }  = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel(first_name, last_name, email, hash);

     const addUser = await user.save();
     console.log(addUser);
    res.status(200).redirect("/");
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = new UserModel(null, null, email, password);
  const response = await user.login();

  
    console.log(response);

  if(!!response.isValid){
    const { id, first_name, last_name} = response;
    req.session.is_logged_in = true;
    req.session.first_name = first_name;
    req.session.last_name = last_name;
    req.session.user_id = id;
    res.status(200).redirect('/');
    
  } else{
     res.sendStatus(401);
  }

  
});

module.exports = router;
