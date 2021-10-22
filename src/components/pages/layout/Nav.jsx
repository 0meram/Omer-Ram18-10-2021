import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import "./layout.css";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";


export default function Nav() {
	return (
		<div className="nav">
			<Toolbar className="font">
				<SideBar />
				<Link to="/" className="logo-link">
					My Wether 
				</Link> 
			</Toolbar>
		</div>
	);
}
