import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "material-ui";
import * as React from "react";

import { styles } from "./CampaignTable.style";

class CampaignTable extends React.Component<any, any> {
  public getActionButtons() {
    return (
      <div>
        <IconButton color="primary">
          <Icon>pause</Icon>
        </IconButton>
        <IconButton color="primary">
          <Icon>play_arrow</Icon>
        </IconButton>
      </div>
    );
  }
  public render() {
    const { campaigns, classes } = this.props;
    const tableBodyRows = campaigns.map((item: any) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            {item.campaign.name}
          </TableCell>
          <TableCell>
            1000
          </TableCell>
          <TableCell>
            1000
          </TableCell>
          <TableCell>
            1000
          </TableCell>
          <TableCell>
            {this.getActionButtons()}
          </TableCell>
        </TableRow>
      );
    });
    return (
      <div className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Campaigns
                  </TableCell>
                <TableCell>
                  Impressions
                  </TableCell>
                <TableCell>
                  Interactions
                  </TableCell>
                <TableCell>
                  Performance
                  </TableCell>
                <TableCell>
                  Controlls
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBodyRows}
            </TableBody>
          </Table>
      </div>
    );
  }
}

export default withStyles(styles)(CampaignTable);