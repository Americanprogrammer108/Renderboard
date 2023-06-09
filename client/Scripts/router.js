"use strict";
var core;
(function (core) {
    class Router {
        m_activeLink;
        m_linkData;
        m_routingTable;
        get ActiveLink() {
            return this.m_activeLink;
        }
        set ActiveLink(link) {
            this.m_activeLink = link;
        }
        get LinkData() {
            return this.m_linkData;
        }
        set LinkData(link) {
            this.m_linkData = link;
        }
        constructor() {
            this.m_activeLink = "";
            this.m_routingTable = [];
            this.m_linkData = "";
        }
        add(route) {
            this.m_routingTable.push(route);
        }
        addTable(routeTable) {
            this.m_routingTable = routeTable;
        }
        find(route) {
            return this.m_routingTable.indexOf(route);
        }
        remove(route) {
            if (this.find(route) > -1) {
                this.m_routingTable.splice(this.find(route), 1);
                return true;
            }
            return false;
        }
        toString() {
            return this.m_routingTable.toString();
        }
    }
    core.Router = Router;
})(core || (core = {}));
let router = new core.Router();
router.addTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/products",
    "/register",
    "/login",
    "/edit"
]);
let route = location.pathname;
router.ActiveLink = (router.find(route) > -1)
    ? (route === "/") ? "home" : route.substring(1)
    : ("404");
//# sourceMappingURL=router.js.map