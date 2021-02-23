import { createMuiTheme, ThemeOptions, Theme, lighten } from "@material-ui/core/styles";


export default function DefaultTheme(options: ThemeOptions) {
    return createMuiTheme({
        palette: {
            primary: { main: "#fff" },
            background: {
                default: '#090c15',
                paper: lighten('#090c15', 0.02)
            }
        },
        typography: {
            fontFamily: "monospace",
            h1: { fontSize: 32, textShadow: `3px 3px 3px ${lighten('#090c15', 0.15)}` },
            allVariants: { color: '#fff' }
        },
        ...options
    });
}