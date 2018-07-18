import React, {Component} from 'react'
import {TextField} from "@material-ui/core"
import {formatDate} from "../utils"
import withStyles from "@material-ui/core/styles/withStyles"
import moment from "moment/moment";

class DateRange extends Component {

  changeDateFin = (e) => {

    const {onChange} = this.props
    const date = moment(e.target.value, "YYYY-MM-DD").utc()
    onChange({fin: date.toDate()})
  }

  changeDateDebut = (e) => {

    const {onChange} = this.props
    const date = moment(e.target.value, "YYYY-MM-DD").utc()
    onChange({debut: date.toDate()})
  }

  render() {

    const { debut, fin, classes } = this.props

    return (
      <form className={classes.form} noValidate>
        <TextField
          id="dateDebut"
          label="Du"
          type="date"
          onChange={this.changeDateDebut}
          value={formatDate(debut)}
          className={classes.textField}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          id="dateFin"
          label="Au"
          type="date"
          onChange={this.changeDateFin}
          value={formatDate(fin)}
          className={classes.textField}
          InputLabelProps={{shrink: true}}
        />
      </form>
    )
  }
}

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  form: {
    marginTop: 30
  },
  textField:{
    marginRight: 20
  }
});
const StyledDateRange = withStyles(styles)(DateRange);

export default StyledDateRange;