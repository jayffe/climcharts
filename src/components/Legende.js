import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {Grid, Paper, Typography} from "@material-ui/core"


class Legende extends React.Component{

  render(){

    const {classes, colors} = this.props

    return (
      <Grid container justify="center" spacing={40}>
        {Object.keys(colors).map(key => (

          <Grid key={key} item>
            <Paper elevation={0} className={classes.legend} style={{backgroundColor:colors[key], margin:8, border: "1px solid #A2A2A2"}}/>
            <Typography style={{color:"#787878"}}>{key}</Typography>
          </Grid>

        ))}
      </Grid>
    )
  }
}

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  legend: {
    height: 20,
    width: 20,
  },
});
const StyledLegende = withStyles(styles)(Legende)

export default StyledLegende