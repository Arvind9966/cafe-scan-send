const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScRwsyxU4yq43adkepgNwqEWXyLrNsyzr8ajOAss7XrP1sdPw/formResponse";

const FIELDS = {
  name: "entry.1442442294",
  table: "entry.720256668",
  items: "entry.189449821",
  total: "entry.220788495",
  timestamp: "entry.19249516",
} as const;

export function submitOrderToSheet(data: {
  name: string;
  table: string;
  items: string;
  total: string;
}) {
  const body = new URLSearchParams();
  body.append(FIELDS.name, data.name);
  body.append(FIELDS.table, data.table);
  body.append(FIELDS.items, data.items);
  body.append(FIELDS.total, data.total);
  body.append(FIELDS.timestamp, new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));

  // Fire and forget — no need to await
  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  }).catch(() => {
    // Silently ignore errors
  });
}
