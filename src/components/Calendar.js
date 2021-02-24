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
  render() {
    return (
      <div>
        {/* {this.CalendarComponent()} */}
        <CalendarComponent parentCallback={this.props.parentCallback} />
      </div>
    );
  }
}

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const [selectedTime, setSelectedTime] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(this.props.parentCallback);
    this.props.parentCallback(date);
  };
  // const handleTimeChange = (time) => {
  //   setSelectedTime(time);
  // };

  // const sendData = (date) => {
  //   this.props.parentCallback(date);
  // };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container direction="space-around" className={styles.calendar}>
          <KeyboardDatePicker
            variant="inline"
            format="MM-dd-yyyy"
            margin="normal"
            id="date-picker"
            label="Date Picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{ "aria-label": "change date" }}
          />

          {/* <KeyboardTimePicker
            variant="inline"
            margin="normal"
            id="time-picker"
            label="Time Picker"
            value={selectedTime}
            onChange={handleTimeChange}
            KeyboardButtonProps={{ "aria-label": "change time" }}
          /> */}
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
