const excelToJson = require('convert-excel-to-json')
const moment = require('moment')
const fsExtra = require('fs-extra')
const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('WOODYMA')
const JSONdb = require('simple-json-db')
const db = new JSONdb('./Controllers/Woodyma/db.json')
const db1 = new JSONdb('./Controllers/Woodyma/db1.json')
const db2 = new JSONdb('./Controllers/Woodyma/db2.json')

exports.getIndex = (req,res) => {
    res.render("woodyma")
}

exports.getCalculatedData = (req,res) => {

    const datePeriod = `${moment(req.body.startDate).format("MM/DD")} - ${moment(req.body.endDate).format("MM/DD")}`

    // Getting Data from DB
    const dbData = db.JSON().data !== '' ? JSON.parse(db.JSON().data) : null

    // Getting Data from DB for Woody19
    const dbData1 = db1.JSON().data !== '' ? JSON.parse(db1.JSON().data) : null
    
    const result1 = excelToJson({
        sourceFile: `./uploads/${req.files.file1[0].originalname}`
    })

    const totalAmountOfWeek1 = result1[Object.keys(result1)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const scooterTotal1 = totalAmountOfWeek1 / 2
    const woody19Total1 = totalAmountOfWeek1 / 2
    const scooterNet1 = scooterTotal1

    const data1 = {
        "date": datePeriod.toString(),
        "total": totalAmountOfWeek1,
        "scooterTotal": scooterTotal1,
        "woody19Total": woody19Total1,
        "headFees": 0,
        "scooterNet": scooterNet1
    }

    // Persisting data on DB
    if (dbData1) db1.set('data', JSON.stringify([...dbData1, data1]))
    else db1.set('data', JSON.stringify([data1]))

    // Getting Data from DB For RedRaider
    const dbData2 = db2.JSON().data !== '' ? JSON.parse(db2.JSON().data) : null
        
    const result2 = excelToJson({
        sourceFile: `./uploads/${req.files.file2[0].originalname}`
    })

    const totalEarned = result2[Object.keys(result2)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const lastWeekMakeUp = dbData2 !== null && dbData2[dbData2.length - 1]["makeUp"] < 0 ? Math.abs(dbData2[dbData2.length - 1]["makeUp"]) : 0
    let totalAmountOfWeek2 = result2[Object.keys(result2)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    totalAmountOfWeek2 = dbData2 !== null && dbData2[dbData2.length - 1]["makeUp"] < 0 ? (totalAmountOfWeek2 + dbData2[dbData2.length - 1]["makeUp"]) : totalAmountOfWeek2
    const scooterTotal2 = totalAmountOfWeek2 > 0 ? (((totalAmountOfWeek2 * 0.60) / 2) + (lastWeekMakeUp / 2)).toFixed(2) : (totalEarned / 2)
    const woody19Total2 = totalAmountOfWeek2 > 0 ? (((totalAmountOfWeek2 * 0.60) / 2) + (lastWeekMakeUp / 2)).toFixed(2) : (totalEarned / 2)
    const redRaiderTotal = totalAmountOfWeek2 > 0 ? (totalAmountOfWeek2 * 0.40).toFixed(2) : 0
    const makeUp = totalAmountOfWeek2 > 0 ? 0 : totalAmountOfWeek2
    const scooterNet2 = scooterTotal2

    const data2 = {
        "date": datePeriod.toString(),
        "total": totalEarned,
        "scooterTotal": scooterTotal2,
        "woody19Total": woody19Total2,
        "redRaiderTotal": redRaiderTotal,
        "makeUp": makeUp,
        "headFees": 0,
        "scooterNet": scooterNet2
    }

    // Persisting data on DB
    if (dbData2) db2.set('data', JSON.stringify([...dbData2, data2]))
    else db2.set('data', JSON.stringify([data2]))



    const headingColumnNames = [
        "Date",
        "Total",
        "Scooter Total",
        "Woody19 Total",
        "Head Fees",
        "Scooter Net",
        "",
        "Combined Scooter Net",
        "",
        "Date",
        "Total",
        "Scooter Total",
        "Woody19 Total",
        "RedRaider Total",
        "RedRaider Makeup",
        "Head Fees",
        "Scooter Net"
    ]

    const data = {
        "date": datePeriod.toString(),
        "total": totalAmountOfWeek1,
        "scooterTotal": scooterTotal1,
        "woody19Total": woody19Total1,
        "headFees": 0,
        "scooterNet": scooterNet1,
        "null": "",
        "combinedScooterNet": (parseInt(scooterNet1) + parseInt(scooterNet2)).toFixed(2),
        "null1": "",
        "date1": datePeriod.toString(),
        "total1": totalEarned,
        "scooterTotal1": scooterTotal2,
        "woody19Total1": woody19Total2,
        "redRaiderTotal": redRaiderTotal,
        "makeUp": makeUp,
        "headFees1": 0,
        "scooterNet1": scooterNet2
    }

    // Persisting data on DB
    if (dbData) db.set('data', JSON.stringify([...dbData, data]))
    else db.set('data', JSON.stringify([data]))


    const dataToBeWrittenToExcel = dbData !== null ? [...dbData, data] : [data]


    // Setting style for Woddy19 Data
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
        if (i === 0) ws.column(i + 1).setWidth(12)
        else if (i === 1) ws.column(i + 1).setWidth(12)
        else if (i === 4) ws.column(i + 1).setWidth(12)
        else if (i === 7) ws.column(i + 1).setWidth(25)
        else if (i === 9) ws.column(i + 1).setWidth(12)
        else if (i === 10) ws.column(i + 1).setWidth(12)
        else if (i === 15) ws.column(i + 1).setWidth(12)
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
            if (![1, 7, 9, 10].includes(columnIndex)) {
                if (parseInt(record[columnName]) >= 0) ws.cell(rowIndex, columnIndex).style({ font: { color: "#2a753e" } })
                else ws.cell(rowIndex, columnIndex).style({ font: { color: "#ff2626" } })
            }
            if (columnName === "date" || columnName === "date1" || columnName === "null" || columnName === "null1") ws.cell(rowIndex,columnIndex++).string(record[columnName])
            else ws.cell(rowIndex,columnIndex++).number(parseInt(record[columnName]))
        })
        rowIndex++
    }) 

    wb.write('./uploads/woodyma.xlsx', (err, stat) => {
        res.download('./uploads/woodyma.xlsx', (err) => {
            fsExtra.emptyDirSync("./uploads")
        })
    })

}