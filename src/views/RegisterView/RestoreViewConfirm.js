import React, {useState} from 'react'
import {
    Box,
    Card,
    CardContent,
    Container,
    makeStyles,
    Typography,
    Button,
    TextField, FormHelperText
} from '@material-ui/core';
import * as Yup from "yup";
import {Formik} from "formik";
import Alert from '@material-ui/lab/Alert';
import axiosInstance from "../../api/axios";
import {useNavigate} from "react-router-dom";
import useIsMountedRef from "../../hooks/useIsMounedRef";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
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
        paddingTop: 40,
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    cardContent: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
    },
    currentMethodIcon: {
        height: 40,
        '& > img': {
            width: 'auto',
            maxHeight: '100%'
        }
    }
}));

export const RestoreViewConfirm = () => {
    const classes = useStyles()
    const navigate = useNavigate();

    const key = new URLSearchParams(window.location.pathname.slice(9));
    const isMountedRef = useIsMountedRef();
    const [confirmationStatus, handleConfirmationStatus] = useState("")

    return (
        <Container maxWidth="sm" className={classes.cardContainer}>
            <Card>
                <CardContent className={classes.cardContent}>
                    <Box mb={6}>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h2"
                        >
                            Enter new password
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Resetting confirm your password
                        </Typography>
                    </Box>
                    <Formik
                        initialValues={{
                            password: '',
                            passwordConfirm: ''
                        }}

                        validationSchema={Yup.object().shape({
                            password: Yup.string().min(8).max(255).required('Password is required'),
                            passwordConfirm: Yup.string().min(8).max(255).required('Password confirmation is required')
                        })}

                        onSubmit={async (values, {
                            setErrors,
                            setStatus,
                            setSubmitting
                        }) => {
                            try {
                                if (values.password === values.passwordConfirm) {
                                    const response = await axiosInstance.post('/restoreConfirm', {
                                        email: key.get('email'),
                                        password: values.password,
                                        token: key.get('token')
                                    })
                                    if (response.data.status === 'OK') {
                                        handleConfirmationStatus('OK')
                                        setTimeout(() => {
                                            navigate('/login')
                                        }, 7000)
                                    } else if (response.data.status === 'ERROR')
                                        //@ts-ignore
                                        handleConfirmationStatus('ERROR')
                                } else
                                    //@ts-ignore
                                    setErrors({
                                        submit: "Confirm password does not match password"
                                    })
                                if (isMountedRef.current) {
                                    setStatus({success: true});
                                    setSubmitting(false);
                                }
                            } catch (err) {
                                console.error(err);
                                if (isMountedRef.current) {
                                    setStatus({success: false});
                                    //@ts-ignore
                                    setErrors({submit: err.status});
                                    setSubmitting(false);
                                }
                            }
                        }}
                    >
                        {({
                              errors,
                              handleChange,
                              handleSubmit,
                              touched,
                              values
                          }) => (
                            <form
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                                    fullWidth
                                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                                    label="Confirm password"
                                    margin="normal"
                                    name="passwordConfirm"
                                    onChange={handleChange}
                                    type="password"
                                    value={values.passwordConfirm}
                                    variant="outlined"
                                />
                                <Button
                                    style={{marginTop: 25}}
                                    color="secondary"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Confirm
                                </Button>

                                {errors.submit && (
                                    <Box mt={3}>
                                        <FormHelperText error>
                                            {errors.submit}
                                        </FormHelperText>
                                    </Box>
                                )}
                                {confirmationStatus &&
                                    <Box mt={2} style={{width: '100%'}}>
                                        <Alert
                                            severity={confirmationStatus === 'OK' ? 'info' : 'error'}
                                        >
                                            <div>
                                                {confirmationStatus === 'OK' ? "Your password has been successfully changed" :
                                                    "Some error happened while restoring password. Looks like you are trying to restore" +
                                                    " password one more time"}
                                            </div>
                                            {confirmationStatus === 'OK' &&
                                                <div>
                                                    You will be redirected to login page in a couple of seconds
                                                </div>}
                                        </Alert>
                                    </Box>
                                }
                            </form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Container>
    )
}
