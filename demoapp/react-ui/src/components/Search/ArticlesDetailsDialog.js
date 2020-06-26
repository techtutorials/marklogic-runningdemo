import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import parse from 'html-react-parser';
import ReactTooltip from 'react-tooltip'



const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArticlesDetailsDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ marginTop: 10 }}>
                Read More...
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Typography variant="body2" color="textSecondary" component="p" style={{ margin: 10 }}>
                <div>{parse(props.props.details.join(''))}</div>
                <ReactTooltip 
                    clickable='true' 
                    multiline='true' 
                    html='true'
                    textColor='#ffffff' 
                    wrapper='div'
                    place='right'
                    getContent={() => { 
                    return `
                    <p>A covalent bond, also called a molecular bond, is a chemical bond
                    that involves the sharing of electron pairs between atoms.</p>
                    These electron pairs are known as shared pairs or bonding pairs, 
                    and the stable balance of attractive and repulsive forces between atoms,
                    when they share electrons, is known as covalent bonding.</p>
                    <p>For many molecules, the sharing of electrons allows each atom to attain
                    the equivalent of a full outer shell, corresponding to a stable electronic
                    configuration. In organic chemistry, covalent bonds are much more common
                    than ionic bonds.</p>
                    ` 
                }} />
                </Typography>
            </Dialog>
        </div>
    )
}