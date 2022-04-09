import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import My404Component from "./pages/404/My404Component";
import UploadForm from "./pages/upload/UploadForm";


const Routing = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home}/>
			<Route path="/upload" exact component={UploadForm}/>

			{/* <AuthRoute path="/checkout" exact component={Checkout}/> */}


			<Route path="*" exact component={My404Component}/>

		</Switch>
	);
};

export default Routing;