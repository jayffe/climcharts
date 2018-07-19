import * as csv from "csv-string"
import moment from "moment"
import 'moment/locale/fr'

export const formatDate = (d) => {

  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
export const climDemoE2 = (file, cb) => {

  csv.readAll(file, csv.detect(file), (csvLines) => {

    let data = []
    const station = csvLines[2][2]

    csvLines
      .filter((line) => (jours.includes(line[0])))
      .forEach((line) => {

        const date = moment(line[1], "DD/MM/YYYY").utc()

        data.push({
          Jour: line[0],
          DateFromCsv: line[1],
          date,
          TMini: +line[2],
          TMaxi: +line[3],
          TMoy: +line[4],
          Pluie: +line[5],
          ETP: +line[6],
          RgJoules: +line[7],
          Insolation: +line[8],
          VT: +line[9],
          UN: +line[10],
          UX: +line[11],
          UM: +line[12],
        })
      })

    const json = {
      data,
      station
    }

    cb(json)

  })
}

