import React from 'react'
import {makeStyles} from "@material-ui/core";
import {DefaultTheme} from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {FileDownload} from "@mui/icons-material";

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

export const AvatarComponent = ({avatar}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const baseImage64 = 'data:image/jpeg;base64,' + `${avatar}`;
    return (
        <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
            {(!avatar || avatar === '') ?
                <Avatar className={classes.avatar} style={{height: 200, width: 200}}/> :
                <Avatar src={baseImage64} className={classes.avatar}
                        style={{height: 200, width: 200}}/>
            }


            {/*<input type="file" value="" id="fileAva" accept="image/*" style={{display: 'none'}}*/}
            {/*       onChange={onAvatarChange}*/}
            {/*/>*/}
            {/*<label className={classes.avaHover} htmlFor="fileAva">*/}
            {/*    <FileDownload fontSize='large'/>*/}
            {/*</label>*/}
        </div>
    )

}