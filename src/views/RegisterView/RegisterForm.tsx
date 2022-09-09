import {FC} from "react";
import * as Yup from 'yup';
import {Alert} from '@material-ui/lab';
import {Formik} from 'formik';
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    TextField,
    Typography,
    Link,

} from '@material-ui/core';

export const RegisterForm: FC = () => {


    // const register = async (email, name, password) => {
    //     console.log("Register in process....")
    //     const response = await axiosInstance.post('/signup', {
    //         email,
    //         name,
    //         password
    //     });
    //     console.log("Response for register: ", response)
    //     return response
    // };

    return (
        <Formik
            initialValues={{
                email: '',
                name: '',
                password: '',
                passwordConfirm: '',
                policy: false,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                name: Yup.string().max(255).required('Name is required'),
                password: Yup.string().min(8).max(255).required('Password is required'),
                passwordConfirm: Yup.string().min(8).max(255).required('Password confirmation is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            // onSubmit={async (values, {
            //     setErrors,
            //     setStatus,
            //     setSubmitting
            // }) => {
            //     try {
            //         let response = undefined;
            //         if (values.password !== values.passwordConfirm)
            //             setErrors({submit: 'Confirm password does not match password'})
            //         else {
            //             response = await register(values.email, values.name, values.password);
            //             setSubmitting(true)
            //             setErrors({submit: response.data.status})
            //         }
            //
            //
            //     } catch (err) {
            //         console.error("Some kind of error has appeared in register process...", err);
            //         //setStatus({success: false});
            //         //setErrors({submit: err.message});
            //         setSubmitting(true);
            //     }
            // }}
            //@ts-ignore
            onSubmit={() => {}}>
            {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
              }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="E-mail"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.passwordConfirm}
                        variant="outlined"
                    />
                    <Box
                        alignItems="center"
                        display="flex"
                        mt={2}
                        ml={-1}
                    >
                        <Checkbox
                            checked={values.policy}
                            name="policy"
                            onChange={handleChange}
                        />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >
                            I have read the
                            {' '}
                            <Link
                                component="a"
                                href="#"
                                color="secondary"
                            >
                                Terms and Conditions
                            </Link>
                        </Typography>
                    </Box>
                    {Boolean(touched.policy && errors.policy) && (
                        <FormHelperText error>
                            {errors.policy}
                        </FormHelperText>
                    )}

                    {errors.submit &&
                        <Box mt={2} style={{width: '100%'}}>
                            <Alert
                                severity={errors.submit === "OK" ? "info" : "error"}
                            >
                            </Alert>
                        </Box>}
                    <Box mt={2}>
                        <Button
                            color="secondary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Sign up
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}