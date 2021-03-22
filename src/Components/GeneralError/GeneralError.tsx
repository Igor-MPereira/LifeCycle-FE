import { withAppContext } from '@/App/ApplicationContext';
import Grid from '@material-ui/core/Grid';
import React, { ErrorInfo, PureComponent } from 'react';
import { IGeneralErrorProps, IGeneralErrorState } from './types';

class GeneralError extends PureComponent<IGeneralErrorProps, IGeneralErrorState> {
    constructor(p: IGeneralErrorProps) {
        super(p);

        this.state = { 
            error: null,
            errorDetails: null
        }
    }

    public componentDidCatch(error: Error, errorDetails: ErrorInfo) {
        this.setState({
            error, 
            errorDetails
        });
    }

    public render() {
        if(this.state.error) {
            return (
                <Grid
                    container
                >
                    {this.state.error.name} : {this.state.error.message} : {this.state.error.stack} : {this.state.errorDetails?.componentStack ?? ''}
                </Grid>
            );
        }

        return this.props.children;
    }
}

export default withAppContext(GeneralError);