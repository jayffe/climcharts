
import React from "react"
import {AppBar, Toolbar, IconButton, Button, Typography} from "@material-ui/core"
import {Menu, Code} from "@material-ui/icons"
import withStyles from "@material-ui/core/styles/withStyles"
import {Logo} from "."


const Header = ({classes, toggleDrawer})=>(

  <AppBar color="#fff" position="static">
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
    flexGrow: 1,
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