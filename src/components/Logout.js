import React from "react";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
    cancel: {
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
    logout: {
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
    area: {
        paddingLeft: '15px',
        paddingRight: '15px',
        marginTop: '10px',
        marginBottom: '50px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: '#e3f6f5',
        borderRadius: '20px',
        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19)',
        overflow: 'hidden',
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

class Logout extends React.Component{

    clearToken(){
        alert("You are being logged out");
        localStorage.removeItem("token");
    }

    render(){
        const { classes } = this.props;

        return(
            <Container maxWidth="xs">
                <Box className={classes.area}>
                        <form>
                            <Typography component="h3" variant="h3" align="center">Are you sure you want to logout?</Typography>
                            <Typography component="h3" variant="h3" align="center">We'll miss you!</Typography>
                            <Link to={"/profile"}>
                                <Button
                                    type="cancel"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.cancel}>
                                    Cancel
                                </Button>
                            </Link>
                            <Link onClick={this.clearToken}>
                                <Button
                                    type="logout"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.logout}>
                                    Logout
                                </Button>
                            </Link>
                        </form>
                </Box>
            </Container>
        
        )

    }   
}

export default withStyles(styles, { withTheme: true })(Logout)