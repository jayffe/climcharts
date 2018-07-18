import React, {Fragment} from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {Grid, Typography, Divider} from "@material-ui/core";

const Option = ({classes, children, titre, desc}) => (

  <Fragment>
    <Divider className={classes.divider}/>
    <Grid className={classes.optionLabel} style={{alignItems: "baseline"}} item xs={8}>
      <Typography align="left" variant="button">{titre}</Typography>
      <Typography align="left">{desc}</Typography>
    </Grid>
    <Grid item xs={4}>
      {children}
    </Grid>
  </Fragment>

);

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  optionLabel: {
    display: "flex",
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    alignItems: "baseline",
    flexDirection: "column"
  },
  divider: {
    color: "#8f8f8f",
    width: "100%",
    margin: "10px 0"
  }
});
const StyledOption = withStyles(styles)(Option);

export default StyledOption