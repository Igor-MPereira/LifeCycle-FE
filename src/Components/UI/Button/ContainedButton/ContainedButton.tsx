import Button from "@material-ui/core/Button";
import { darken, lighten, useTheme } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { ClassNames } from '@/Utils/Styles';
import { ContainedButtonStyleTypeMap, IContainedButtonProps } from "./types";
import { Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";

const useStyles = ({ buttonColor, hoverColor, width, shadow }: ContainedButtonStyleTypeMap) => makeStyles((t: Theme) => ({
    button: {
        background: buttonColor ?? t.palette.background.default,
        textTransform: 'none',
        minWidth: width ?? 258,
        boxShadow: shadow ?? '0px 2px 4px black, 0px 3px 1px black, 0px 3px 1px black',
        ['&:hover']: {
            background: hoverColor ?? darken(t.palette.background.default, 0.4),
        }
    }
}));

function ContainedButton(props: IContainedButtonProps) {

    const theme = useTheme();
    const { width, buttonColor, color, hoverColor, shadow, ...rest } = props;
    const classes = useStyles({ buttonColor, width, hoverColor, shadow })(theme);


    return (
        <Button
            {...rest}  
            variant='contained'    
            className={ClassNames.useClassNames(props.className, classes.button)}      
        >
            <Typography>{props.children}</Typography>
        </Button>
    );
};

export default ContainedButton;