import { withAppContext } from '@/App/ApplicationContext';
import FormPaper from '@/Components/UI/Paper/FormPaper';
import CredentialsInput from '@/Components/UI/TextField/CredentialsInput';
import Grid from '@material-ui/core/Grid';
import { createStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import React, { PureComponent } from 'react';
import { FormPaperChildrenProps, IRegisterProps, IRegisterState, RegisterFormsProps } from './types';
import GliderComponent, { } from 'react-glider';
import { useKey } from '@/Utils/Components';
import { ClassNames } from '@/Utils';
import DateInput from '@/Utils/Components/DateInput';
import '@UI/Theme/Forms-Slider.sass';

const fieldWidth = 258;

const paperPadding = 72;

const gridPadding = 80;

const width = fieldWidth + paperPadding + gridPadding;

const styles = createStyles({
    field: {
        minWidth: fieldWidth
    }
});

class Register extends PureComponent<IRegisterProps<keyof typeof styles>, IRegisterState> {
    
    constructor(props: IRegisterProps<keyof typeof styles>) {
        super(props);
        
        const { classes = { } } = props;

        const state: Register['state'] = { 
            Email: '',
            Password: '',
            Login: '',
            BirthDate: null,
            City: '',
            Country: '',
            DisplayName: '',
            Explicit: true,
            PhoneNumber: '',
            State: '',
            VerifyPassword: '',
            index: 0
        };

        
        this.state = state;
    }

    async componentDidMount() {
        
    }

    public handleClickForm = (index: number) => this.setState(s => {
        if(index === s.index) {
            return null;
        } 

        return {
            index
        };
    });

    public handleChangeLogin = (value: string) => this.setState(s => {
        let Login = value.replace(/[^a-zA-Z0-9_\.\-@]*/g, '');

        return { Login };
    });

    public handleChangeEMail = (value: string) => this.setState(s => {
        let Email = value.replace(/[^a-zA-Z0-9\@_\-\.+]*/g, '');

        return { Email };
    })

    public handleChangeBirthDate = (value: Date | null) => this.setState(s => {
        if(value === null) return null;

        return { BirthDate: value }
    });

    public handleChangePassword = (value: string) => this.setState({ Password: value });

    public handleChangeVerifyPassword = (value: string) => this.setState({ VerifyPassword: value });

    private RenderPaperChildren(i: number, pI: number, childrenProps?: FormPaperChildrenProps) {
        if(!childrenProps) return null;

            return childrenProps?.map((c, cI) => {
                
                switch(c.childrenType) {
                    case 'CredentialsInputProps':
                        return <CredentialsInput
                            {...c}
                            key={useKey('form-credentials-input', i, pI, cI)}
                        />
                }
            });
    }
    
    public render() {
        const { classes = { } } = this.props;

        const Forms: RegisterFormsProps = [
            {
                childrenProps: [
                    {
                        title: 'Criar Conta',
                        childrenProps: {
                            childrenType: 'CredentialsInputProps',
                            CredentialsInputProps: [
                                {
                                    onChange: this.handleChangeLogin,
                                    
                                    id: 'Login',
                                    label: 'Login',
                                    value: this.state.Login,
                                    className: classes.field,
                                    required: true
                                },
                                {
                                    id: 'EMail',
                                    label: 'E-Mail',
                                    value: this.state.Email,
                                    className: classes.field,
                                    onChange: this.handleChangeEMail,
                                    required: true
                                },
                                {
                                    id: 'Senha',
                                    label: 'Senha',
                                    value: this.state.Password,
                                    className: classes.field,
                                    onChange: this.handleChangePassword,
                                    required: true
                                },
                                {
                                    id: 'Verificar-Senha',
                                    label: 'Digite Sua Senha Novamente',
                                    value: this.state.VerifyPassword,
                                    className: classes.field,
                                    onChange: this.handleChangeVerifyPassword,
                                    required: true
                                }
                            ]
                        }
                    }
                ]
            },
            // {
            //     childrenProps: [
            //         {
            //             title: '',
            //             childrenProps: [
            //                 {
            //                     onChange: (value: string) => {this.handleChangeBirthDate(new Date(value.replace('-', '/')))},
            //                     label: 'Data de Nascimento',
            //                     className: classes.field,
            //                     id: 'BirthDate',
            //                     value: DateInput.LocaleStringToInput(this.state.BirthDate?.toLocaleDateString() ?? ''),
            //                     type: 'date',
            //                     InputLabelProps: {
            //                         shrink: true
            //                     }                              
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     childrenProps: [
            //         {
            //             title: 'Criar Conta',
            //             className: '',
            //             onClick: () => this.handleClickForm(2),
            //             childrenProps: [
            //                 {
            //                     onChange: () => { },
            //                     label: 'Data de Nascimento',
            //                     className: classes.field
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     childrenProps: [
            //         {
            //             title: 'Criar Conta',
            //             className: '',
            //             onClick: () => this.handleClickForm(3),
            //             childrenProps: [
            //                 {
            //                     onChange: () => { },
            //                     label: 'Data de Nascimento',
            //                     className: classes.field
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ]

        return (
            <Grid
                container
                alignItems='center'
                className='page-root x-hidden'
            >
                <Grid
                    id='swiper-container'
                    container
                    alignItems='center'
                    justify='center'
                    style={{
                        transform: `translateX(calc(50vw - 129px - 36px - 40px - ${this.state.index * (width)}px))`
                    }}
                    spacing={10}
                >
                    {
                        Forms.map((f, i) => (
                            <Grid
                                item
                                key={useKey('form-paper-grid', i)}
                            >                                
                                {
                                    f.childrenProps?.map((p, pI) => (
                                        <FormPaper
                                            {...p}
                                            onClick={() => this.handleClickForm(i)}
                                            className={ClassNames.useClassNames('form-paper', this.state.index === i ? 'centered focused' : 'unfocused')}
                                            key={useKey('form-paper', p.title, i, pI)}
                                        >
                                                {
                                                    this.RenderPaperChildren(i, pI, p.childrenProps)
                                                }
                                        </FormPaper>
                                    ))
                                }
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withAppContext(withStyles(styles)(Register));