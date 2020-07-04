import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './view/Main';
import CreateUser from './view/CreateUser';
import EditUser from './view/EditUser';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/create_user" component={CreateUser} />
                <Route path="/edit_user/:user_id" component={EditUser} />
            </Switch>
        </BrowserRouter>
    );
}