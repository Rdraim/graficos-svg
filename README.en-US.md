# graficos-svg

[Brazilian Portuguese](README.md) · [Voluntary support](SUPPORT.md)

Dependency-free SVG string charts for browsers and server rendering: bars, columns, lines and donuts.

## Start here

Requires Git and Node.js 22+ for tests. No runtime dependencies. Download the actual repository rather than an unverified same-name npm package.

```sh
git clone https://github.com/techrodrigo21-ux/graficos-svg.git
cd graficos-svg
npm test
node tools/check-public-content.mjs
```

These imports work from the cloned repository root. To use the module in another project, install a pinned Git tag (v1.2.0) or copy the module while retaining the MIT license. This documentation does not claim an npm registry release.

```js
import { barras, colunas, linha, rosca } from './src/index.js';
const data = [{ rotulo: 'Example A', valor: 10 }, { rotulo: 'Example B', valor: 20 }];
console.log(barras(data));
// In a browser: container.innerHTML = rosca(data);
```

## API

`barras(dados, { largura, alturaBarra, gap, margemRotulo, cores })`; `colunas(dados, { largura, altura, cores })`; `linha(valores, { largura, altura, cor })`; `rosca(dados, { tamanho, espessura, cores })`; `PALETA`.

Public function and option names remain in Portuguese for compatibility.

## Behavior and limits

Labels are escaped; colors and dimensions are validated. Up to 10000 items, finite values within MAX_SAFE_INTEGER, and positive dimensions up to 1000000. Bars/donuts clamp negative values to zero; lines retain negatives. A 100% donut renders a full ring. The SVG has an image role; provide a contextual title and a text/table alternative in your application. A palette alone does not certify accessibility. Insert only generated SVG, without concatenating untrusted HTML.

## Maintenance

These standalone modules are inspired by work on Nexus, Rodrigo Rodrigues's independent project. They contain no private database, deployment configuration, logs, credentials or user records. Coordinated maintenance means reviewing related changes in the same release cycle, not automatically copying private source files.

## Security and compatibility

SVG option injection defenses, numeric limits and full-ring rendering.

[Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Voluntary support](SUPPORT.md)

MIT © Rodrigo Rodrigues


## Practical use — 1.2.0

All functions accept escaped `titulo` and `descricao` for accessible names and descriptions. Also provide a data table or text summary; color alone does not communicate the result.

Runnable example with synthetic data: `node examples/uso.mjs`.
