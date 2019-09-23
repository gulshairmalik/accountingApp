const puppeteer = require('puppeteer');
const tableToCsv = require('node-table-to-csv');
const fs = require('fs');

exports.getPDF = (req,res) => {

    let address = req.query.address;
  
    let getPDF = printPDF(address);
  
    getPDF.then((response) => {
  
      if(response==='error'){
        res.send('Address is invalid.')
      }
      else{
        //res.set({ 'Content-Type': 'application/pdf', 'Content-Length': response.length });
        res.send(response);
      }
    });
  
}

exports.getCSV = (req,res) => {

    res.download('./Page.csv');
  
}

const printPDF = async (addr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto('https://www.pbcgov.org/papa/Asps/GeneralAdvSrch/MasterSearch.aspx',{waitUntil: 'networkidle0'});
  
    let address = addr;
    await page.waitFor(2000);
    await page.focus('#txtSearch');
    await page.keyboard.type(address);

    await page.$eval('#form2 > div.mainsearch > div.searchbararea > div > button', el => el.click());
    await page.waitFor(2000);
    
    let errorElement = '';
    try {
        errorElement = await page.$eval('#MainContent_lblMsg',el => el.innerHTML);
    } catch (error) {
    }
  
    await page.waitFor(1000);
  
    if(errorElement!==''){
      return new Promise((resolve) => {
        resolve('error');
      });
    }
  
    await page.waitFor(4000);
    const pdf = await page.pdf({format:'A4'});
    const html = await page.$eval('body',el => el.innerHTML);
    
    await page.waitFor(1000);
    const csv = tableToCsv(html);
  
    fs.writeFile("Page.csv", csv, (err) => {
      if(err) {
          return console.log(err);
      }
    }); 
  
  
    await browser.close();
    return pdf;
  
  };
  