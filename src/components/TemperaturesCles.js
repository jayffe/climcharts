import React, {Fragment} from "react"
import {Grid, TextField, InputAdornment, Paper, Divider, Button} from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import {Delete} from "@material-ui/icons"
import {ChromePicker} from 'react-color'

class TemperatureCle extends React.Component {

  state = {
    showPicker: false
  }

  changeTemp = (e) => {

    const {onChange, i} = this.props
    onChange(i, "temp", +e.target.value)
  }

  changeLabel = (e) => {

    const {onChange, i} = this.props
    onChange(i, "label", e.target.value)
  }

  changeColor = (color) => {

    const {onChange, i} = this.props
    onChange(i, "color", color.hex)
    this.setState({showPicker: false})
  }

  render() {

    const {showPicker} = this.state
    const {temp, label, color, classes, remove, i} = this.props

    return (
      <Fragment>
        <Divider className={classes.divider}/>
        <Grid container spacing={20} justify="center" className={classes.container} alignItems="end">

          <Grid style={{"align-items": "baseline"}} item xs={2}>
            <TextField
              className={classes.label}
              type='number' value={temp}
              onChange={this.changeTemp}
              InputProps={{endAdornment: <InputAdornment position="end">°C</InputAdornment>}}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth={true} placeholder="label" value={label} onChange={this.changeLabel}/>
          </Grid>

          <Grid item xs={1}>
            {showPicker
              ? <ChromePicker disableAlpha={true}
                              className={classes.picker}
                              onChange={this.changeColor}
                              color={color}/>
              : <Paper onClick={() => this.setState({showPicker: true})}
                       elevation={0}
                       className={classes.legend}
                       style={{backgroundColor: color, border: "1px solid #A2A2A2"}}/>
            }
          </Grid>
          <Grid item xs={1}>
           <Delete className={classes.deleteButton} onClick={()=>remove(i)} color="error"/>
          </Grid>
        </Grid>
      </Fragment>)
  }
}

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  container: {
    padding: 20
  },
  label: {
    width: 60
  },
  legend: {
    width: 20,
    height: 20
  },
  divider: {
    color: "#8f8f8f",
    width: "100%",
    margin: "10px 0"
  },
  picker:{
    position: "absolute",
    zIndex: 10
  },
  deleteButton:{
    cursor: "pointer"
  }
});
const StyledTemperatureCle = withStyles(styles)(TemperatureCle);

export default StyledTemperatureCle