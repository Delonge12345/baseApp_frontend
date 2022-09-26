import  {FC, useState} from 'react';
import {
    Box,
    TextField,
    Button, Container, Card, CardContent, Typography, makeStyles
} from '@material-ui/core';
import axiosInstance from "../../api/axios";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import {DefaultTheme} from "@mui/system";
import {CircularProgress} from '@mui/material';
import Alert from "@material-ui/lab/Alert";

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

const JWTRestore: FC = () => {
    const [val, handleVal] = useState("")
    const [loading, setLoading] = useState(false)
    const [confirmationStatus, setConfirmationStatus] = useState('')

    const makeQuery = async () => {
        setLoading(true)
        try {
            await axiosInstance.post('/restoreRequest', {email: val})
            setConfirmationStatus('OK')
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }

    }
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
                                    Восстановление пароля
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
                            <Box alignItems="center"
                                 display="flex"
                                 aria-orientation='vertical'
                                 mt={2}
                                 style={{flexDirection: 'column'}}
                                 ml={-1}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    label='E-mail'
                                    type='email'
                                    value={val}
                                    onChange={e => handleVal(e.currentTarget.value)}
                                    style={{marginBottom: 35}}
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={makeQuery}
                                    fullWidth
                                >
                                    Change password
                                    {loading && <CircularProgress/>}
                                </Button>
                            </Box>
                            {confirmationStatus &&
                                <Box mt={2} style={{width: '100%'}}>
                                    <Alert
                                        severity={confirmationStatus === 'OK' ? 'info' : 'error'}
                                    >
                                        <div>
                                            {confirmationStatus === 'OK' && "Ссылка для восстановления пароля отправлена вам на почту."}
                                        </div>
                                    </Alert>
                                </Box>
                            }
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
    );
};

export default JWTRestore;


