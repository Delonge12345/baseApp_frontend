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
                login: '',
                password: '',
                submit: null
            }}

            validationSchema={Yup.object().shape({
                //@ts-ignore
                login:   Yup.string("Enter your Email/Phone Number")
                    // .email("Enter a valid email")
                    .required("Эл. почта/Телефон")
                    .test('test-name', 'Введите корректный логин',
                        function(value) {
                            //@ts-ignore
                            const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                            const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
                            //@ts-ignore
                            let isValidEmail = emailRegex.test(value);
                            //@ts-ignore
                            let isValidPhone = phoneRegex.test(value);
                            if (!isValidEmail && !isValidPhone ){
                                return false;
                            }
                            return true;
                        }),
                password: Yup.string().max(255).required('Пароль обязателен')
            })}

            //@ts-ignore
            onSubmit={async (values, {
                setErrors,
            }) => {
                try {
                    //@ts-ignore
                    const response = await login(values.login, values.password, values.phone);
                    console.log('response',response)
                    //@ts-ignore
                    setErrors({submit: response})
                } catch (err) {
                    setErrors({submit: 'Некорректный логин или пароль'})
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
                        error={Boolean(touched.login && errors.login)}
                        fullWidth
                        autoFocus
                        helperText={touched.login && errors.login}
                        label="Эл. почта или номер телефона"
                        margin="normal"
                        name="login"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="login"
                        value={values.login}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Пароль"
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
                            Вход
                        </Button>
                    </Box>
                    {errors.submit &&
                        <Box mt={2} style={{width: '100%'}}>
                            <Alert severity={errors.submit === "OK" ? "info" : "error"}>
                                {errors.submit}
                            </Alert>
                        </Box>}
                </form>
            )}
        </Formik>
    );

}

export default LoginForm;