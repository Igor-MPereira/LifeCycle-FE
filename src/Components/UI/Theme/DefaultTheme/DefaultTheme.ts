import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

export default function DefaultTheme(options: ThemeOptions) {
    return createMuiTheme({
        palette: {
            primary: { main: "##090c15"}
        },
        ...options
    });
}