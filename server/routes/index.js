"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_1 = __importDefault(require("../Models/contact"));
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/contact-list', function (req, res, next) {
    contact_1.default.find().then(function (contacts) {
        console.log(contacts);
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: "" });
    }).catch(function (err) {
        console.error("Encountered an error reading from the database: " + err);
        res.end();
    });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: "" });
});
router.get('/products', function (req, res, next) {
    res.render('index', { title: 'Our Products', page: 'products', displayName: "" });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', displayName: "" });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About', page: 'about', displayName: "" });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: "" });
});
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id).then(function (contact) {
        res.render('index', { title: 'Edit', page: 'edit', contact: contact, displayName: "" });
    }).catch(function (err) {
    });
});
router.post('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    let updateContact = new contact_1.default({
        "id": id,
        "FullName": req.body.FullName,
        "ContactNumber": req.body.ContactNumber,
        "EmailAddress": req.body.EmailAddress
    });
    contact_1.default.updateOne({ id: id }, updateContact).then(function (contact) {
        res.redirect("/contact-list");
    }).catch(function (err) {
        res.end(err);
    });
});
router.post('/add', function (req, res, next) {
    let newContact = new contact_1.default({
        "FullName": req.body.FullName,
        "ContactNumber": req.body.ContactNumber,
        "EmailAddress": req.body.EmailAddress
    });
    contact_1.default.create(newContact).then(function () {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("Encountered an error updating contact to eh database: " + err);
        res.end();
    });
});
router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add', contact: "", page: 'edit', displayName: "" });
});
router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.deleteOne({ id: id }).then(function (contact) {
        res.redirect("./contact-list");
    }).catch(function (err) {
        console.error("Encountered an error deleting contact from the database: " + err);
        res.end();
    });
    res.render('index', { title: 'Add', contact: "", page: 'edit', displayName: "" });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', displayName: "" });
});
exports.default = router;
//# sourceMappingURL=index.js.map