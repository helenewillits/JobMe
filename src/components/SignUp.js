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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
        float: 'right',
        width: '25%',
        backgroundColor: '#E3F6F5',
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
        width: '50%',
    },
});



class SignUp extends React.Component {

    state = {
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        this.submitNewUser(event);
    }

    submitNewUser(event) {
        console.log("STATE FOR POST");
        console.log(this.state);
        axios
            .post("http://localhost:5000/userDatabase/add", this.state)
            .then((res) => {
                console.log(res);
            })
            .catch(function (error) {
                //Not handling the error. Just logging into the console.
                console.log(error);
            });
    }


    render() {
        const { classes } = this.props;
        return (

            <Container component="main" maxWidth="xs" align='center'>

                <CssBaseline />
                <div className={classes.paper}>
                    {/*<img src={Logo} className={"logo"}></img>*/}
                    <Typography component="header" variant="h3" align="center">Ready to sign up? It's free!</Typography>
                    <Typography component="h1" variant="h5" align="center">
                        An easy job search awaits.
                </Typography>
                    <Box border={1} width={'150%'} padding={'15%'}>
                        <Typography component="h2" variant="h6" align="left" width="150%">Sign up for an account here.</Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ width: '45%', marginRight: '5%' }}
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
                                style={{ width: '45%', marginLeft: '5%' }}
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
                            {/*<FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />*/}
                            <div>
                                <Link to={"/login"} onClick={this.handleSubmit}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Register and Return to Login
                                    </Button>
                                </Link>
                                <Link to={"/login"}>
                                    <Button
                                        type="login"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.login}>
                                        Log In
                                    </Button>
                                </Link>
                            </div>

                        </form>
                    </Box>
                </div >
                <Box mt={8}>
                    <Copyright />
                </Box>
                <Box maxWidth="xs" padding="10%" align="center">
                    <img src={Logo} className={classes.logo}></img>
                </Box>
            </Container >

        );
    }

}

export default withStyles(styles, { withTheme: true })(SignUp);
