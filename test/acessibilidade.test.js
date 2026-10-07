import { test } from 'node:test';
import assert from 'node:assert/strict';
import { barras, colunas, linha, rosca } from '../src/index.js';
test('todos os gráficos têm título e descrição específicos com escape', () => {
  for (const fn of [barras, colunas, linha, rosca]) {
    const svg = fn(fn === linha ? [1, 2] : [{ rotulo: 'demo', valor: 1 }], { titulo: 'Receita "demo" <img>', descricao: 'Total <script> & tendência' });
    assert.ok(svg.includes('aria-label="Receita &quot;demo&quot; &lt;img&gt;"'));
    assert.ok(svg.includes('<desc>Total &lt;script&gt; &amp; tendência</desc>'));
    assert.equal(svg.includes('<script>'), false);
  }
});
