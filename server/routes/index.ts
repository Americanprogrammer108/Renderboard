import express from 'express';
import Contact from "../Models/contact";

const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});


router.get('/contact-list', function(req, res, next) {

  Contact.find().then(function(contacts )
  {
    console.log(contacts);
    res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName : ""});
  }).catch(function(err)
  {
    console.error("Encountered an error reading from the database: " + err);
    res.end();
  })
//week12-1 still continues to run



});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page: 'register', displayName : ""});
});

router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Our Products', page: 'products', displayName : ""});
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services', page: 'services', displayName : ""});
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About', page: 'about', displayName : ""});
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page: 'contact', displayName : ""});
});

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  Contact.findById(id).then(function(contact: any)
  {
    res.render('index', { title: 'Edit', page: 'edit', contact: contact, displayName : ""});
  }).catch(function(err : any)
  {

  });

});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  let updateContact = new Contact(
  {
    "id": id,
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  });

  Contact.updateOne({id: id}, updateContact).then(function(contact: any)
  {
    res.redirect("/contact-list");
  }).catch(function(err)
  {
    res.end(err)
  });

});

router.post('/add', function(req, res, next) {

  let newContact = new Contact(
  {
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  });

  Contact.create(newContact).then(function()
  {
    res.redirect("/contact-list");
  }).catch(function(err : any)
  {
    console.error("Encountered an error updating contact to eh database: " + err);
    res.end();
  });

});

router.get('/add', function(req, res, next) {
  res.render('index', { title: 'Add', contact: "", page: 'edit', displayName : ""});
});

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id;
  Contact.deleteOne({id: id}).then(function(contact)
  {
    res.redirect("./contact-list");
  }).catch(function(err)
  {
    console.error("Encountered an error deleting contact from the database: " + err);
    res.end();
  })
  res.render('index', { title: 'Add', contact: "", page: 'edit', displayName : ""});
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page: 'login', displayName : ""});
});


export default router;
