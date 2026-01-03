async function inject(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(url);
  el.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await inject("site-header", "/partials/header.html");
  await inject("site-footer", "/partials/footer.html");
});
