import { withAppContext } from "@/App/ApplicationContext";
import CredentialsInput from "@/Components/UI/TextField/CredentialsInput";
import DefaultTheme from "@/Components/UI/Theme/DefaultTheme";
import AuthenticationService from "@/Services/Authentication/AuthenticationService";
import { createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { PureComponent } from "react";
import { ILoginProps, ILoginState } from "./types";

const styles = createStyles({
    paper: {
        border: '0px',
        height: 'fit-content',
        padding: 36,
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center'
    },
    field: {
        minWidth: 258
    },
    loginButton: {
        textTransform: 'none',
        marginTop: 10,
        minWidth: 258
    }
});

class Login extends PureComponent<ILoginProps<keyof typeof styles>, ILoginState> {
    private readonly AuthService: AuthenticationService;

    constructor(props: ILoginProps) {
        super(props);

        this.AuthService = AuthenticationService.Instance;

        this.state = {
            Input: '',
            InputValidationMessage: '',
            Password: '',
            PasswordValidationMessage: '',
            PasswordValidationScore: 0,
            SignInFailedError: ''
        };
    }

    public handleInput = (value: string) => {
        //Validate
        this.setState({
            Input: value
        });
    }

    public handlePassword = (value: string) => {
        //Validate
        this.setState({
            Password: value
        })
    }

    public handleSubmit = async () => {
        try {
            const { Input, Password } = this.state;

            let isLoggedIn = await this.AuthService.Login(Input, Password);

            console.log(isLoggedIn);

            this.props.history.replace('/Feed');
        } catch (e) {
            console.log(e);
        }
    }



    render() {
        const { classes = { }, appContext } = this.props;
        console.log(appContext);
        return (
            <Grid
                container
                justify='center'
                style={{
                    height: "calc(100% - 82px)"
                }} 
                alignItems='center'
            >
                <Paper
                    className={classes.paper}
                    variant={'elevation'}
                    elevation={4}
                >
                    <Typography 
                        variant='h3'
                        style={{
                            fontSize: 28,
                            marginBottom: 24
                        }}
                    >
                        Entrar
                    </Typography>
                    <CredentialsInput
                        onChange={this.handleInput}
                        value={this.state.Input}
                        error={this.state.InputValidationMessage !== ''}
                        helperText={this.state.InputValidationMessage}
                        className={classes.field}
                        label={'Usuário ou E-Mail'}
                    />
                    <CredentialsInput
                        onChange={this.handlePassword}
                        value={this.state.Password}
                        className={classes.field}
                        error={this.state.PasswordValidationMessage !== ''}
                        helperText={this.state.PasswordValidationMessage}
                        type='password'
                        label={'Senha'}
                    />
                    <Button
                        className={classes.loginButton}
                        size='large'
                        style={{
                            backgroundColor: appContext.theme.palette.background.default,
                            boxShadow: '0px 2px 4px black, 0px 3px 1px black, 0px 3px 1px black'
                        }}
                        onClick={e => {
                            this.handleSubmit()
                        }}
                    >
                        <Typography>
                            Login
                        </Typography>
                    </Button>
                </Paper>
            </Grid>
        );
    }
}

export default withAppContext(withStyles(styles)(Login));