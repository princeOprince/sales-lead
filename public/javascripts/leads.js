
async function deleteLead(leadId) {
  try {
    let res = await fetch(`/lead/${leadId}/delete_json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ leadId })
    });
    if (res.ok) {
      res = await res.json();
      console.log('Result', res);
      document.getElementById(`${leadId}`).remove();
    }
    else {
      throw await res.json();
    }
  } catch (err) {
    console.log(err);
  }
}