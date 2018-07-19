
import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import { ListItem, ListItemText } from "@material-ui/core"
import { Link } from "react-router-dom"


const MenuItem = ({classes,to,label})=>(

  <Link className={classes.link} to={to}><ListItem button><ListItemText primary={label} /></ListItem></Link>
)

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
   link:{
     textDecoration: "none"
   }
});
const StyledMenuItem = withStyles(styles)(MenuItem)

export default StyledMenuItem