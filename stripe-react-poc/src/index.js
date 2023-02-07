import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

import CustomPaymentApp from "./CustomPayment/App";
import PrebuiltCheckoutApp from "./PrebuiltCheckout/App";

import "./App.css";


function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/custom">Custom Payment</Link>
                    </li>
                    <li>
                        <Link to="/prebuilt">Prebuilt Checkout</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
            <Route path="custom" element={<CustomPaymentApp />} />
            <Route path="prebuilt" element={<PrebuiltCheckoutApp />} />
            </Routes>
        </BrowserRouter>
    );
  }


  ReactDOM.render(<App />, document.getElementById("root"));
