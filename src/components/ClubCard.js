import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: "90%",
    marginBottom: 20,
    textAlign: "center",
    background: "#f3f3f3"
  },
  media: {
    height: 250,
    width: 250,
    margin: "auto"
  },

  grid_item: {
    margin: 5
  }
});

export default function ClubCard(props) {
  const classes = useStyles();
  const errorLogo =
    "https://www.creativefabrica.com/wp-content/uploads/2018/10/Fitness-sport-logo-by-DEEMKA-STUDIO-4.jpg";

  return (
    <Grid item className={classes.grid_item}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.club.logo ? props.club.logo : errorLogo}
            title="Logo"
          />
          <div className="bleski-kobusenu">
            <i className="snimok" />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.club.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
