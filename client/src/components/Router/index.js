import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Business from "layouts/Business.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

function Router() {
  const token = localStorage.getItem('gestion-ganadera@token');
  localStorage.removeItem('gestion-ganadera@token')
  console.log(token)
  return (
    <BrowserRouter>
      <Switch>
        {!token ? <> 
          <Route path="/auth">
            <Auth/>
          </Route> 
          <Redirect from="*" to="/auth/login" />
          </> : null}

        {/* add routes with layouts */}
        <Route path="/admin" component={Admin} />
        <Route path="/business" component={Business} />
        {/* add routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Auth} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/admin" />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
