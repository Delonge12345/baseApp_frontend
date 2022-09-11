import {FC} from "react";
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Box,
    Button,
    TextField,

} from '@material-ui/core';
import {Alert} from '@material-ui/lab';



// @ts-ignore
import useAuth from "../../hooks/useAuth";

const LoginForm: FC = () => {

// // @ts-ignore
    const {login} = useAuth();
//     const {setAuth} = useAuth()


    // @ts-ignore
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                submit: null
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}

            //@ts-ignore
            onSubmit={async (values, {
                setErrors,
            }) => {
                try {
                    //@ts-ignore
                    const response = await login(values.email, values.password);
                    //@ts-ignore
                    setErrors({submit: response})
                } catch (err) {
                    console.error("Caught error while logging in....", err);
                }
            }}


        >
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
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        autoFocus
                        helperText={touched.email && errors.email}
                        label="Email Address"
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
                    <Box mt={2}>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Log In
                        </Button>
                    </Box>
                    {errors.submit &&
                        <Box mt={2} style={{width: '100%'}}>
                            <Alert
                                severity={errors.submit === "OK" ? "info" : "error"}
                            >
                                {errors.submit}
                            </Alert>
                        </Box>}
                </form>
            )}
        </Formik>
    );

}

export default LoginForm;