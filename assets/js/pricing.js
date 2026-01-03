function money(n){ return "$" + (Math.round(n*100)/100).toFixed(2); }

function pickPremium(tiers, qty){
  let p = tiers[0]?.premium ?? 0;
  for (const t of tiers) if (qty >= t.minQty) p = t.premium;
  return p;
}

async function loadCatalog(){
  const res = await fetch("/data/products.json");
  return await res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  const catalog = await loadCatalog();
  const spot = catalog.spotFallback;
  const meltOz = catalog.meltOzPerCoin;

  const spotEl = document.getElementById("spotPrice");
  const spotStatus = document.getElementById("spotStatus");
  if (spotEl) spotEl.textContent = money(spot);
  if (spotStatus) spotStatus.textContent = "Live feed: coming soon (v1 stub)";

  const skuBox = document.querySelector("[data-sku]");
  if (!skuBox) return;

  const sku = skuBox.getAttribute("data-sku");
  const product = catalog.products.find(p => p.id === sku);
  const qtyInput = document.getElementById("qty");

  const meltEl = document.getElementById("melt");
  const premEl = document.getElementById("premium");
  const unitEl = document.getElementById("unitPrice");
  const totalEl = document.getElementById("totalPrice");

  function render(){
    const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));
    const premium = pickPremium(product.premiums, qty);
    const melt = spot * meltOz;
    const unit = melt + premium;
    const total = unit * qty;

    meltEl.textContent = money(melt);
    premEl.textContent = money(premium);
    unitEl.textContent = money(unit);
    totalEl.textContent = money(total);
  }

  qtyInput.addEventListener("input", render);
  qtyInput.addEventListener("change", render);
  render();
});