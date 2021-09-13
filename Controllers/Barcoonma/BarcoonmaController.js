const excelToJson = require('convert-excel-to-json')
const moment = require('moment')
const fsExtra = require('fs-extra')
const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('BARCOONMA')
const JSONdb = require('simple-json-db')
const db = new JSONdb('./Controllers/Barcoonma/db.json')
const db1 = new JSONdb('./Controllers/Barcoonma/db1.json')
const db2 = new JSONdb('./Controllers/Barcoonma/db2.json')
const db3 = new JSONdb('./Controllers/Barcoonma/db3.json')

exports.getIndex = (req,res) => {
    res.render("barcoonma")
}

exports.getCalculatedData = (req,res) => {

    const datePeriod = `${moment(req.body.startDate).format("MM/DD")} - ${moment(req.body.endDate).format("MM/DD")}`

    // Getting Data from DB
    const dbData = db.JSON().data !== '' ? JSON.parse(db.JSON().data) : null

    // Getting Data from DB for Barcoon50
    const dbData1 = db1.JSON().data !== '' ? JSON.parse(db1.JSON().data) : null
    
    const result1 = excelToJson({
        sourceFile: `./uploads/${req.files.file1[0].originalname}`
    })

    const totalEarned1 = result1[Object.keys(result1)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const lastWeekMakeUp1 = dbData1 !== null && dbData1[dbData1.length - 1]["makeUp"] < 0 ? Math.abs(dbData1[dbData1.length - 1]["makeUp"]) : 0
    let totalAmountOfWeek1 = result1[Object.keys(result1)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    totalAmountOfWeek1 = dbData1 !== null && dbData1[dbData1.length - 1]["makeUp"] < 0 ? (totalAmountOfWeek1 + dbData1[dbData1.length - 1]["makeUp"]) : totalAmountOfWeek1
    const scooterTotal1 = totalAmountOfWeek1 > 0 ? ((totalAmountOfWeek1 * 0.60) + lastWeekMakeUp1).toFixed(2) : totalEarned1
    const barcoon50Total = totalAmountOfWeek1 > 0 ? (totalAmountOfWeek1 * 0.40).toFixed(2) : 0
    const makeUp1 = totalAmountOfWeek1 > 0 ? 0 : totalAmountOfWeek1
    const scooterNet1 = scooterTotal1

    const data1 = {
        "date": datePeriod.toString(),
        "total": totalEarned1,
        "scooterTotal": scooterTotal1,
        "barcoon50Total": barcoon50Total,
        "makeUp": makeUp1,
        "headFees": 0,
        "scooterNet": scooterNet1
    }

    // Persisting data on DB
    if (dbData1) db1.set('data', JSON.stringify([...dbData1, data1]))
    else db1.set('data', JSON.stringify([data1]))

    // Getting Data from DB For Nictex
    const dbData2 = db2.JSON().data !== '' ? JSON.parse(db2.JSON().data) : null
        
    const result2 = excelToJson({
        sourceFile: `./uploads/${req.files.file2[0].originalname}`
    })

    const totalEarned2 = result2[Object.keys(result2)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const lastWeekMakeUp2 = dbData2 !== null && dbData2[dbData2.length - 1]["makeUp"] < 0 ? Math.abs(dbData2[dbData2.length - 1]["makeUp"]) : 0
    let totalAmountOfWeek2 = result2[Object.keys(result2)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    totalAmountOfWeek2 = dbData2 !== null && dbData2[dbData2.length - 1]["makeUp"] < 0 ? (totalAmountOfWeek2 + dbData2[dbData2.length - 1]["makeUp"]) : totalAmountOfWeek2
    const scooterTotal2 = totalAmountOfWeek2 > 0 ? ((totalAmountOfWeek2 * 0.70) + lastWeekMakeUp2).toFixed(2) : totalEarned2
    const nictexTotal = totalAmountOfWeek2 > 0 ? (totalAmountOfWeek2 * 0.30).toFixed(2) : 0
    const makeUp2 = totalAmountOfWeek2 > 0 ? 0 : totalAmountOfWeek2
    const scooterNet2 = scooterTotal2

    const data2 = {
        "date": datePeriod.toString(),
        "total": totalEarned2,
        "scooterTotal": scooterTotal2,
        "nictexTotal": nictexTotal,
        "makeUp": makeUp2,
        "headFees": 0,
        "scooterNet": scooterNet2
    }

    // Persisting data on DB
    if (dbData2) db2.set('data', JSON.stringify([...dbData2, data2]))
    else db2.set('data', JSON.stringify([data2]))


    // Getting Data from DB For Ticonico
    const dbData3 = db3.JSON().data !== '' ? JSON.parse(db3.JSON().data) : null
        
    const result3 = excelToJson({
        sourceFile: `./uploads/${req.files.file3[0].originalname}`
    })

    const totalEarned3 = result3[Object.keys(result3)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const lastWeekMakeUp3 = dbData3 !== null && dbData3[dbData3.length - 1]["makeUp"] < 0 ? Math.abs(dbData3[dbData3.length - 1]["makeUp"]) : 0
    let totalAmountOfWeek3 = result3[Object.keys(result3)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    totalAmountOfWeek3 = dbData3 !== null && dbData3[dbData3.length - 1]["makeUp"] < 0 ? (totalAmountOfWeek3 + dbData3[dbData3.length - 1]["makeUp"]) : totalAmountOfWeek3
    const scooterTotal3 = totalAmountOfWeek3 > 0 ? ((totalAmountOfWeek3 * 0.65) + lastWeekMakeUp3).toFixed(2) : totalEarned3
    const ticonicoTotal = totalAmountOfWeek3 > 0 ? (totalAmountOfWeek3 * 0.35).toFixed(2) : 0
    const makeUp3 = totalAmountOfWeek3 > 0 ? 0 : totalAmountOfWeek3
    const scooterNet3 = scooterTotal3

    const data3 = {
        "date": datePeriod.toString(),
        "total": totalEarned3,
        "scooterTotal": scooterTotal3,
        "ticonicoTotal": ticonicoTotal,
        "makeUp": makeUp3,
        "headFees": 0,
        "scooterNet": scooterNet3
    }

    // Persisting data on DB
    if (dbData3) db3.set('data', JSON.stringify([...dbData3, data3]))
    else db3.set('data', JSON.stringify([data3]))


    const headingColumnNames = [
        "Date",
        "Total",
        "Scooter Total",
        "Barcoon50 Total",
        "Barcoon50 Makeup",
        "Head Fees",
        "Scooter Net",
        "",
        "Combined Scooter Net",
        "",
        "Date",
        "Total",
        "Scooter Total",
        "Nictex Total",
        "Nictex Makeup",
        "Head Fees",
        "Scooter Net",
        "",
        "Date",
        "Total",
        "Scooter Total",
        "Ticonico Total",
        "Ticonico Makeup",
        "Head Fees",
        "Scooter Net",
    ]

    const data = {
        "date": datePeriod.toString(),
        "total": totalEarned1,
        "scooterTotal": scooterTotal1,
        "barcoon50Total": barcoon50Total,
        "makeUp": makeUp1,
        "headFees": 0,
        "scooterNet": scooterNet1,
        "null": "",
        "combinedScooterNet": (parseInt(scooterNet1) + parseInt(scooterNet2) + parseInt(scooterNet3)).toFixed(2),
        "null1": "",
        "date1": datePeriod.toString(),
        "total1": totalEarned2,
        "scooterTotal1": scooterTotal2,
        "nictexTotal": nictexTotal,
        "makeUp1": makeUp2,
        "headFees1": 0,
        "scooterNet1": scooterNet2,
        "null2": "",
        "date2": datePeriod.toString(),
        "total2": totalEarned3,
        "scooterTotal2": scooterTotal3,
        "ticonicoTotal": ticonicoTotal,
        "makeUp2": makeUp3,
        "headFees2": 0,
        "scooterNet2": scooterNet3
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
        else if (i === 5) ws.column(i + 1).setWidth(12)
        else if (i === 8) ws.column(i + 1).setWidth(25)
        else if (i === 10) ws.column(i + 1).setWidth(12)
        else if (i === 11) ws.column(i + 1).setWidth(12)
        else if (i === 15) ws.column(i + 1).setWidth(12)
        else if (i === 18) ws.column(i + 1).setWidth(12)
        else if (i === 19) ws.column(i + 1).setWidth(12)
        else if (i === 23) ws.column(i + 1).setWidth(12)
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
            if (![1, 8, 10, 11, 18, 19].includes(columnIndex)) {
                if (parseInt(record[columnName]) >= 0) ws.cell(rowIndex, columnIndex).style({ font: { color: "#2a753e" } })
                else ws.cell(rowIndex, columnIndex).style({ font: { color: "#ff2626" } })
            }
            if (columnName === "date" || columnName === "date1" || columnName === "date2" || columnName === "null" || columnName === "null1" || columnName === "null2") ws.cell(rowIndex,columnIndex++).string(record[columnName])
            else ws.cell(rowIndex,columnIndex++).number(parseInt(record[columnName]))
        })
        rowIndex++
    }) 

    wb.write('./uploads/barcoonma.xlsx', (err, stat) => {
        res.download('./uploads/barcoonma.xlsx', (err) => {
            fsExtra.emptyDirSync("./uploads")
        })
    })

}