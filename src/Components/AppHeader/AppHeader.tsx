import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import React, { PureComponent } from "react";
import { IAppHeaderProps } from "./types";

const styles = createStyles({
    appBar: {

    }
});

class AppHeader extends PureComponent<IAppHeaderProps<keyof typeof styles>> {
    
    render() {
        const { classes = { }, UserInfo, isLoggedIn } = this.props;

        return (
            <AppBar
                variant='outlined'
                position='sticky'
                className={classes.appBar}
            >
                <Toolbar>
                    LifeCycle
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(AppHeader);