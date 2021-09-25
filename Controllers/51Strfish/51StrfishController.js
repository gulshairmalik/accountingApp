const excelToJson = require('convert-excel-to-json')
const moment = require('moment')
const fs = require('fs')
const allMakeup = JSON.parse(fs.readFileSync('./makeup.json'))
const headfees = JSON.parse(fs.readFileSync('./headfees.json'))
const playerCount = JSON.parse(fs.readFileSync('./playersCount.json'))
const fsExtra = require('fs-extra')
const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('51STRFISH')
const JSONdb = require('simple-json-db')
const db = new JSONdb('./Controllers/51Strfish/db.json')

exports.getIndex = (req,res) => {
    res.render("51strfish")
}

exports.getCalculatedData = (req,res) => {

    const startMakeup = allMakeup.hasOwnProperty("51strfish") ? allMakeup["51strfish"] : 0
    const datePeriod = `${moment(req.body.startDate).format("MM/DD")} - ${moment(req.body.endDate).format("MM/DD")}`

    // Getting Data from DB
    const dbData = db.JSON().data !== '' ? JSON.parse(db.JSON().data) : null
    
    const result = excelToJson({
        sourceFile: `./uploads/${req.file.originalname}`
    })

    const totalEarned = result[Object.keys(result)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const lastWeekMakeUp = dbData === null ? startMakeup : dbData[dbData.length - 1]["makeUp"] < 0 ? dbData[dbData.length - 1]["makeUp"] : 0
    let totalAmountOfWeek = result[Object.keys(result)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    totalAmountOfWeek = totalAmountOfWeek + lastWeekMakeUp
    const scooterTotal = totalAmountOfWeek > 0 ? (((totalAmountOfWeek * 0.50) / 2) + (Math.abs(lastWeekMakeUp) / 2)).toFixed(2) : (totalEarned / 2)
    const strfish51Total = totalAmountOfWeek > 0 ? (totalAmountOfWeek * 0.50).toFixed(2) : 0
    const makeUp = totalAmountOfWeek > 0 ? 0 : totalAmountOfWeek
    const headFees = (playerCount.find((x) => x.agentName === "STARFISH") && headfees.hasOwnProperty("51STRFISH")) ? parseInt(headfees["51STRFISH"] * playerCount.find((x) => x.agentName === "STARFISH")["playersCount"]).toFixed(2) : 0
    const scooterNet = scooterTotal - headFees

    const data = {
        "date": datePeriod.toString(),
        "total": totalEarned,
        "scooterTotal": scooterTotal,
        "strfish51Total": strfish51Total,
        "makeUp": makeUp,
        "headFees": headFees,
        "scooterNet": scooterNet
    }

    // Persisting data on DB
    if (dbData) db.set('data', JSON.stringify([...dbData, data]))
    else db.set('data', JSON.stringify([data]))


    const headingColumnNames = [
        "Date",
        "Total",
        "Scooter Total",
        "51Strfish Total",
        "51Strfish Makeup",
        "Head Fees",
        "Scooter Net"
    ]

    const dataToBeWrittenToExcel = dbData !== null ? [...dbData, data] : [data]

    // Setting style for data
    for (let i = 1; i <= dataToBeWrittenToExcel.length; i++) {
        headingColumnNames.forEach((x, j) => {
            ws.cell(i + 1, j + 1).style({ alignment: { horizontal: "center" } })
        })
    }
    dataToBeWrittenToExcel.forEach((x, i) => {
        ws.cell(1, i + 1).style({ font: { size: 13, bold: true, }, alignment: { horizontal: "center" } })
    })

    // Setting Heading Column Style
    ws.row(1).setHeight(20)
    headingColumnNames.forEach((x, i) => {
        ws.cell(1, i + 1).style({ font: { size: 13, bold: true, }, alignment: { horizontal: "center" } })
    })

    // Setting width for excel file
    headingColumnNames.forEach((x, i) => {
        if (i === 0) ws.column(i + 1).setWidth(25)
        else ws.column(i + 1).setWidth(20)
    })


    //Write Column Title in Excel file
    let headingColumnIndex = 1
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    })

    //Write Data in Excel file
    let rowIndex = 2
    dataToBeWrittenToExcel.forEach( record => {
        let columnIndex = 1
        Object.keys(record ).forEach(columnName => {
            if (columnIndex !== 1) {
                if (parseInt(record[columnName]) >= 0) ws.cell(rowIndex, columnIndex).style({ font: { color: "#2a753e" } })
                else ws.cell(rowIndex, columnIndex).style({ font: { color: "#ff2626" } })
            }
            if (columnName !== "date") ws.cell(rowIndex,columnIndex++).number(parseFloat(record[columnName]))
            else ws.cell(rowIndex,columnIndex++).string(record[columnName])
        })
        rowIndex++
    }) 

    wb.write('./uploads/51strfish.xlsx', (err, stat) => {
        res.download('./uploads/51strfish.xlsx', (err) => {
            fsExtra.removeSync("./uploads/51strfish.xlsx")
            fsExtra.removeSync(`./uploads/${req.file.originalname}`)
        })
    })

}
  