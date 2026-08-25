const Papa = require('papaparse');

const PIKET_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1ZIM8Eq3lQUfnK7kAUK90A-QwQvhCyA4lPbzxlT5j2Uo/export?format=csv";

async function test() {
  const res = await fetch(PIKET_SHEET_CSV_URL);
  const csvText = await res.text();
  
  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim().toUpperCase()
  });

  console.log("Headers found:", Object.keys(data[0] || {}));
  
  const scheduleList = data.map((row) => {
    const kebersihanStr = row["TIM KEBERSIHAN"] || "";
    const kebersihan = kebersihanStr.split(",").map((s) => s.trim()).filter(Boolean);

    const masakSiang = row["TIM KONSUMSI SIANG"] || "-";
    const masakSore = row["TIM KONSUMSI MALAM"] || "-";
    
    const masak = [];
    if (masakSiang !== "-") masak.push(`Siang: ${masakSiang}`);
    if (masakSore !== "-") masak.push(`Sore: ${masakSore}`);

    return {
      day: row["HARI"] || "",
      date: row["TANGGAL"] || "",
      kebersihan: kebersihan,
      masak: masak,
      menuSiang: row["MENU SIANG HARI"] || "-",
      menuSore: row["MENU MALAM HARI"] || "-",
    };
  });
  
  console.log("Parsed first row:", scheduleList[0]);
}

test();
