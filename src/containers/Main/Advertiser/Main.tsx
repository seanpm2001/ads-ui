import {
  Divider,
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { CloseDrawer } from "../../../actions";
import Appbar from "../../../components/Appbar/Appbar";
import Campaigns from "../../Campaigns/Campaigns";
import Creatives from "../../Creatives/Creatives";
import Dashboard from "../../Dashboard/Advertiser/Dashboard";
import Performances from "../../Performances/Performances";
import Preferences from "../../Preferences/Preferences";

import { styles } from "./Main.style";

class Main extends React.Component<any, any> {

  public render(): any {
    if (!this.props.user || !this.props.user.signedIn) {
      return (<Redirect to="/auth/signin" />);
    }
    const { classes } = this.props;
    const drawerItems = (
      <List>
        <Link to="/main/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>dashboard</Icon>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/main/creatives" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>apps</Icon>
            </ListItemIcon>
            <ListItemText primary="Creative Library" />
          </ListItem>
        </Link>
        <Link to="/main/campaigns" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>next_week</Icon>
            </ListItemIcon>
            <ListItemText primary="Campaigns" />
          </ListItem>
        </Link>
        <Link to="/main/performances" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>timeline</Icon>
            </ListItemIcon>
            <ListItemText primary="Performances" />
          </ListItem>
        </Link>
        <Link to="/main/preferences" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Preferences" />
          </ListItem>
        </Link>
      </List>
    );
    return (
      <div className={classes.root}>
        <Appbar />
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open={false} classes={{
            paper: classNames(classes.drawerPaper, !this.props.drawer.open && classes.drawerPaperClose),
          }}>
            <div className={classes.toolbar}>
            </div>
            <Divider />
            {drawerItems}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer variant="persistent" anchor="left" open={this.props.drawer.open}>
            <div className={classes.toolbar}>
            </div>
            <Divider />
            {drawerItems}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path={this.props.match.url + "/dashboard"} component={Dashboard} />
            <Route path={this.props.match.url + "/creatives"} component={Creatives} />
            <Route path={this.props.match.url + "/campaigns"} component={Campaigns} />
            <Route path={this.props.match.url + "/performances"} component={Performances} />
            <Route path={this.props.match.url + "/preferences"} component={Preferences} />
            <Redirect to={this.props.match.url + "/dashboard"} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  drawer: state.drawerReducer,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  CloseDrawer: () => dispatch(CloseDrawer({})),
  Signout: () => dispatch(CloseDrawer({})),
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Main));
