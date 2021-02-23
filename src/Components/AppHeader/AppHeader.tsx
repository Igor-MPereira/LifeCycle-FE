import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import React, { PureComponent } from "react";
import { IAppHeaderProps } from "./types";
import src from '@/Assets/Images/user_undefined.png';
import '@UI/Theme/Animations.sass';
import withTheme from "@material-ui/core/styles/withTheme";

const styles = createStyles({
    appBar: {
        borderBottom: '1px solid white',
        borderTop: '0px'
    },
    logo: {
        fontWeight: 600
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    userIcon: {
        width: 64
    },
    adjustJustify: {
        minWidth: 64
    }
});

class AppHeader extends PureComponent<IAppHeaderProps<keyof typeof styles>> {
    
    render() {
        const { classes = { }, UserInfo, isLoggedIn, theme } = this.props;

        return (
            <AppBar
                variant='outlined'
                position='fixed'
                className={classes.appBar}
                style={{
                    background: theme?.palette.background.default
                }}
            >
                <Toolbar
                    className={classes.toolbar}
                >
                    <IconButton
                        className={classes.userIcon}
                        >
                        <img
                            src={src} 
                            alt={
                                UserInfo.DisplayName !== '' ? 
                                UserInfo.DisplayName 
                                : 
                                'Deslogado'
                            } 
                            width={56}
                            height={56}
                        />
                    </IconButton>
                    <Typography
                        variant='h1'
                        component='h1'
                        className={classes.logo}
                    >
                        LifeCycle                        
                    </Typography>

                    <div className={classes.adjustJustify} />
                </Toolbar>
            </AppBar>
        )
    }
}

export default withTheme(withStyles(styles)(AppHeader));