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
import { RoutingUtil } from "@/Utils";
import { Link } from "react-router-dom";

const styles = createStyles({
    appBar: {
        borderBottom: '1px solid white',
        borderTop: '0px'
    },
    logo: {
        fontWeight: 600,
        textDecoration: 'none'
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
                            alt='Ícone da imagem de perfil do usuário logado'
                            title={
                                UserInfo.DisplayName !== '' 
                                /*RoutingUtil.getPathnameFromLocation(Page).includes('Login')*/ ? 
                                UserInfo.DisplayName 
                                : 
                                undefined
                            }
                            width={56}
                            height={56}
                        />
                    </IconButton>
                    <Typography
                        variant='h1'
                        component={Link as any}
                        to='/Feed'
                        className={classes.logo}
                    >
                        LifeCycle                        
                    </Typography>

                    <div className={classes.adjustJustify}>&nbsp; </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withTheme(withStyles(styles)(AppHeader));