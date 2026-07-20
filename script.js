/*
 * C'est la "fonction simple" du portfolio : analyze_text().
 * Elle tourne entièrement côté client, sans backend — copie ce fichier
 * et le HTML/CSS associés sur n'importe quel hébergeur statique
 * (GitHub Pages, Netlify, Vercel, un simple dossier public/) et ça fonctionne.
 */

const POSITIVE_WORDS = [
  "bien","bon","bonne","super","génial","excellent","prometteur","content",
  "heureux","réussi","efficace","rapide","fiable","adore","aime","top","parfait"
];

const NEGATIVE_WORDS = [
  "mal","mauvais","problème","inquiète","inquiet","lent","échec","déçu",
  "difficile","bug","erreur","cassé","déteste","pire","risque","dommage"
];

function analyzeText(rawText) {
  const text = rawText.trim();

  if (!text) {
    return null;
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;

  // approximation grossière type "tokenizer" (≈ 4 caractères / token)
  const estimatedTokens = Math.max(1, Math.round(charCount / 4));

  // lecture ~ 200 mots/minute
  const readingTimeSec = Math.max(1, Math.round((wordCount / 200) * 60));

  // sentiment très simple par comptage de mots-clés
  const lower = text.toLowerCase();
  let score = 0;
  POSITIVE_WORDS.forEach(w => { if (lower.includes(w)) score += 1; });
  NEGATIVE_WORDS.forEach(w => { if (lower.includes(w)) score -= 1; });

  let sentiment = "neutre";
  if (score > 0) sentiment = "positif";
  if (score < 0) sentiment = "négatif";

  return { wordCount, charCount, estimatedTokens, readingTimeSec, sentiment };
}

function renderResult(result) {
  const output = document.getElementById("console-output");

  if (!result) {
    output.innerHTML = `<div class="out-row"><span class="out-key">erreur</span><span class="out-val negative">écris d'abord une phrase</span></div>`;
    output.classList.add("visible");
    return;
  }

  const sentimentClass = result.sentiment === "positif"
    ? "positive"
    : result.sentiment === "négatif"
      ? "negative"
      : "neutral";

  output.innerHTML = `
    <div class="out-row"><span class="out-key">mots</span><span class="out-val">${result.wordCount}</span></div>
    <div class="out-row"><span class="out-key">caractères</span><span class="out-val">${result.charCount}</span></div>
    <div class="out-row"><span class="out-key">tokens (est.)</span><span class="out-val">${result.estimatedTokens}</span></div>
    <div class="out-row"><span class="out-key">temps de lecture</span><span class="out-val">${result.readingTimeSec}s</span></div>
    <div class="out-row"><span class="out-key">sentiment</span><span class="out-val ${sentimentClass}">${result.sentiment}</span></div>
  `;
  output.classList.add("visible");
}

document.getElementById("console-run").addEventListener("click", () => {
  const input = document.getElementById("console-input").value;
  const result = analyzeText(input);
  renderResult(result);
});

document.getElementById("console-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    document.getElementById("console-run").click();
  }
});
