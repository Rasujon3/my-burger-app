import React from "react";
import { Route } from "react-router-dom";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Header from "./Header/Header";
import Checkout from "./Orders/Checkout/Checkout";
import Orders from "./Orders/Orders";

const Main = props => {
    return (
        <div>
            <Header />
            <div className="container">
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/" exact component={BurgerBuilder} />
            </div>

        </div>
    )
}
export default Main;