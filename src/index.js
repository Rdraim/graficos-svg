/* ============================================================================
   graficos-svg — gráficos como SVG (string), sem dependência e sem DOM.

   Cada função recebe dados simples e devolve uma string <svg> pronta para
   injetar no HTML, mandar por e-mail, renderizar no servidor ou usar em
   qualquer framework. Nada de canvas, nada de runtime de gráfico.

   Paleta categórica acessível (contraste pensado); troque por `opcoes.cores`.
   ============================================================================ */

export const PALETA = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0891b2', '#db2777', '#65a30d'];

const esc = (s) => String(s ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
const n = (v) => Math.round(v * 100) / 100;
const cor = (i, cores = PALETA) => cores[i % cores.length];

/** Barras horizontais. dados: [{ rotulo, valor }]. */
export function barras(dados = [], opcoes = {}) {
  const { largura = 480, alturaBarra = 24, gap = 10, margemRotulo = 120, cores } = opcoes;
  const max = Math.max(1, ...dados.map((d) => d.valor));
  const larguraBarra = largura - margemRotulo - 48;
  const altura = dados.length * (alturaBarra + gap) + gap;
  const linhas = dados.map((d, i) => {
    const y = gap + i * (alturaBarra + gap);
    const w = n((Math.max(0, d.valor) / max) * larguraBarra);
    return `<text x="${margemRotulo - 8}" y="${y + alturaBarra / 2}" text-anchor="end" dominant-baseline="central" font-size="13">${esc(d.rotulo)}</text>`
      + `<rect x="${margemRotulo}" y="${y}" width="${w}" height="${alturaBarra}" rx="3" fill="${cor(i, cores)}"/>`
      + `<text x="${margemRotulo + w + 6}" y="${y + alturaBarra / 2}" dominant-baseline="central" font-size="12" fill="#374151">${esc(d.valor)}</text>`;
  }).join('');
  return svg(largura, altura, linhas);
}

/** Colunas verticais. dados: [{ rotulo, valor }]. */
export function colunas(dados = [], opcoes = {}) {
  const { largura = 480, altura = 260, cores } = opcoes;
  const base = altura - 28, topo = 12;
  const max = Math.max(1, ...dados.map((d) => d.valor));
  const passo = largura / Math.max(1, dados.length);
  const larguraCol = passo * 0.6;
  const corpo = dados.map((d, i) => {
    const h = n((Math.max(0, d.valor) / max) * (base - topo));
    const x = n(i * passo + (passo - larguraCol) / 2);
    const y = n(base - h);
    return `<rect x="${x}" y="${y}" width="${n(larguraCol)}" height="${h}" rx="3" fill="${cor(i, cores)}"/>`
      + `<text x="${n(x + larguraCol / 2)}" y="${altura - 8}" text-anchor="middle" font-size="12">${esc(d.rotulo)}</text>`
      + `<text x="${n(x + larguraCol / 2)}" y="${y - 4}" text-anchor="middle" font-size="11" fill="#374151">${esc(d.valor)}</text>`;
  }).join('');
  return svg(largura, altura, corpo);
}

/** Linha. valores: number[] (igualmente espaçados) ou [{ x, y }]. */
export function linha(valores = [], opcoes = {}) {
  const { largura = 480, altura = 220, cor: corLinha = PALETA[0] } = opcoes;
  const pts = valores.map((v, i) => (typeof v === 'number' ? { x: i, y: v } : v));
  const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(0, ...ys), maxY = Math.max(1, ...ys);
  const px = (x) => n(28 + ((x - minX) / (maxX - minX || 1)) * (largura - 40));
  const py = (y) => n(altura - 24 - ((y - minY) / (maxY - minY || 1)) * (altura - 40));
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${px(p.x)},${py(p.y)}`).join(' ');
  const bolas = pts.map((p) => `<circle cx="${px(p.x)}" cy="${py(p.y)}" r="2.5" fill="${corLinha}"/>`).join('');
  return svg(largura, altura, `<path d="${d}" fill="none" stroke="${corLinha}" stroke-width="2"/>${bolas}`);
}

/** Rosca (donut). dados: [{ rotulo, valor }]. */
export function rosca(dados = [], opcoes = {}) {
  const { tamanho = 220, espessura = 36, cores } = opcoes;
  const total = dados.reduce((s, d) => s + Math.max(0, d.valor), 0) || 1;
  const r = tamanho / 2, rInt = r - espessura, cx = r, cy = r;
  let ang = -Math.PI / 2;
  const fatias = dados.map((d, i) => {
    const frac = Math.max(0, d.valor) / total;
    const fim = ang + frac * Math.PI * 2;
    const grande = fim - ang > Math.PI ? 1 : 0;
    const p = (raio, a) => `${n(cx + raio * Math.cos(a))},${n(cy + raio * Math.sin(a))}`;
    const dPath = `M${p(r, ang)} A${r},${r} 0 ${grande} 1 ${p(r, fim)} L${p(rInt, fim)} A${rInt},${rInt} 0 ${grande} 0 ${p(rInt, ang)} Z`;
    ang = fim;
    return `<path d="${dPath}" fill="${cor(i, cores)}"><title>${esc(d.rotulo)}: ${esc(d.valor)}</title></path>`;
  }).join('');
  return svg(tamanho, tamanho, fatias);
}

function svg(largura, altura, conteudo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(largura)} ${n(altura)}" font-family="system-ui, sans-serif">${conteudo}</svg>`;
}
