
import React from "react"
import { List, Divider } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import {MenuItem, Logo} from "."

const Menu = ({classes})=>(

  <div className={classes.list}>

    <Logo/>

    <Divider />

    <List>
      <MenuItem to="/" label="Bilan climatique"/>
    </List>

    <Divider />

  </div>
)

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  list: {
    width: 250,
    "& img":{
      display: "block",
      width:200,
      margin: "20px auto"
    }
  }
})
const StyledMenu = withStyles(styles)(Menu)

export default StyledMenu