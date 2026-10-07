<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# graficos-svg

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

[Como contribuir](CONTRIBUTING.md) · [Segurança](SECURITY.md)


## Uso prático — 1.2.0

Todas as funções aceitam `titulo` e `descricao` escapados para nome e descrição acessíveis. Inclua também tabela ou resumo textual dos dados; somente cor não comunica o resultado.

Exemplo executável com dados sintéticos: `node examples/uso.mjs`.

---

<p align="center">
  <img src="assets/support/banner-pt-br.svg" width="960" alt="Código aberto. Um café faz diferença. Apoie o trabalho de Rodrigo Rodrigues.">
</p>

## ☕ Me pague um café

Este projeto te ajudou a resolver um problema, aprender algo novo ou dar os primeiros passos no desenvolvimento? Se você sentir vontade de apoiar meu trabalho, um café é uma forma carinhosa de agradecer.

Sou **Rodrigo Rodrigues**, criador do **Nexus** e destes projetos de código aberto. Seu apoio me ajuda a dedicar tempo para melhorar o código, escrever exemplos mais claros e continuar compartilhando o que aprendo.

**Contribua com o valor que fizer sentido para você. O apoio é totalmente voluntário — o projeto continua gratuito sob a licença MIT.**

<p>
  <a href="#apoie-com-pix"><img src="assets/support/pix-pt-br.svg" width="190" height="44" alt="Apoiar com Pix"></a>
  <a href="https://github.com/techrodrigo21-ux/graficos-svg/issues/new?title=Coment%C3%A1rio%3A%20este%20projeto%20me%20ajudou"><img src="assets/support/comment-pt-br.svg" width="210" height="44" alt="Deixar um comentário"></a>
</p>

### Apoie com Pix

No aplicativo do seu banco, escaneie o QR Code ou copie a chave Pix abaixo. Escolha o valor e confira os dados do destinatário antes de confirmar.

<p align="center">
  <img src="assets/support/pix-qr.png" width="260" alt="QR Code Pix original fornecido por Rodrigo Rodrigues; a chave em texto abaixo é uma alternativa.">
</p>

**Chave Pix**

```text
8875a24e-44d1-4c91-b6bb-62c9f0070955
```

Você também pode apoiar compartilhando o projeto, relatando um problema, melhorando a documentação ou deixando um comentário.

### Seu comentário também faz diferença

[Conte como o projeto te ajudou](https://github.com/techrodrigo21-ux/graficos-svg/issues/new?title=Coment%C3%A1rio%3A%20este%20projeto%20me%20ajudou). Vou gostar de saber o que você criou, o que aprendeu e o que poderia ficar mais claro para quem está começando.

O comentário é bem-vindo com ou sem doação. Preserve sua privacidade: não publique comprovantes, dados pessoais, credenciais ou informações de usuários nas Issues.

---

**Obrigado por apoiar meu trabalho e me ajudar a continuar criando e compartilhando. ❤️**
