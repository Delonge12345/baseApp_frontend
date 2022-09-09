import { makeStyles } from "@material-ui/core/styles";
import {Link } from 'react-router-dom';

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import LoginForm from "./LoginForm";
import {DefaultTheme} from "@mui/system";


const useStyles = makeStyles((theme:DefaultTheme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%'
    },
    banner: {
        backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    bannerChip: {
        marginRight: theme.spacing(2)
    },
    methodIcon: {
        height: 30,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    cardContainer: {
        paddingBottom: 80,
        paddingTop: 80,
    },
    cardContent: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        minHeight: 400
    },
    currentMethodIcon: {
        height: 40,
        '& > img': {
            width: 'auto',
            maxHeight: '100%'
        }
    }
}));


 const Login = () => {
    const classes = useStyles();

    //  setAuth({ user, pwd, roles, accessToken });
     //logout  setAuth({});

    return (
        <div className={classes.root}>
            <Container
                className={classes.cardContainer}
                maxWidth="sm"
            >
                <Box
                    mb={8}
                    display="flex"
                    justifyContent="center"
                >
                </Box>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Box
                            alignItems="center"
                            display="flex"
                            justifyContent="space-between"
                            mb={3}
                        >
                            <div>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h2"
                                >
                                    Sign in
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Sign in on the internal platform
                                </Typography>
                            </div>
                        </Box>
                        <Box
                            flexGrow={1}
                            mt={3}
                        >
                            <LoginForm/>
                        </Box>
                        <Box
                            my={3}>
                            <Divider/>
                        </Box
                        >
                        <Box display="flex" justifyContent="space-between">
                            <Link
                                to="/register"
                                color="textSecondary"
                            >
                                Sign up
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default Login;