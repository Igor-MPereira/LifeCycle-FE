import { Theme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { ICredentialsInputProps } from "./types";

const useStyles = makeStyles((t: Theme) => ({ 
    textfield: {
        marginTop: 10,
        marginBottom: 10
    },
    InputFocused: {
        color: 'white'
    },
    InputLabel: {
        borderColor: "white"
    },
    InputLabelFocused: {
        border: '0px white solid'
    },
    InputLabelLegend: {
        color: 'white'
    },
    InputLabelShrink: {
        color: 'white'
    }
}))

function CredentialsInput(props: ICredentialsInputProps) {
    const { onChange, variant, InputLabelProps, className, ...rest } = props;

    const classes = useStyles();

    return (
        <TextField
            {...rest}
            className={`${className} ${classes.textfield}`}
            variant='outlined'
            InputProps={{
                classes:{
                    focused: `${classes.InputLabelFocused} ${classes.InputFocused}`,
                    notchedOutline: classes.InputLabel
                }
            }}
            InputLabelProps={{
                ...InputLabelProps,
                classes: {
                    focused: classes.InputLabelFocused,
                    animated: classes.InputLabelLegend,
                    shrink: classes.InputLabelShrink
                }
            }}
            inputProps={{
                style: {
                    color: 'white'
                }
            }}
            onChange={e => onChange(e.target.value)}
            autoComplete={props.type === 'password' ? 'current-password' : undefined}
            size='medium'
        />
    )
}

export default CredentialsInput;