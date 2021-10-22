import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import "./search.css";

const useStyles = makeStyles({
	root: {
		width: 125,
		margin: 10,
		overflow: "hidden",
	},
});

export default function Day(props) {
	const classes = useStyles();

	return (
		<div>
			<Card className={classes.root} key={props.key}>
				<div>
					<h2>{props.day.Day.IconPhrase}</h2>
				</div>
				<div>
					<h3>
						{props.day.Temperature.Maximum.Value}{" "}
						{props.day.Temperature.Maximum.Unit}
					</h3>
				</div>
			</Card>
		</div>
	);
}
