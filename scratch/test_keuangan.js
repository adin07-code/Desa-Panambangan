const Papa = require('papaparse');
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/12NBhmmkQ5HdBYiLS5EyzGOOlY8CJtf6wm9-KobjmSYs/export?format=csv&gid=1527735025";

async function run() {
    const res = await fetch(SHEET_CSV_URL);
    const csvText = await res.text();
    const rows = Papa.parse(csvText, { skipEmptyLines: true }).data;
    let headerRowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
        const rowString = rows[i].join(' ').toUpperCase();
        if (rowString.includes('TANGGAL') && rowString.includes('HARI')) {
            headerRowIndex = i;
            break;
        }
    }
    console.log("Header index:", headerRowIndex);
    if (headerRowIndex >= 0) {
        console.log("Header row:", rows[headerRowIndex]);
    } else {
        console.log("Header not found! First 5 rows:", rows.slice(0, 5));
    }
}
run();
