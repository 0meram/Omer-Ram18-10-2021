import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Day from "../search/Day";
import { UserContext } from "../../lib/context/useContext";
import "./CurrentWether.css";

const useStyles = makeStyles(() => ({
	root: {
		width: 760,
		margin: "auto",
		marginTop: 10,
		marginBottom: 70,
	},
	bio: {
		width: 350,
	},
}));

export default function CurrentWether(props) {
	const classes = useStyles();
	const data = useContext(UserContext);
	const [favBtnColor, setFavBtnColor] = useState("none");
	const days = ["sunday", "monday", "tuesday", "wednesday", "thursday"];

	const saveFavorite = (e) => {
		setFavBtnColor("secondary");
		data.favorites.push({
			city: props.city,
			text: props.text,
			temp: props.temp,
			unit: props.unit,
		});
	};

	return (
		<Card className={classes.root} key={props.key}>
			<CardContent className="card">
				<h3>{props.city}</h3>
				<h1>{props.text}</h1>
				<h1>
					{props.temp} {props.unit}
				</h1>
				<CardActions disableSpacing>
					Like
					<IconButton
						aria-label="add to favorites"
						color={favBtnColor}
						onClick={(e) => saveFavorite(e)}
					>
						<FavoriteIcon />
					</IconButton>
				</CardActions>
				<div style={{ display: "flex" }}>
					{days.map((day) => {
						return <h2 style={{ margin: 30 }}>{day}</h2>;
					})}
				</div>
				<div style={{ display: "flex" }}>
					{props.days.map((day) => {
						return <Day day={day} />;
					})}
				</div>
			</CardContent>
		</Card>
	);
}
