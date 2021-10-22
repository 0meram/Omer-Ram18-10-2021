import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./welcome.css";
import Hero from "../../lib/images/Hero.jpg";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: `url(${Hero})`,
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: "100vh",
		width: "100vw",
	},
}));

export default function Welcome() {
	const classes = useStyles();
	
	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={true} sm={12} md={12} className={classes.image}>
				<div className="hero">
					<h1>Welcome!</h1>
					<p>Lets find out whats the wether like!</p>
				</div>
			</Grid>
		</Grid>
	);
}
