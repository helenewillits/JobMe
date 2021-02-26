import React from "react";
import styles from "../assets/Styles.module.css";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  setSelectedDate = (date) => {
    this.setState({ selectedDate: date });
  };

  sendData = (date) => {
    this.props.parentCallback(date);
  };

  handleDateChange = (date) => {
    this.setSelectedDate(date);
    this.sendData(date.toString());
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
              label="Application Deadline"
              value={this.props.selectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{ "aria-label": "change date" }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
