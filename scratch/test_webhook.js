const webhookUrl = 'https://script.google.com/macros/s/AKfycbxY4JYjIbtUHgZEI6_DMOD-WruEYxTMTNmGsfZ8e70dqoT2lOwfrRMUCKVnAvaIcVlKXQ/exec';

async function test() {
  const payload = {
    tanggal: '1 September 2026',
    menuSiang: 'Nasi Goreng',
    menuSore: 'Sate Ayam'
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
