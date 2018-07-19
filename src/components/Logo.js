
import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"

const Logo = ({classes})=>(
  <img className={classes.logo} src={require('../images/climcharts.png')} alt="ClimCharts" />
)

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  logo:{
    width:200
  }
});
const StyledLogo = withStyles(styles)(Logo)

export default StyledLogo