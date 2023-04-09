"use strict";
(function () {
    function addContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function callback() {
    }
    function Start() {
        console.log("App started");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "gine":
                DisplayHomePage();
                break;
            case "products":
                DisplayProductsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "about":
                DisplayAboutPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "edit":
                DisplayEditContactPage();
                break;
            case "add":
                DisplayEditContactPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
        }
    }
    window.addEventListener("load", Start);
    function loadContent() {
        let page_name = router.ActiveLink;
        $.get(`./Views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            Checklogin();
            callback();
        });
    }
    function AuthGuard() {
        let protected_routes = ["contact-list", "edit"];
        if (protected_routes.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    function capitalizeFirstLetter(ActiveLink) {
        return "";
    }
    function AddNavigationEvents() {
        let navlinks = $("ul>li>a");
        navlinks.off("click");
        navlinks.off("mouseover");
        navlinks.on("click", function () {
        });
        navlinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function DisplayHomePage() {
        console.log("Home page called");
        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
        $("main").append(`<article>
                        <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the main paragraph";
        MainContent.appendChild(MainParagraph);
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph`;
        MainParagraph.textContent = SecondString;
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p> `;
        Article.setAttribute("class", "container");
    }
    function DisplayProductsPage() {
        console.log("Products Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
    }
    function DisplayContactPage() {
        console.log("Contact Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").off("click", function () {
            location.href = "contact-list";
        });
        ContactFormValidation();
        TestFullName();
        TestEmail();
        TestPhoneNumber();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckBox.checked) {
                let fullname = document.forms[0].fullname.value;
                let contactnumber = document.forms[0].contactnumber.value;
                let EmailAddress = document.forms[0].EmailAddress.value;
                let contact = new core.Contact(fullname, contactnumber, EmailAddress);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact List Page");
        $("a.delete").on("click", function (e) {
            if (!confirm("Delete contact, are you sure?")) {
                e.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayAboutPage() {
        console.log("About Us Page");
    }
    function DisplayEditContactPage() {
        ContactFormValidation();
    }
    function DisplayRegisterPage() {
        console.log("register page");
    }
    function Displaye404page() {
    }
    function Display404Page() {
    }
    function TestFullName() {
        console.log("Called testfullname");
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;
        let messagearea = $("#messageArea");
        $("#fullname").on("blur", function () {
            let fullNameTEXT = $(this).val();
            if (!(fullNamePattern.test(fullNameTEXT))) {
                $(this).trigger("focus");
                $(this).trigger("select");
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid full name!");
                messagearea.show();
            }
            else {
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    function TestEmail() {
        let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/;
        let messagearea = $("#messageArea");
        $("#EmailAddress").on("blur", function () {
            let EmailTEXT = $(this).val();
            if (!(EmailPattern.test(EmailTEXT))) {
                $(this).trigger("focus");
                $(this).trigger("select");
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid email!");
                messagearea.show();
            }
            else {
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    function TestPhoneNumber() {
        let PhonePattern = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/;
        let messagearea = $("#messageArea");
        $("#").on("blur", function () {
            let PhoneTEXT = $(this).val();
            if (!(PhonePattern.test(PhoneTEXT))) {
                $(this).trigger("focus");
                $(this).trigger("select");
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid phone number!");
                messagearea.show();
            }
            else {
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    function validateFields(input_field_ID, regular_expression, error_message) {
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");
        $(input_field_ID).on("blur", function () {
            let fullNameTEXT = $(this).val();
            if (regular_expression.test(fullNameTEXT)) {
                $(this).trigger("focus");
                messagearea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messagearea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        validateFields("#fullname", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Please enter a valid name!");
        validateFields("#EmailAddress", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid email!");
        validateFields("#contactnumber", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid phone number!");
    }
    function Checklogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                    <i class="fas fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function () {
            $("#login").html(`<a id="logout" class="nav-link" data="login"> 
                                                  <i class="fas fa-sign-in-alt"> </i> Login </a> `);
            sessionStorage.clear();
            AddNavigationEvents();
            location.href = ("login");
        });
    }
    function DisplayLoginPage() {
        console.log("Login page called.");
        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.user();
            $.get("./data/users.json", function (data) {
                for (const user of data.users) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username.value === user.username && password.value === user.password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = ("contact-list");
                }
                else {
                    $("userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: invalid login credentials").show();
                }
            });
            $("#cancelButton").on("click", function () {
                document.forms[0].reset();
                location.href = ("login");
            });
        });
    }
})();
//# sourceMappingURL=app.js.map