import { test } from 'node:test';
import assert from 'node:assert/strict';
import { barras, colunas, linha, rosca, PALETA } from '../src/index.js';

const dados = [{ rotulo: 'A', valor: 10 }, { rotulo: 'B', valor: 20 }, { rotulo: 'C', valor: 5 }];

test('barras: SVG válido com uma barra por item', () => {
  const s = barras(dados);
  assert.ok(s.startsWith('<svg'));
  assert.ok(s.trim().endsWith('</svg>'));
  assert.equal((s.match(/<rect/g) || []).length, 3);
  assert.ok(s.includes('viewBox'));
});

test('colunas: uma coluna por item e usa a paleta', () => {
  const s = colunas(dados);
  assert.equal((s.match(/<rect/g) || []).length, 3);
  assert.ok(s.includes(PALETA[0]));
});

test('linha: aceita number[] e gera um path com M e L', () => {
  const s = linha([1, 3, 2, 5]);
  assert.ok(/d="M[\d.,]+ L/.test(s));
  assert.equal((s.match(/<circle/g) || []).length, 4);
});

test('rosca: uma fatia por item, com título acessível', () => {
  const s = rosca(dados);
  assert.equal((s.match(/<path/g) || []).length, 3);
  assert.ok(s.includes('<title>A: 10</title>'));
});

test('escapa texto do rótulo (sem injeção)', () => {
  const s = barras([{ rotulo: '<b>x</b>', valor: 1 }]);
  assert.ok(!s.includes('<b>x</b>'));
  assert.ok(s.includes('&lt;b&gt;x&lt;/b&gt;'));
});

test('lida com lista vazia sem quebrar', () => {
  assert.ok(barras([]).startsWith('<svg'));
  assert.ok(rosca([]).startsWith('<svg'));
});
