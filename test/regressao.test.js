import { test } from 'node:test';
import assert from 'node:assert/strict';
import { barras, linha, rosca } from '../src/index.js';
test('opções não permitem injeção SVG e dados inválidos não viram NaN', () => {
  const dados = [{ rotulo: 'fixture', valor: 1 }];
  assert.throws(() => barras(dados, { cores: ['red" onload="alert(1)'] }));
  assert.throws(() => barras(dados, { largura: '1" onload="x' }));
  assert.throws(() => barras(dados, { cores: [] }));
  assert.throws(() => linha([Infinity]));
  assert.throws(() => rosca(dados, { espessura: 200 }));
  assert.ok(!linha([]).includes('NaN'));
});
test('uma fatia de 100% é uma rosca completa, zero não cria arco', () => {
  const s = rosca([{ rotulo: 'all', valor: 1 }]);
  assert.ok(s.includes('<circle') && s.includes('stroke-width="36"'));
  assert.ok(!rosca([{ rotulo: 'zero', valor: 0 }]).includes('<path'));
});
