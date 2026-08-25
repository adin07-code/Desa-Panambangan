const webhookUrl = 'https://script.google.com/macros/s/AKfycbxBPIIDHLGoYUvxONI1m0re8dpgMggBNXiABW2bnecTq2j-IVviCG91ZRBsla-dUtD1Kg/exec';

const scheduleKebersihan = {
  'Senin': 'Ais, Faqih, Puspa',
  'Selasa': 'Putri, Maisya, Ulin',
  'Rabu': 'Nabila, Rikeu, Iki',
  'Kamis': 'Faisal, Anisa, Alin',
  'Jumat': 'Robi, Dea, Dini',
  'Sabtu': 'Fauzy, Adin, Indah',
  'Minggu': 'Libur / Bersama'
};

async function run() {
  const res = await fetch('http://localhost:3000/api/piket');
  const data = await res.json();
  const piketData = data.data;

  let count = 0;
  for (const item of piketData) {
    const dayName = item.day.trim(); // E.g. 'Senin'
    if (!dayName) continue;
    
    // Check if it's already filled to avoid unnecessary updates
    // if (item.kebersihan && item.kebersihan.length > 0 && item.kebersihan[0] !== '') {
    //   console.log(`Skipping ${item.date}, already filled.`);
    //   continue;
    // }

    const kebersihanStr = scheduleKebersihan[dayName] || 'Libur / Bersama';
    
    console.log(`Updating ${item.date} (${dayName}) -> ${kebersihanStr}...`);
    
    try {
      const postRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tanggal: item.date,
          kebersihan: kebersihanStr
        })
      });
      const result = await postRes.json();
      console.log(`Result for ${item.date}:`, result.status);
      count++;
    } catch (e) {
      console.error(`Error for ${item.date}:`, e);
    }
    
    // Sleep a bit to avoid hitting rate limits
    await new Promise(r => setTimeout(r, 600));
  }
  
  console.log(`Finished updating ${count} rows!`);
}

run();
