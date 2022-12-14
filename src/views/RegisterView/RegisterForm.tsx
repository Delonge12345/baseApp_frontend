import {useState} from "react";
import * as Yup from 'yup';
import {Alert} from '@material-ui/lab';
import {Formik} from 'formik';
import {Box, Button, makeStyles, TextField,} from '@material-ui/core';

import {uploadAvatar} from "../../slices/authSlice";
import {useDispatch} from "react-redux";
import Avatar from '@mui/material/Avatar';
import {FileDownload} from "@mui/icons-material";
import {useSelector} from "../../store";
import useAuth from "../../hooks/useAuth";


const useStyles = makeStyles((theme) => ({
    root: {},
    name: {
        marginTop: theme.spacing(3)
    },
    avatar: {
        height: 300,
        width: 300,
        position: 'relative'
    },
    avaHover: {
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '32px',
        transition: 'opacity 0.3s ease-in-out',
        '&:hover ': {
            cursor: 'pointer',
            opacity: 1
        }
    },
    avaUpload: {
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '32px',
        transition: 'opacity 0.3s ease-in-out'
    }
}));


// @ts-ignore
export const RegisterForm = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    // @ts-ignore
    const {avatar} = useSelector(state => state.auth)

    const [registerAvatar, setRegisterAvatar] = useState<string>(avatar)
    const {registerUser} = useAuth();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    // @ts-ignore
    const [open, setOpen] = useState();
    // @ts-ignore
    const [errorText, setErrorText] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    // const [fileBase64String, setFileBase64String] = useState('');

    const baseImage64 = 'data:image/jpeg;base64,' + `${registerAvatar}`;

    const onAvatarChange = (e) => {
        console.log('e', e)
        if (e.target.files[0].size >= 100000) {
            setErrorText('Image is so large, please select another image,which size is less or equal 100kb');
            // @ts-ignore
            setOpen(true);

        } else if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|ico|JPG|JPEG|PNG|ICO)$/)) {
            setErrorText('Please select valid image.Available extensions are .jpg .jpeg .png .ico');
            // @ts-ignore
            setOpen(true);

        } else if (e.target.files[0].size <= 100000 && e.target.files[0].name.match(/\.(jpg|jpeg|png|ico|JPG|JPEG|PNG|ICO)$/)) {
            setSelectedFile(e.target.files);
            setErrorText('')
        }

    };
    const encodeAvatarBase64 = (file) => {

        // @ts-ignore
        const reader = new FileReader();
        if (file) {
            {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // @ts-ignore
                    const initBase64 = reader.result;
                    // @ts-ignore
                    const Base64 = reader.result.split(';');
                    // @ts-ignore
                    // setFileBase64String(initBase64);
                    // @ts-ignore
                    dispatch(uploadAvatar(Base64[1].split(',')[1]));

                    setRegisterAvatar(Base64[1].split(',')[1])
                };
            }
        }
    };
    encodeAvatarBase64(selectedFile[0]);

    return (
        <Formik
            initialValues={{
                email: '',
                name: '',
                middleName: '',
                surname: '',
                phone: '',
                password: '',
                passwordConfirm: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('?????????????? ???????????????????? ????.??????????').max(255).required('????. ?????????? ??????????????????????'),
                name: Yup.string().max(255).required('?????? ??????????????????????'),
                middleName: Yup.string().max(255).required('???????????????? ??????????????????????'),
                phone: Yup.string()
                    .required("?????????? ???????????????? ????????????????????")
                    .matches(phoneRegExp, '?????????????? ???????????????????? ?????????? ????????????????')
                    .min(11)
                    .max(11),
                surname: Yup.string().max(255).required('?????????????? ??????????????????????'),
                password: Yup.string().min(8).max(255).required('???????????? ???????????????????? ?? ???????????? ?????????????????? ???? ?????????? 8 ????????????????'),
                passwordConfirm: Yup.string().min(8).max(255).required('?????????????????????????? ???????????? ??????????????????????'),

            })}
            onSubmit={async (values, {
                setErrors
            }) => {
                try {

                    if (values.password !== values.passwordConfirm) {
                        setErrors({submit: '???????????? ???? ??????????????????'})
                    } else {
                        // @ts-ignore
                        const response = await dispatch(registerUser(values, registerAvatar))
                        // @ts-ignore
                        response && response !== 'OK' &&  setErrors({submit: response})
                    }

                } catch (err) {
                    setErrors({submit: '???????????????????????? ?????? ????????????????????'})
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
                        <div style={{position: 'relative', display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems:'center'}}>
                            {(!registerAvatar || registerAvatar === '') ?
                                <Avatar className={classes.avatar} style={{height: 200, width: 200}}/> :
                                <Avatar src={baseImage64} className={classes.avatar}
                                        style={{height: 200, width: 200}}/>}
                            <input type="file" value="" id="fileAva" accept="image/*" style={{display: 'none'}}
                                   onChange={onAvatarChange}/>
                            <label className={classes.avaHover} htmlFor="fileAva">
                                <FileDownload fontSize='large'/>
                            </label>

                            {errorText!=='' &&
                                <Box mt={2} style={{width: '100%'}}>
                                    <Alert
                                        severity={'info'}
                                    >
                                        <div>
                                            {errorText}
                                        </div>
                                    </Alert>
                                </Box>
                            }

                        </div>

                        <TextField
                            error={Boolean(touched.surname && errors.surname)}
                            fullWidth
                            helperText={touched.surname && errors.surname}
                            label="??????????????"
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
                            label="??????"
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
                            label="????????????????"
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
                            label="?????????? ????????????????"
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
                            label="????. ??????????"
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
                            label="????????????"
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
                            label="?????????????????????? ????????????"
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
                                    severity={errors.submit === "OK" ? "info" : "error"}>
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
                                variant="contained">
                                ????????????????????????????????????
                            </Button>
                        </Box>
                    </form>)
            }
            }
        </Formik>
    )
}