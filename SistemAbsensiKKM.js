/* eslint-disable */
// WAJIB DIISI: Paste link Google Spreadsheet (Excel) absensi Anda di dalam tanda kutip di bawah ini!
// Contoh: var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1qP5OP7Yh3XwIcQiXaym4MNS4n1_VxPRV0zx2yVVppR0/edit";
var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1qP5OP7Yh3XwIcQiXaym4MNS4n1_VxPRV0zx2yVVppR0/edit";

function perbaruiRekapitulasi() {
  var ss = null;
  
  if (SPREADSHEET_URL !== "") {
    try {
      ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    } catch (e) {
      throw new Error("Link Spreadsheet yang Anda masukkan salah atau tidak dapat diakses.");
    }
  } else {
    // Jika dikosongkan, mencoba mencari dari file yang sedang terbuka
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {}
    
    if (!ss) {
      try {
        var form = FormApp.getActiveForm();
        if (form && form.getDestinationId()) {
          ss = SpreadsheetApp.openById(form.getDestinationId());
        }
      } catch (e) {}
    }
  }

  if (!ss) {
    throw new Error("Script tidak tahu Excel mana yang harus diperbarui! Tolong isi 'SPREADSHEET_URL' di Baris ke-3 dengan link Excel Anda.");
  }
  var sheets = ss.getSheets();
  var sheetResponseName = "Form Responses 1"; 
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getFormUrl() != null) {
      sheetResponseName = sheets[i].getName();
      break;
    }
  }
  
  // 2. Mengamankan sheet Rekapitulasi Lama (Ubah nama jadi backup, jangan dihapus)
  var oldRekap = ss.getSheetByName("Rekapitulasi Kehadiran");
  if (oldRekap) {
    oldRekap.setName("Rekap Lama (Backup " + Math.floor(Math.random() * 1000) + ")");
  }
  
  // 3. Buat tab Rekapitulasi Baru
  var rekapSheet = ss.insertSheet("Rekapitulasi Kehadiran");
  
  var headers = ["Nama Lengkap", "NIM", "Prodi", "Total Hadir"];
  var dates = [];
  var currentDate = new Date(2026, 7, 13); // Mulai 13 Agustus
  var endDate = new Date(2026, 8, 17);     // Sampai 17 September (36 Hari)
  
  while(currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  for (var i = 0; i < dates.length; i++) {
    headers.push(dates[i]);
  }
  
  rekapSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#d9ead3");
  rekapSheet.getRange(1, 5, 1, dates.length).setNumberFormat("dd/MMM");
  rekapSheet.setFrozenRows(1);
  rekapSheet.setFrozenColumns(4);
  
  // 4. Rumus menarik data Mahasiswa (Anti Duplikat Nama)
  // Menarik NIM unik ke Kolom B
  rekapSheet.getRange("B2").setFormula("=IFERROR(UNIQUE(FILTER('" + sheetResponseName + "'!C2:C, '" + sheetResponseName + "'!C2:C<>\"\")), \"\")");
  // Mengambil Nama Lengkap (Kolom A) dari NIM tersebut (mengambil data pendaftaran pertama)
  rekapSheet.getRange("A2").setFormula("=ARRAYFORMULA(IF(B2:B=\"\",\"\", VLOOKUP(B2:B, {'" + sheetResponseName + "'!C:C, '" + sheetResponseName + "'!B:B}, 2, FALSE)))");
  // Mengambil Prodi (Kolom C) dari NIM tersebut
  rekapSheet.getRange("C2").setFormula("=ARRAYFORMULA(IF(B2:B=\"\",\"\", VLOOKUP(B2:B, {'" + sheetResponseName + "'!C:C, '" + sheetResponseName + "'!D:D}, 2, FALSE)))");
  
  // 5. Rumus Rekap Absen Harian (Hadir / Tidak)
  var totalHadirFormulas = [];
  var attendanceFormulas = [];
  var lastCol = rekapSheet.getRange(1, headers.length).getA1Notation().replace(/[0-9]/g, '');
  
  for (var r = 2; r <= 60; r++) { 
    totalHadirFormulas.push(["=IF(B" + r + "=\"\",\"\", COUNTIF(E" + r + ":" + lastCol + r + ", \"Hadir\"))"]); 
    
    var rowFormulas = [];
    for (var c = 5; c <= 4 + dates.length; c++) {
      var colA1 = rekapSheet.getRange(1, c).getA1Notation().replace(/[0-9]/g, '');
      // Menggunakan NIM (Kolom C di Form Responses, dan Kolom B di Rekapitulasi) agar lebih akurat
      var formula = "=IF($B" + r + "=\"\",\"\", IF(COUNTIFS('" + sheetResponseName + "'!$C:$C, $B" + r + ", '" + sheetResponseName + "'!$A:$A, \">=\"&" + colA1 + "$1, '" + sheetResponseName + "'!$A:$A, \"<\"&(" + colA1 + "$1+1))>0, \"Hadir\", \"-\"))";
      rowFormulas.push(formula);
    }
    attendanceFormulas.push(rowFormulas);
  }
  
  rekapSheet.getRange(2, 4, 59, 1).setFormulas(totalHadirFormulas);
  rekapSheet.getRange(2, 5, 59, dates.length).setFormulas(attendanceFormulas);
  
  // Log sukses
  console.log("BERHASIL! Tab Rekapitulasi Kehadiran baru telah dibuat di Spreadsheet Anda (13 Ags - 17 Sep). Data respons form tidak dihapus dan tetap aman.");
}
