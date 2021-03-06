
import React from "react"
import {AppBar, Toolbar, IconButton, Button, Typography} from "@material-ui/core"
import {Menu, Code} from "@material-ui/icons"
import withStyles from "@material-ui/core/styles/withStyles"
import {Logo} from "."


const Header = ({classes, toggleDrawer})=>(

  <AppBar className={classes.root} position="static">
    <Toolbar>
      <IconButton onClick={toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
        <Menu />
      </IconButton>
      <Typography variant="title" color="inherit" className={classes.flex}>
        <Logo/>
      </Typography>
      <Button target="_blank" color="inherit" href="https://github.com/jayffe/climcharts"><Code/>Code Source</Button>
    </Toolbar>
  </AppBar>
)

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  root: {
    backgroundColor: "#FFF",
    color:"#717171"
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});
const StyledHeader = withStyles(styles)(Header)

export default StyledHeader