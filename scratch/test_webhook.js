const webhookUrl = 'https://script.google.com/macros/s/AKfycbxBPIIDHLGoYUvxONI1m0re8dpgMggBNXiABW2bnecTq2j-IVviCG91ZRBsla-dUtD1Kg/exec';

async function test() {
  const payload = {
    tanggal: '10 September 2026', // Valid date in sheet
    kebersihan: 'TEST FROM API SCRIPT'
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response text:", text.substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}

test();
