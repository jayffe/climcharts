
import React from "react"
import {withStyles} from "@material-ui/core/es/styles"
import {Paper, Grid, Typography} from "@material-ui/core";

const Options = ({classes, children, titre}) => (

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
    padding: theme.spacing.unit * 2,
    flexDirection:"column"
  }
})

const StyledOptions = withStyles(styles)(Options);

export default StyledOptions