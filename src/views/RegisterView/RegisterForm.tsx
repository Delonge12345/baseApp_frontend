import {FC} from "react";
import * as Yup from 'yup';
import {Alert} from '@material-ui/lab';
import {Formik} from 'formik';
import {
    Box,
    Button,
    TextField,
} from '@material-ui/core';

import {register} from "../../slices/authSlice";
import {useDispatch} from "react-redux";


export const RegisterForm: FC = () => {

    const dispatch = useDispatch()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    return (
        <Formik
            initialValues={{
                email: '',
                name: '',
                middleName: '',
                surname: '',
                phone:'',
                password: '',
                passwordConfirm: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Введите корректную эл.почту').max(255).required('Эл. почта обязательна'),
                name: Yup.string().max(255).required('Имя обязательно'),
                middleName: Yup.string().max(255).required('Отчество обязательн'),
                phone: Yup.string()
                    .required("Номер телефона обязателен")
                    .matches(phoneRegExp, 'Введите корректный номер телефона')
                    .min(11)
                    .max(11),
                surname: Yup.string().max(255).required('Фамилия обязательна'),
                password: Yup.string().min(8).max(255).required('Пароль обязателен и должен содержать не менее 8 символов'),
                passwordConfirm: Yup.string().min(8).max(255).required('Подтверждение пароля обязательно'),

            })}
            onSubmit={async (values, {
                setErrors,
                setSubmitting
            }) => {
                try {

                    if (values.password !== values.passwordConfirm) {
                        setErrors({submit: 'Пароли не совпадают'})
                    } else {
                        //@ts-ignore
                        await dispatch(register(values.email, values.password, values.name, values.phone))

                        setSubmitting(true)
                        setErrors({submit: 'Что-то пошло не так'})
                    }

                } catch (err) {
                    console.error("Some kind of error has appeared in register process...", err);
                    setSubmitting(true);
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
              }) => {
                return (
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            error={Boolean(touched.surname && errors.surname)}
                            fullWidth
                            helperText={touched.surname && errors.surname}
                            label="Фамилия"
                            margin="normal"
                            name="surname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.surname}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="Имя"
                            margin="normal"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.middleName && errors.middleName)}
                            fullWidth
                            helperText={touched.middleName && errors.middleName}
                            label="Отчество"
                            margin="normal"
                            name="middleName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.middleName}
                            variant="outlined"
                        />

                        <TextField
                            error={Boolean(touched.phone && errors.phone)}
                            fullWidth
                            helperText={touched.phone && errors.phone}
                            label="Номер телефона"
                            margin="normal"
                            name="phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phone}
                            variant="outlined"
                        />


                        <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Эл. почта"
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
                            label="Пароль"
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
                            label="Подтвердите пароль"
                            margin="normal"
                            name="passwordConfirm"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.passwordConfirm}
                            variant="outlined"
                        />


                        {errors.submit &&
                            <Box mt={2} style={{width: '100%'}}>
                                <Alert
                                    severity={errors.submit === "OK" ? "info" : "error"}
                                >
                                    {errors.submit}
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
                                Зарегистрироваться
                            </Button>
                        </Box>
                    </form>)
            }
            }
        </Formik>
    )
}