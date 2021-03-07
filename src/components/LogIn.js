import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../icons/JobMe_Logo.png'
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://JobMe.live/">
                JobMe
      </Link>{' '}
            {new Date().getFullYear()}
            {'. We love our users!'}
        </Typography>
    );
}

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        width: '25%',
        float: 'left',
        backgroundColor: '#BAE8E8',
        color: '#5e5e5e',
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        margin: theme.spacing(3, 0, 2),
        "&:hover": {
            backgroundColor: '#7FDBFF',
            color: 'white',
        }
    },
    login: {
        float: 'left',
        width: '25%',
        backgroundColor: '#BAE8E8',
        color: '#5e5e5e',
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        margin: theme.spacing(3, 0, 2),
        "&:hover": {
            backgroundColor: '#7FDBFF',
            color: 'white',
        }
    },
    logo: {
        width: '90%',
    },
    smallWords: {
        margin: '5%',
        marginTop: '7%',
        display: 'inline-block',
    },
});

class LogIn extends React.Component {

    state = {
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //this.performValidation = this.performValidation.bind(this);
    }

    performValidation() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleClick(event) {
        console.log("Made it");
        var apiBaseUrl = "https://jobme-app.herokuapp.com/";
        var selfState = this.state;
        var selfProps = this.props;
        console.log("PAYLOAD: ", this.state);
        axios.post(apiBaseUrl + "userDatabase/post/validateLogin", this.state)
            .then(function (response) {
                if (response.data.code === 200) {
                    console.log("Login successful");
                    selfProps.parentCallback(selfState.email);
                    // console.log("Login user ", this.loginUser(this.state.email));
                    // this.sendData(loginUser(this.state.email));
                }
                else if (response.data.code === 204) {
                    console.log("Invalid login");
                    alert("Invalid login");
                }
                else {
                    console.log("unknown error");
                }
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs" align='center'>

                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="header1" variant="h4" align="center">Welcome back!</Typography>
                    <img src={Logo} alt={"JobMe-Logo"} className={classes.logo}></img>
                    <Box border={1} width={'150%'} padding={'15%'}>
                        <form className={classes.form} noValidate>
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
                            {/*<FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />*/}
                            <div>
                                <Link onClick={this.handleClick}>
                                    <Button
                                        type="login"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={!this.performValidation()}
                                        className={classes.login}>
                                        Log In
                                    </Button>
                                </Link>
                                <Link to={"/signup"} variant='body2' className={classes.smallWords}>
                                    New here? Sign up!
                                </Link>
                            </div>

                        </form>
                    </Box>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container >

        );
    }

}

export default withStyles(styles, { withTheme: true })(LogIn);
