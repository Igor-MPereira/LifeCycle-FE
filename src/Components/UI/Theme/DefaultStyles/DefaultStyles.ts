import { createStyles, Theme } from "@material-ui/core/styles";

export default function DefaultStyles(theme: Theme) {
    return createStyles({
        root: {
            display: 'flex',
            scroll: 'none'
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
        },
        appBarSpacer: theme.mixins.toolbar
    });
}