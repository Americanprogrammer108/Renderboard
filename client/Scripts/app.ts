"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function (){


    function addContact(fullName : string, contactNumber : string, emailAddress : string)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }


    function callback() {

    }

    // function LoadFooter()
    // {
    //     $.get(`/views/content/footer.html`, function(html_data)
    //     {
    //        $("main").html(html_data);
    //        callback()
    //     });
    // }
    function Start()
    {
        console.log("App started");
        //TODO
        // @ts-ignore
        //LoadHeader();
        //LoadLink("home");
        //LoadFooter();
        let page_id = $("body")[0].getAttribute("id");

        switch(page_id)
        {
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

    //ActiveLink, callback
    function loadContent()
    {
        let page_name = router.ActiveLink;
        //let callback = ActiveLinkCallback(router.ActiveLink);

        $.get(`./Views/content/${page_name}.html`, function(html_data)
        {
           $("main").html(html_data);
           Checklogin();
           callback();
        });
    }

    function AuthGuard()
    {
        let protected_routes : string[] = ["contact-list", "edit"];

        if(protected_routes.indexOf(location.pathname) > -1)
        {
            if(!sessionStorage.getItem("user"))
            {
                location.href = "/login";
            }
        }
    }

    function capitalizeFirstLetter(ActiveLink: string) {
        return "";
    }

    // function LoadLink(link: string, data: string = "")
    // {
    //     router.ActiveLink = link;
    //     AuthGuard();
    //     router.LinkData = data;
    //
    //     history.pushState({}, "", router.ActiveLink);
    //
    //     document.title = capitalizeFirstLetter(router.ActiveLink);
    //     $("ul>li>a").each(function()
    //     {
    //         $(this).removeClass("active");
    //     });
    //
    //     $(`li>a:contains(${document.title})`).addClass("active");
    //     loadContent();
    //
    // }

    function AddNavigationEvents()
    {
        let navlinks = $("ul>li>a");

        navlinks.off("click");
        navlinks.off("mouseover");

        navlinks.on("click", function()
        {
            //LoadLink($(this).attr("data") as string);
        });

        navlinks.on("mouseover", function()
        {
            $(this).css("cursor", "pointer");
        });
    }

    // function AddLinkEvents(link: string) : void
    // {
    //     let linkQuery = $(`a.link[data=${link}]`);
    //
    //     linkQuery.off("click");
    //     linkQuery.off("mouseover");
    //     linkQuery.off("mouseout");
    //
    //     linkQuery.css("text-decoration", "underline");
    //     linkQuery.css("color", "blue");
    //
    //     linkQuery.on("click", function()
    //     {
    //         LoadLink(`${link}`);
    //     });
    //
    //     linkQuery.on("mouseover", function()
    //     {
    //         $(this).css("cursor", "pointer");
    //         $(this).css("font-weight", "bold");
    //     });
    //
    //     linkQuery.on("mouseout", function()
    //     {
    //         $(this).css("font-weight", "normal");
    //     });
    //
    // }

    // function LoadHeader(html_data : string)
    // {
    //     $.get("/Views/components/header.html", function(html_data)
    //     {
    //         $("header").html(html_data);
    //
    //         //document.title = capitalizeFirstLetter(router.ActiveLink);
    //         //$(`li>a:contains(${document.title})`).addClass("active");
    //         //
    //         AddNavigationEvents();
    //         Checklogin();
    //     });
    //
    // }

    function DisplayHomePage()
    {
        console.log("Home page called");
        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
        $("main").append(`<article>
                        <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p")
        MainParagraph.setAttribute("id", "MainParagraph")
        MainParagraph.setAttribute("class", "mt-3")
        MainParagraph.textContent = "This is the main paragraph";

        MainContent.appendChild(MainParagraph);
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph`;
        MainParagraph.textContent = SecondString;

        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p> `
        Article.setAttribute("class", "container")

    }

    function DisplayProductsPage()
    {
        console.log("Products Page");

    }
    function DisplayServicesPage()
    {
        console.log("Services Page");
        //AjaxRequest("GET", "header.html", LoadHeader);

    }

    function DisplayContactPage()
    {
        console.log("Contact Page");
        //AjaxRequest("GET", "header.html", LoadHeader);
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").off("click", function()
        {
            location.href= "contact-list";
        });
        ContactFormValidation();


        TestFullName();
        TestEmail();
        TestPhoneNumber();
        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckBox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function (event)
        {
            if(subscribeCheckBox.checked)
            {
                let fullname = document.forms[0].fullname.value;
                let contactnumber = document.forms[0].contactnumber.value;
                let EmailAddress = document.forms[0].EmailAddress.value;

                let contact = new core.Contact(fullname, contactnumber, EmailAddress);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });
    }



    function DisplayContactListPage()
    {
        console.log("Contact List Page");

        $("a.delete").on("click", function (e) {
            if(!confirm("Delete contact, are you sure?"))
            {
                e.preventDefault();
                location.href= "/contact-list";
            }
        });
    }
    function DisplayAboutPage()
    {
        console.log("About Us Page");

    }

    function DisplayEditContactPage()
    {
        ContactFormValidation();

    }

    function DisplayRegisterPage()
    {
        console.log("register page");
        //AddLinkEvents("login");
    }

    function Displaye404page()
    {
        //AddLinkEvents("404");
    }

    // function ActiveLinkCallback(activelink: string): Function
    // {
    //     switch(router.ActiveLink)
    //     {
    //         case "home":
    //             return DisplayHomePage;
    //         case "about":
    //             return DisplayAboutPage;
    //         case "service":
    //             return DisplayServicesPage;
    //         case "contact":
    //             return DisplayContactPage;
    //         case "contact-list":
    //             return DisplayContactListPage;
    //         case "products":
    //             return DisplayProductsPage;
    //         case "register":
    //             return DisplayRegisterPage;
    //         case "login":
    //             return DisplayLoginPage;
    //         case "edit":
    //             return DisplayEditContactPage;
    //         case "404":
    //             return Display404Page;
    //         default:
    //             console.error("Error: callback does not exist" + activelink);
    //             return new Function();
    //     }
    //
    // }

    function Display404Page()
    {

    }

    /* function DisplayLoginPage()
    {
        console.log("login page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;
            let newuser = new core.user();

            $.get("./data/user.json", function() {
                for (const user of data.user)
                {
                    let username = document.forms[0].username.value
                    let password = document.forms[0].password.value

                    if(username === user.Username && password === user.password)
                    {
                        newuser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success)
                {
                    sessionStorage.setItem("user", newuser.serialize() as string);
                    messageArea.removeAttr("class").hide();

                    location.href = "contact-list.html";
                }
                else
                {
                    //failed
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }
            });

            $("#cancelButton").on("click", function()
            {
                document.forms[0].reset();
                location.href = "index.ejs";
            });
        });
    }
    */
    /* function TestFullName()
    {
        console.log("Called testfullname");

        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");

        $("#fullname").on("blur", function()
        {
           let fullNameTEXT : string = $(this).val();
           if(fullNamePattern.test(fullNameTEXT))
           {
               //pass validation
               messagearea.removeAttr("class");
               messagearea.hide();


           }
           else
           {
               //fail validation
               $(this).trigger("focus"); //return the user back to fullname textbox
               $(this).trigger("select"); //highlight text in fullname textbox
               messagearea.addClass("alert alert-danger");
               messagearea.text("Please enter a valid full name!");
               messagearea.show();
           }
        });
    }*/
    function TestFullName()
    {
        console.log("Called testfullname");

        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/; ///^[a-zA-Z].*[\s\.]*$/;
        let messagearea = $("#messageArea");

        $("#fullname").on("blur", function()
        {
           let fullNameTEXT = $(this).val() as string;
           if(!(fullNamePattern.test(fullNameTEXT)))
           {
               //fail validation
               $(this).trigger("focus"); //return the user back to fullname textbox
               $(this).trigger("select"); //highlight text in fullname textbox
               messagearea.addClass("alert alert-danger");
               messagearea.text("Please enter a valid full name!");
               messagearea.show();


           }
           else
           {
               //pass validation
               messagearea.removeAttr("class");
               messagearea.hide();
           }
        });
    }

    function TestEmail()
    {
        let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/;
        let messagearea = $("#messageArea");

        $("#EmailAddress").on("blur", function()
        {
            let EmailTEXT = $(this).val() as string;
            if(!(EmailPattern.test(EmailTEXT)))
            {
                //fail validation
                $(this).trigger("focus"); //return the user back to fullname textbox
                $(this).trigger("select"); //highlight text in fullname textbox
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid email!");
                messagearea.show();


            }
            else
            {
                //pass validation
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }

    function TestPhoneNumber()
    {
        let PhonePattern = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/;
        let messagearea = $("#messageArea");

        $("#").on("blur", function()
        {
            let PhoneTEXT = $(this).val() as string;
            if(!(PhonePattern.test(PhoneTEXT)))
            {
                //fail validation
                $(this).trigger("focus"); //return the user back to fullname textbox
                $(this).trigger("select"); //highlight text in fullname textbox
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid phone number!");
                messagearea.show();


            }
            else
            {
                //pass validation
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    /**
     * This function will validate input fields provided based on a given regular expression
     * @param input_field_ID
     * @param regular_expression
     * @param error_message
     */
    function validateFields(input_field_ID : string, regular_expression : RegExp, error_message : string)
    {
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");

        $(input_field_ID).on("blur", function()
        {
            let fullNameTEXT = $(this).val() as string;
            if(regular_expression.test(fullNameTEXT))
            {
                //fail validation
                $(this).trigger("focus"); //return the user back to fullname textbox
                messagearea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                //pass validation
                messagearea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation()
    {
        validateFields("#fullname", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
        "Please enter a valid name!"); //fullname

        validateFields("#EmailAddress", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
        "Please enter a valid email!"); //email

        validateFields("#contactnumber", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
        "Please enter a valid phone number!"); //phone number

    }

    function Checklogin()
    {
        if(sessionStorage.getItem("user"))
        {
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                    <i class="fas fa-sign-out-alt"></i> Logout</a>`)
        }

        $("#logout").on("click", function()
        {
            $("#login").html(`<a id="logout" class="nav-link" data="login"> 
                                                  <i class="fas fa-sign-in-alt"> </i> Login </a> `)
            sessionStorage.clear();

            AddNavigationEvents();
            //redirect to the login page
            location.href=("login");
        });
    }

    function DisplayLoginPage()
    {
        console.log("Login page called.");

        let messageArea = $("#messageArea");
        messageArea.hide();

        //AddLinkEvents("register");

        $("#loginButton").on("click", function ()
        {
            let success = false;
            let newUser = new core.user();

            $.get("./data/users.json", function (data)
            {
                for(const user of data.users)
                {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;

                    if(username.value === user.username && password.value === user.password)
                    {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success)
                {
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();

                    location.href=("contact-list");
                }
                else
                {
                    $("userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: invalid login credentials").show();
                }

            });
            $("#cancelButton").on("click", function()
            {
                document.forms[0].reset();
                location.href=("login");
            });
        });

    }




})();