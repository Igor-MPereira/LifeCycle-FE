import { withAppContext } from "@/App/ApplicationContext";
import RequestService from "@/Services/Request/RequestService";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles, withTheme } from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import React, { PureComponent } from "react";
import { IFeedProps, IFeedState } from "./types";

const styles = createStyles({

});

class Feed extends PureComponent<IFeedProps<keyof typeof styles>, IFeedState> {
    private ReqService: RequestService;

    constructor(props: IFeedProps) {
        super(props);

        this.ReqService = new RequestService();

        this.state = {
            Tags: []
        }
    }

    async componentDidMount() {
        let tags = await this.ReqService.GetJson<string[]>('tags/ToList');
                console.log(tags)
                this.setState({ Tags: tags });
        setInterval(async () => {
            try {
                let tags = await this.ReqService.GetJson<string[]>('tags/ToList');
                console.log(tags)
                this.setState({ Tags: tags });
            } catch (e) {
                console.log(e)
            }
        }, 180000)
    }

    render() {
        return (
            <Grid
                container
            >
                <Typography>{this.state.Tags.join(',   ')}</Typography>
            </Grid>
        );
    }
}

export default withAppContext(withStyles(styles)(Feed))