# graficos-svg

Gráficos como **SVG (string)**, sem dependência e **sem DOM**. Cada função recebe
dados simples e devolve `<svg>…</svg>` pronto para injetar no HTML, mandar por
e-mail, renderizar no servidor (SSR) ou usar em qualquer framework.

Barras, colunas, linha e rosca. Paleta categórica acessível embutida.

## Instalação

```bash
npm install graficos-svg
```

## Uso

```js
import { barras, colunas, linha, rosca } from 'graficos-svg';

const dados = [{ rotulo: 'Jan', valor: 120 }, { rotulo: 'Fev', valor: 180 }];

elemento.innerHTML = barras(dados);       // barras horizontais
elemento.innerHTML = colunas(dados);      // colunas verticais
elemento.innerHTML = linha([1, 3, 2, 5]); // série de números
elemento.innerHTML = rosca(dados);        // donut
```

No Node (SSR / e-mail):

```js
res.type('image/svg+xml').send(rosca(dados, { tamanho: 180 }));
```

React, sem risco de XSS no rótulo (o texto é escapado):

```jsx
<div dangerouslySetInnerHTML={{ __html: colunas(dados) }} />
```

## API

| função | dados | opções |
|---|---|---|
| `barras(dados, o)` | `[{ rotulo, valor }]` | `largura, alturaBarra, gap, margemRotulo, cores` |
| `colunas(dados, o)` | `[{ rotulo, valor }]` | `largura, altura, cores` |
| `linha(valores, o)` | `number[]` ou `[{ x, y }]` | `largura, altura, cor` |
| `rosca(dados, o)` | `[{ rotulo, valor }]` | `tamanho, espessura, cores` |

`PALETA` é exportada; passe `cores` para trocar.

> SVG dá vetor nítido em qualquer tela e é estilizável por CSS. O texto dos
> rótulos é escapado — seguro para dados vindos do usuário.

## Testes

```bash
npm test
```

## Licença

MIT © Rodrigo Rodrigues
