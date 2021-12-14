//jshint esversion:6

function login_register(req, res, type){
  // check what got sent
  console.log(req.body);
  console.log(Object.keys(req.body));

  // grab email and password
  let email = req.body.userEmail;
  let password = req.body.userPassword;

  // did the person login?
  if (Object.keys(req.body).includes("loginBtn")){

    // does this person already exist?
    Profile.find({email: email, password: password},function(err, profiles){
      if (err) console.log(err);

      // person exists
      else if (profiles){
        emailKey = profiles[0].email;

        // check profile type
        if (type === "vendor") res.redirect("/vendorEditMenu");
        else if (type === "user") res.redirect("/userAccountPage");
        else res.redirect("/adminHome");
      }
      // otherwise this person doesnt exist and we can send them back to the login
      else{
        if (type === "vendor") res.render("vendorLogin");
        else res.render("/userLogin");
      }
    });
  }
  // did the person register?
  else if (Object.keys(req.body).includes("registerBtn")){

    // does the person already exist?
    Profile.find({email: email}, function(err, profiles){
      if (err) console.log(err);

      // if they do, send them back to the login screen
      else if (profiles){
        if (type === "vendor") res.render("vendorLogin");
        else res.render("/userLogin");
      }
      // otherwise let them register
      else {
        // check who is registering
        if (type === vendor){
          //put info into model
          const profile = new Profile({
            type: "vendor",
            first: req.body.registerFirstName,
            last: req.body.registerLastName,
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            restaurant: req.body.registerRestaurantName,
            approved: 0,
            address: ""
          });
          // insert record into profile table
          profile.save();

          //create a sample menu page
          const menu = new Menu({
            vendorEmail: req.body.registerEmail,
            sections: [{
                title: "Section1",
                items: [{
                    name: "Food Name1",
                    calories: 123,
                    price: 9.99,
                    image: "https://media.istockphoto.com/vectors/slice-of-melted-cheese-pepperoni-pizza-vector-id901501348",
                    availability: 1
                  },
                  {
                    name: "Food Name2",
                    calories: 456,
                    price: 9.99,
                    image: "https://media.istockphoto.com/vectors/hot-dog-with-mustard-hand-drawing-vector-id1146404440?k=20&m=1146404440&s=612x612&w=0&h=qx-qtPEiMs7TAiqnHqQU0MB2bJsP9sUWgynwoQAAjyg=",
                    availability: 1
                  },
                  {
                    name: "Food Name3",
                    calories: 789,
                    price: 9.99,
                    image: "https://fortheloveofcooking.net/wp-content/uploads/2017/02/sandwich-clipart-burger_sandwich_PNG4138.png",
                    availability: 1
                  },
                  {
                    name: "Food Name4",
                    calories: 100,
                    price: 9.99,
                    image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
                    availability: 0
                  }
                ]
              },
              {
                title: "Section2",
                items: [{
                  name: "Food Name4",
                  calories: 100,
                  price: 9.99,
                  image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
                  availability: 0
                }]
              }
            ]
          });
          //insert into database
          menu.save();
          res.render("vendorLogin");
        }
        else {
          //put info into model
          const profile = new Profile({
            type: "user",
            first: req.body.registerFirstName,
            last: req.body.registerLastName,
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            restaurant: "",
            approved: 0,
            address: req.body.registerAddress
          });
          // insert record into profile table
          profile.save();
          res.render("userLogin");
        }
      }
    });
  }
}
