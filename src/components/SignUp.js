import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Logo from "../icons/JobMe_Logo.png";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import cssstyles from "../assets/Styles.module.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://JobMe.live/">
        JobMe
      </Link>{" "}
      {new Date().getFullYear()}
      {". We love our users!"}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    width: "25%",
    float: "left",
    backgroundColor: "#BAE8E8",
    color: "#5e5e5e",
    fontFamily: "sans-serif",
    fontStyle: "normal",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "rgb(0, 100, 128)",
      color: "white"
    }
  },
  login: {
    float: "right",
    width: "25%",
    backgroundColor: "#E3F6F5",
    color: "#5e5e5e",
    fontFamily: "sans-serif",
    fontStyle: "normal",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "rgb(0, 100, 128)",
      color: "white"
    }
  },
  logo: {
    width: "50%"
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  performValidation() {
    return (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitNewUser(event, selfState) {
    console.log("STATE FOR POST");
    console.log(selfState);
    axios
      .post("http://localhost:5000/userDatabase/add", selfState)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit(event) {
    console.log("Made it");
    var apiBaseUrl = "http://localhost:5000/";
    var self = this;
    var selfState = this.state;
    console.log("PAYLOAD: ", selfState);
    axios
      .post(apiBaseUrl + "userDatabase/post/validateSignup", selfState)
      .then(function (response) {
        if (response.data.code === 200) {
          console.log("Signup successful");
          self.submitNewUser(event, selfState);
        } else if (response.data.code === 204) {
          console.log("Invalid email");
          alert("User already has this email. Re-signup with another email.");
        } else {
          console.log("unknown error");
        }
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" align="center">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="header" variant="h3" align="center">
            Ready to sign up? It's free!
          </Typography>
          <Typography component="h1" variant="h5" align="center">
            An easy job search awaits.
          </Typography>
          <Box className={cssstyles.signin}>
            <Typography component="h2" variant="h6" align="left" width="150%">
              Sign up for an account here.
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                style={{ width: "45%", marginRight: "5%" }}
                onChange={this.handleChange}
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                style={{ width: "45%", marginLeft: "5%" }}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <div>
                <Link to={"/login"} onClick={this.handleSubmit}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!this.performValidation()}
                    className={classes.submit}
                  >
                    Register
                  </Button>
                </Link>
                <Link to={"/login"}>
                  <Button
                    type="login"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.login}
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </form>
          </Box>
        </div>
        <Box mt={2}>
          <Copyright />
        </Box>
        <Box maxWidth="xs" padding={"8%"} align="center">
          <img src={Logo} className={classes.logo}></img>
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SignUp);
