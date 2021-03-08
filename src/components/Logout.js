import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import cssstyles from "../assets/Styles.module.css";
import { ArrowRight } from "@material-ui/icons";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  cancel: {
    position: "center",
    width: "25%",
    backgroundColor: "#BAE8E8",
    color: "#5e5e5e",
    fontFamily: "sans-serif",
    fontStyle: "normal",
    margin: theme.spacing(3, 0, 1),
    "&:hover": {
      backgroundColor: "rgb(0, 100, 128)",
      color: "white"
    }
  },
  logout: {
    width: "25%",
    backgroundColor: "#E3F6F5",
    color: "#5e5e5e",
    fontFamily: "sans-serif",
    fontStyle: "normal",
    margin: theme.spacing(3, 0, 1),
    "&:hover": {
      backgroundColor: "rgb(0, 100, 128)",
      color: "white"
    }
  },
  logo: {
    width: "90%"
  },
  smallWords: {
    margin: "5%",
    marginTop: "7%",
    display: "inline-block"
  }
});

class Logout extends React.Component {
  clearToken() {
    alert("You are being logged out");
    localStorage.removeItem("token");
    window.location.reload();
  }

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="sm">
        <Box className={cssstyles.areaLogout}>
          <form>
            <Typography component="h3" variant="h4" align="center">
              Are you sure you want to logout?
            </Typography>
            <br />
            <Typography component="h3" variant="h5" align="center">
              We'll miss you!
            </Typography>
            <div align="center">
              <Link to={"/profile"}>
                <Button
                  type="cancel"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.cancel}
                >
                  Cancel
                </Button>
              </Link>
              <Link onClick={this.clearToken}>
                <Button
                  type="logout"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.logout}
                >
                  Logout
                </Button>
              </Link>
            </div>
          </form>
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Logout);
