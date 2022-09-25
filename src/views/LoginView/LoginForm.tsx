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

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    // @ts-ignore
    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
                submit: null
            }}

            validationSchema={Yup.object().shape({
                login: Yup.string().when('isEmailValue', {
                    is: 'true',
                    then: Yup.string()
                        .email('Введите корректный логин')
                        .required('Логин обязателен'),
                    otherwise: Yup.string()
                        .matches(phoneRegExp, 'Введите корректный логин')
                        .required('Логин обязателен'),
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