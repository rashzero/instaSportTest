import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { fetchDataClubActions } from "../actions/actions";
import ProgressCentered from "../components/ProgressCentered";
import ClubCard from "../components/ClubCard";
import CachedIcon from "@material-ui/icons/Cached";

class Main extends PureComponent {
  state = {
    clubInCurrentCity: "",
    clubOfCurrentActivity: ""
  };

  componentDidMount() {
    this.props.fetchDataClubActions();
  }

  get cityArr() {
    let citys = [];

    this.props.clubs.forEach(item => {
      if (!citys.includes(item.city.title)) {
        citys.push(item.city.title);
      }
    });
    return citys;
  }

  get activitysArr() {
    let activitys = [];

    this.props.clubs.forEach(club => {
      club.activity.forEach(activity => {
        if (!activitys.includes(activity.title)) {
          activitys.push(activity.title);
        }
      });
    });
    return activitys;
  }

  get filterClubs() {
    if (!this.state.clubInCurrentCity && !this.state.clubOfCurrentActivity) {
      return this.props.clubs;
    } else if (!this.state.clubInCurrentCity) {
      return this.props.clubs.filter(club =>
        club.activity.find(
          kategory => kategory.title === this.state.clubOfCurrentActivity
        )
      );
    } else if (!this.state.clubOfCurrentActivity) {
      return this.props.clubs.filter(
        club => club.city.title === this.state.clubInCurrentCity
      );
    } else {
      return this.props.clubs
        .filter(club => club.city.title === this.state.clubInCurrentCity)
        .filter(club =>
          club.activity.find(
            kategory => kategory.title === this.state.clubOfCurrentActivity
          )
        );
    }
  }

  render() {
    const { classes } = this.props;

    if (!this.props.clubs.length) {
      return <ProgressCentered />;
    }

    return (
      <div>
        <div className={classes.container}>
          <Button
            onClick={() => this.setState({ clubInCurrentCity: "" })}
            style={{
              display: !this.state.clubInCurrentCity ? "none" : ""
            }}
          >
            <CachedIcon />
          </Button>
          {this.cityArr.map(city => {
            return (
              <Button
                key={city}
                onClick={() => this.setState({ clubInCurrentCity: city })}
                style={{
                  color: this.state.clubInCurrentCity === city ? "blue" : ""
                }}
              >
                {city}
              </Button>
            );
          })}
        </div>
        <br />
        <div className={classes.container}>
          <Button
            onClick={() => this.setState({ clubOfCurrentActivity: "" })}
            style={{
              display: !this.state.clubOfCurrentActivity ? "none" : ""
            }}
          >
            <CachedIcon />
          </Button>
          {this.activitysArr.map(activity => {
            return (
              <Button
                className={classes.buttonActivity}
                key={activity}
                variant="outlined"
                onClick={() =>
                  this.setState({ clubOfCurrentActivity: activity })
                }
                style={{
                  backgroundColor:
                    this.state.clubOfCurrentActivity === activity
                      ? "#fff333"
                      : ""
                }}
              >
                {activity}
              </Button>
            );
          })}
        </div>
        <br />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
          className={classes.container}
        >
          {this.filterClubs.map(club => (
            <ClubCard club={club} key={club.title} />
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clubs: state.clubs
});

const mapDispatchToProps = dispatch => ({
  async fetchDataClubActions() {
    const fetchResult = fetchDataClubActions();
    dispatch(fetchResult);
  }
});

const useStylesForm = withStyles(theme => ({
  container: {
    width: "95%",
    margin: "auto",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
  },

  buttonActivity: {
    margin: "3px"
  }
}))(Main);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(useStylesForm);
