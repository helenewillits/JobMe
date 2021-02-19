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

class Calendar extends React.Component {
   render() {
      return (
         <div>
            <CalendarComponent />
         </div>
      );
   }
}

function CalendarComponent() {
   const [selectedDate, setSelectedDate] = React.useState(
      new Date("2020-09-11T12:00:00")
   );
   const handleDateChange = (date) => {
      setSelectedDate(date);
   };

   return (
      <div>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
               container
               direction="space-around"
               className={styles.calendar}
            >
               <KeyboardDatePicker
                  variant="static"
                  format="MM/dd/yyy"
                  margin="normal"
                  id="date-picker"
                  label="Date Picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{ "aria-label": "change date" }}
               />

               <KeyboardTimePicker
                  variant="static"
                  margin="normal"
                  id="time-picker"
                  label="Time Picker"
                  onChange={handleDateChange}
                  KeyboardButtonProps={{ "aria-label": "change date" }}
               />
            </Grid>
         </MuiPickersUtilsProvider>
      </div>
   );
}

export default Calendar;
