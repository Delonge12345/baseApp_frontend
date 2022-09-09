// import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import {
    AppBar,
    Box,
    Divider,
    Toolbar,
    makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme?: any) => ({
    root: {
        backgroundColor: theme.palette.background.default
    },
    toolbar: {
        height: 64
    },
    link: {
        fontWeight: theme.typography.fontWeightMedium,
        '& + &': {
            marginLeft: theme.spacing(2)
        }
    },
    divider: {
        width: 1,
        height: 32,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}))

const TopBar = ({  ...rest }) => {
    const classes = useStyles();

    return (
        <AppBar
            className={clsx(classes.root)}
            color='default'
            {...rest}
        >
            <Toolbar className={classes.toolbar}>
                <Box flexGrow={1} />

                {/*<Link*/}
                {/*    className={classes.link}*/}
                {/*    color='textSecondary'*/}
                {/*    component={RouterLink}*/}
                {/*    to='/docs'*/}
                {/*    underline='none'*/}
                {/*    variant='body2'*/}
                {/*>*/}
                {/*    Documentation*/}
                {/*</Link>*/}
                <Divider className={classes.divider} />
                {/*<Button*/}
                {/*    color='secondary'*/}
                {/*    component={RouterLink}*/}
                {/*    to='/app'*/}
                {/*    variant='contained'*/}
                {/*    size='small'*/}
                {/*>*/}
                {/*    Go to App*/}
                {/*</Button>*/}
            </Toolbar>
        </AppBar>
    );
};



export default TopBar;
