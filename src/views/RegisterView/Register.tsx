import {FC} from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core';
import {DefaultTheme} from "@mui/system";
import {RegisterForm} from "./RegisterForm";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme: DefaultTheme) => ({
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
export const Register: FC = () => {
    const classes = useStyles();

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
                                    Регистрация
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                   Заполните поля
                                </Typography>
                            </div>
                        </Box>
                        <Box
                            flexGrow={1}
                            mt={3}
                        >
                            <RegisterForm/>
                        </Box>
                        <Box
                            my={3}>
                            <Divider/>
                        </Box
                        >
                        <Box display="flex" justifyContent="space-between">
                            <Link
                                to="/login"
                                color="textSecondary"
                            >
                                Вход
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}