import { withAppContext } from "@/App/ApplicationContext";
import ContainedButton from "@/Components/UI/Button/ContainedButton";
import FormPaper from "@/Components/UI/Paper/FormPaper";
import CredentialsInput from "@/Components/UI/TextField/CredentialsInput";
import AuthenticationService from "@/Services/Authentication/AuthenticationService";
import CredentialsValidation from "@/Utils/Validation/CredentialsValidation";
import { createStyles, darken, lighten } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/styles";
import React, { createRef, PureComponent, RefObject } from "react";
import { ILoginProps, ILoginState } from "./types";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
    button: {
        marginTop: 10,
        marginBottom: 10
    },
    registerButton: {
        marginTop: 10,
        boxShadow: '0px'
    }
});

class Login extends PureComponent<ILoginProps<keyof typeof styles>, ILoginState> {
    private readonly AuthService: AuthenticationService;
    private inputRef: RefObject<HTMLInputElement>;

    constructor(props: ILoginProps) {
        super(props);

        this.AuthService = AuthenticationService.Instance;

        this.inputRef = createRef();

        this.state = {
            Input: '',
            InputValidationMessage: '',
            Password: '',
            PasswordValidationMessage: '',
            PasswordValidationScore: 0,
            SignInFailedError: '',
            ShowPassword: false,
            RememberMe: false
        };
    }

    public handleInput = (value: string) => {
        //Validate
        this.setState({
            Input: value
        });
    }

    public handlePassword = (value: string) => {
        let score = CredentialsValidation.ValidatePassword(value);
        this.setState({
            Password: value
        })
    }

    public handleSubmit = async () => {
        try {
            const { Input, Password } = this.state;

            let User = await this.AuthService.Login(Input, Password);
            this.props.appContext.UpdateUser(User);
            localStorage.setItem("LFwaRMLoSt", Number(this.state.RememberMe).toString());
            sessionStorage.setItem("LFwaRMSeSt", "1");
            this.props.history.replace('/Feed');
        } catch (e) {
            console.log(e);
        }
    }

    public handleRegister = () => this.props.history.push('/Registrar');

    public handleToggleShowPassword = () => { 
        if(this.inputRef.current) {
            let startI = this.inputRef.current.selectionStart;
            console.log(startI)
            this.setState(s => ({ ShowPassword: !s.ShowPassword }), () => {
                setTimeout(() => {
                    console.log(this.inputRef.current!.selectionStart)
                    this.inputRef.current!.selectionStart = startI
                }, 0);
            });
        }
    }

    public handleToggleRememberMe = () => this.setState(s => ({ RememberMe: !s.RememberMe }));

    render() {
        const { classes = { }, appContext } = this.props;
        return (
            <Grid
                container
                justify='center'
                alignItems='center'
                className='page-root'
            >
                <FormPaper
                    title="Entrar"
                >
                    <CredentialsInput
                        autoFocus
                        onChange={this.handleInput}
                        value={this.state.Input}
                        error={this.state.InputValidationMessage !== ''}
                        helperText={this.state.InputValidationMessage}
                        className={classes.field}
                        label={'Usuário ou E-Mail'}
                        endAdornment={
                            <InputAdornment position="end">
                                <Typography 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center' 
                                    }}
                                >
                                    <AccountCircle 
                                        style={{
                                            marginLeft: 12
                                        }}
                                    />
                                </Typography>
                            </InputAdornment>
                        }
                        onKeyUp={e => e.key === 'Enter' && this.handleSubmit()}
                    />
                    <CredentialsInput
                        onChange={this.handlePassword}
                        value={this.state.Password}
                        className={classes.field}
                        error={this.state.PasswordValidationMessage !== ''}
                        helperText={this.state.PasswordValidationMessage}
                        type={this.state.ShowPassword ? 'text' : 'password'}
                        label={'Senha'}
                        inputRef={this.inputRef}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleToggleShowPassword}
                                    onMouseDown={e => e.preventDefault()}
                                    edge="end"
                                >
                                    <Typography 
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center' 
                                        }}
                                    >
                                        {this.state.ShowPassword ? <Visibility /> : <VisibilityOff />}
                                    </Typography>
                                </IconButton>
                            </InputAdornment>
                        }
                        onKeyUp={e => e.key === 'Enter' && this.handleSubmit()}
                    />
                    <FormControlLabel 
                        label="Lembrar de mim"
                        control={
                            <Checkbox
                                checked={this.state.RememberMe}
                                key='remember-me'
                                color='primary'
                                onChange={this.handleToggleRememberMe}
                                inputProps={{
                                    "aria-label": "Remember Me Option Checkbox"
                                }}
                            />
                        }
                    />
                    <ContainedButton
                        onClick={this.handleSubmit}
                        className={classes.button}
                        buttonColor={lighten(appContext.theme.palette.background.default, 0.05)}
                    >
                        Login
                    </ContainedButton>
                    <ContainedButton
                        className={classes.registerButton}
                        buttonColor={appContext.theme.palette.background.paper}
                        shadow='0px 0px transparent'
                        onClick={this.handleRegister}
                    >
                        Criar Conta
                    </ContainedButton>
                </FormPaper>
            </Grid>
        );
    }
}

export default withAppContext(withStyles(styles)(Login));