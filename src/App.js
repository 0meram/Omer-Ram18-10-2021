import "./App.css";
import React, { useState } from "react";
import Welcome from "./components/pages/welcome/Welcome.jsx";
import Nav from "./components/pages/layout/Nav.jsx";
import Search from "./components/pages/search/Search.jsx";
import Profile from "./components/pages/favorites/Favorites.jsx";
import { UserContext } from "./components/lib/context/useContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const [favorites, setFavorites] = useState([]);

	return (
		<Router>
			<div className="App">
				<UserContext.Provider
					value={{
						favorites: favorites,
						setFavorites: setFavorites,
					}}
				>
					<Nav />
					<Switch>
						<Route exact path="/">
							<Welcome />
						</Route>
						<Route exact path="/search">
							<Search />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
					</Switch>
				</UserContext.Provider>
			</div>
		</Router>
	);
}

export default App;
