import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Inventory from "views/business/Inventory";
import Sales from "views/business/Sales";
import Supliers from "views/business/Supliers";
import Employees from "views/business/Employees";

export default function Auth() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                {/* Header */}
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/business/inventory" exact component={Inventory} />
                        <Route path="/business/sales" exact component={Sales} />
                        <Route path="/business/supliers" exact component={Supliers} />
                        <Route path="/business/employees" exact component={Employees} />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
