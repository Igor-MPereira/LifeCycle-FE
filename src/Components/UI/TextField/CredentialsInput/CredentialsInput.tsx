import { Theme } from "@material-ui/core";
import { InputBaseComponentProps } from "@material-ui/core/InputBase";
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
    const { onChange, variant, InputLabelProps, className, endAdornment, ...rest } = props;

    const classes = useStyles();

    const inputProps: InputBaseComponentProps = { };

    // switch(props.type) {
    //     case 'date':
    //         inputProps['pattern'] = '\d{2}-\d{2}-\d{4}';
    //     break;

    //     default:
            
    //     break;
    // }

    return (
        <TextField
            {...rest}
            className={`${className} ${classes.textfield}`}
            variant='outlined'
            id={props.id}
            InputProps={{
                classes:{
                    focused: `${classes.InputLabelFocused} ${classes.InputFocused}`,
                    notchedOutline: classes.InputLabel
                },
                endAdornment,
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
                ...inputProps,
                style: {
                    color: 'white',
                    textAlign: 'center'
                }
            }}
            onChange={e => onChange(e.target.value)}
            autoComplete={props.type === 'password' ? 'current-password' : undefined}
            size='medium'
        />
    )
}

export default CredentialsInput;