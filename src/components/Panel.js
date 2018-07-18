
import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {Paper, Grid, Typography} from "@material-ui/core";

const Panel = ({classes, children, titre}) => (

  <Paper className={classes.options}>

    <Typography paragraph={true} className={classes.titre} variant="title">{titre}</Typography>

    <Grid container spacing={24}>
      {children}
    </Grid>

  </Paper>

);

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  options:{
    position: "relative",
    padding: theme.spacing.unit * 2,
    flexDirection:"column"
  }
})

const StyledPanel = withStyles(styles)(Panel);

export default StyledPanel