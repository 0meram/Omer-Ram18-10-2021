import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../welcome/welcome.css";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import TextField from "@material-ui/core/TextField";
import CurrentWether from "../CurrentWether/CurrentWether";
import "./search.css";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	media: {
		height: 140,
	},
	card: {
		maxWidth: 345,
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #ffffff",
		boxShadow: theme.shadows[5],
		padding: 0,
		borderRadius: "4px",
		maxWidth: 750,
		margin: "auto",
		display: "flex",
	},
	formControl: {
		minWidth: 650,
	},
	submit: {
		margin: 4,
	},
}));

export default function Search() {
	const classes = useStyles();
	const [empty, setEmpty] = useState(false);
	const [loading, setLoading] = useState(false);
	const [city, setCity] = useState("tel-aviv");
	const [text, setText] = useState();
	const [date, setDate] = useState();
	const [temp, setTemp] = useState();
	const [unit, setUnit] = useState();
	const [days, setDays] = useState([]);

	const getForcast = (id) => {
		const base = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
		const query = `${id}?apikey=UIR2sXAbp5TQZRAuMOwP2o89JPkd9aHr`;
		axios.get(base + query).then((response) => {
			setDays(response.data.DailyForecasts);
		});
	};

	const getCurrentWether = (id) => {
		const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
		const query = `${id}?apikey=UIR2sXAbp5TQZRAuMOwP2o89JPkd9aHr`;
		axios.get(base + query).then((response) => {
			setText(response.data[0].WeatherText);
			setDate(response.data[0].LocalObservationDateTime);
			setTemp(response.data[0].Temperature.Imperial.Value);
			setUnit(response.data[0].Temperature.Imperial.Unit);
		});
	};

	const getCity = () => {
		const base = `http://dataservice.accuweather.com/locations/v1/cities/search`;
		const query = `?apikey=UIR2sXAbp5TQZRAuMOwP2o89JPkd9aHr&q=${city}`;
		setLoading(true);
		axios.get(base + query).then((response) => {
			setTimeout(() => {
				setLoading(false);
			}, 500);
			const id = response.data[0].Key;
			getCurrentWether(id);
			getForcast(id);
			if (response.data.length === 0) {
				setEmpty(true);
			} else {
				setEmpty(false);
			}
		});
	};

	useEffect(() => {
		getCity();
		getForcast();
	}, []);

	const simpleSearch = () => {
		getCity();
		getForcast();
	};

	return (
		<div className="search-con">
			<Grid container component="main" className={classes.root}>
				<Grid item xs={true} sm={12} md={12} className="parallax">
					<form style={{ marginTop: 100 }}>
						<div className="title">Current Weather and forecast</div>
						<div className={classes.paper} className="form">
							<FormControl className={classes.formControl}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="name"
									label="City Wether"
									className={classes.name}
									onChange={(e) => setCity(e.target.value)}
								/>
							</FormControl>
							<Button
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={simpleSearch}
							>
								Search
							</Button>
						</div>
					</form>
					{loading && (
						<ClipLoader color="white" loading={true} css="" size={160} />
					)}
					{empty && <h2>No Results Found</h2>}
					<CurrentWether
						date={date}
						temp={temp}
						unit={unit}
						text={text}
						city={city}
						days={days}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
