import React from "react";
import { Switch, Route } from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
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
                {/* Header */}
                <div className="bg-lightBlue-600 md:pt-32 pb-16 pt-12"></div>
                <div className="px-4 md:px-10 mx-auto w-full -m-24" style={{minHeight: "96vh"}}>
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
