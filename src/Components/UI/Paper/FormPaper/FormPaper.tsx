import { ClassNames } from '@/Utils';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { memo } from 'react';
import { IFormPaperProps } from "./types";

const useStyles = makeStyles(t => ({
    typography: { 
        fontSize: 28,
        marginBottom: 24
    },
    paper: {
        border: '0px',
        height: 'fit-content',
        padding: 36,
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center'
    }
}));

function FormPaper(props: IFormPaperProps) {
    const classes = useStyles();

    const { title, className, TypographyProps = {}, onClick } = props;

    return (
        <Paper
            className={ClassNames.useClassNames(classes.paper, className)}
            variant={'elevation'}
            elevation={4}
            onClick={onClick}
        >
            <Typography 
                {...TypographyProps}
                // variant='h3'
                className={ClassNames.useClassNames(classes.typography, TypographyProps.className)}
            >
                {title}
            </Typography>
            {props.children}
        </Paper>
    );
}

export default memo(FormPaper);