import React from "react";
import styles from "../assets/Styles.module.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import PropTypes from "prop-types";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  static get propTypes() {
    return {
      children: PropTypes.any,
      onClickOut: PropTypes.func
    };
  }

  setSelectedDate = (date) => {
    this.setState({ selectedDate: date });
  };

  sendData = (date) => {
    this.propTypes.parentCallback(date);
  };

  handleDateChange = (date) => {
    this.setSelectedDate(date);
    this.sendData(date);
  };

  render() {
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="space-around" className={styles.calendar}>
            <KeyboardDatePicker
              variant="inline"
              format="MM-dd-yyyy"
              margin="normal"
              id="date-picker"
              label={this.propTypes.label}
              value={this.propTypes.selectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{ "aria-label": "change date" }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
