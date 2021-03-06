import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class AppShell extends React.Component {
    state = {
        toggle: false
    }

    handleDrawerToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton 
                                color="inherit"
                                edge="start"
                                className={classes.menuButton} 
                                onClick={this.handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>News</Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer open={this.state.toggle}>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/">홈 화면</Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/texts">텍스트 관리</Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/words">단어 관리</Link>
                        </MenuItem>
                        
                    </Drawer>
                </div>
                <div id="content" style={{margin: 'auto', marginTop: '20px'}}>
                    {React.cloneElement(this.props.children)}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AppShell);