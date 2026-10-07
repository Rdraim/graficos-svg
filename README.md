# graficos-svg

[English (United States)](README.en-US.md) · [Apoio voluntário](SUPPORT.md)

## Segurança e compatibilidade

Validação anti-injeção em opções SVG, limites numéricos e rosca completa.

Rótulos escapados; cores e dimensões validadas. Até 10000 itens, valores finitos dentro de MAX_SAFE_INTEGER e dimensões positivas até 1000000. Barras/roscas tratam negativos como zero; linhas preservam negativos. Rosca de 100% usa círculo completo. SVG inclui papel de imagem; forneça também título contextual e tabela textual no aplicativo. A paleta sozinha não certifica acessibilidade. Use apenas o SVG gerado, sem concatenar HTML não confiável.

Baixe pelo GitHub; não é necessário instalar um pacote homônimo do npm. Para consumir em outro projeto, use uma revisão Git fixada (tag v1.2.0) ou copie o módulo e preserve a licença. Os exemplos abaixo usam importação local após o clone. Node.js 22 ou superior para os testes.

Gráficos como **SVG (string)**, sem dependência e **sem DOM**. Cada função recebe
dados simples e devolve `<svg>…</svg>` pronto para injetar no HTML, mandar por
e-mail, renderizar no servidor (SSR) ou usar em qualquer framework.

Barras, colunas, linha e rosca. Paleta categórica configurável.

## Instalação

```bash
git clone https://github.com/techrodrigo21-ux/graficos-svg.git
cd graficos-svg
npm test
```

## Uso

```js
import { barras, colunas, linha, rosca } from './src/index.js';

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

## Manutenção e apoio

Código independente inspirado em problemas resolvidos no Nexus, projeto de Rodrigo Rodrigues. Não inclui banco, configuração privada, logs, dados de usuários ou credenciais. Evolução coordenada significa revisar mudanças relacionadas no mesmo ciclo; não há cópia automática de arquivos privados.

[Como contribuir](CONTRIBUTING.md) · [Segurança](SECURITY.md) · [Apoio voluntário](SUPPORT.md)


## Uso prático — 1.2.0

Todas as funções aceitam `titulo` e `descricao` escapados para nome e descrição acessíveis. Inclua também tabela ou resumo textual dos dados; somente cor não comunica o resultado.

Exemplo executável com dados sintéticos: `node examples/uso.mjs`.


## ☕ Apoie este trabalho

Se este projeto te ajudou, considere me pagar um café. Qualquer valor é bem-vindo, e seu comentário também ajuda.

[![Apoiar com Pix](assets/support/pix-pt-br.svg)](SUPPORT.md)
