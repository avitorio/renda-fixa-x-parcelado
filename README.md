# Calculadora · Comprar parcelado e deixar o dinheiro rendendo no CDB

Calculadora de página única (HTML + CSS + JavaScript, sem dependências) que mostra **quanto você economiza ao comprar parcelado sem juros e deixar o valor cheio aplicado num CDB**, sacando uma parcela por mês.

A ideia: em vez de pagar à vista, você deposita o valor total num CDB que rende e vai retirando o dinheiro de uma parcela por vez. O que o saldo rende enquanto "espera" para ser sacado é o seu ganho.

> **Versão:** 1.0 — junho/2026
> **Arquivo:** `index.html`

---

## Como usar

1. Abra **`index.html`** em qualquer navegador (Chrome, Firefox, Edge, Safari). Basta dar dois cliques — não precisa instalar nada nem estar online.
2. Preencha os campos. Tudo recalcula automaticamente.
3. Leia o resultado: o número grande é a sua **economia líquida** (já com IR, se ligado).

### Campos

| Campo | O que é |
|---|---|
| **Valor da compra** | Quanto custa o que você vai comprar |
| **Parcelas** | Em quantas vezes sem juros (ex.: 10x) |
| **CDI ao ano** | Taxa do CDI vigente, em % ao ano |
| **Quanto do CDI o CDB rende** | Ex.: 100% do CDI, 110%, 95%… |
| **Descontar Imposto de Renda** | Liga/desliga o IR sobre o rendimento |
| **1ª parcela no ato** | Ligado: paga a primeira na hora (sem render). Desligado: primeira parcela 30 dias depois (padrão de cartão) |

---

## A conta por trás

O CDB rende juros compostos. A calculadora converte o CDI anual para uma taxa mensal equivalente:

```
taxa_mensal = (1 + CDI_ao_ano × %doCDI) ^ (1/12) − 1
```

Depois simula mês a mês:

```
saldo recebe o rendimento do mês  →  saldo paga uma parcela
```

**Por que o saldo final é a economia?** Você deposita o valor da compra e, ao longo dos meses, saca exatamente esse mesmo valor (nº de parcelas × valor da parcela). Como entra e sai a mesma quantia, tudo que sobra no CDB no fim é puro rendimento. Esse saldo final é o rendimento bruto; aplicando o IR sobre ele, chega-se à economia líquida.

### Imposto de Renda (tabela regressiva)

| Prazo da aplicação | Alíquota |
|---|---|
| até 180 dias | 22,5% |
| 181 a 360 dias | 20,0% |
| 361 a 720 dias | 17,5% |
| acima de 720 dias | 15,0% |

---

## Exemplo (valores padrão)

Compra de **R$ 10.000** em **10x sem juros**, CDB a **100% do CDI = 14,15% a.a.**, com IR e primeira parcela 30 dias depois:

| Item | Valor |
|---|---|
| Taxa mensal equivalente | ~1,11% |
| Rendimento bruto | R$ 651,89 |
| IR (20%) | − R$ 130,38 |
| **Economia líquida** | **R$ 521,51** |
| Equivale a um desconto de | ~5,22% na compra |

Mais parcelas e/ou CDI mais alto = economia maior.

---

## Importante (limites da estimativa)

- É uma **estimativa, não uma garantia**. O CDI é pós-fixado e muda conforme a Selic; o rendimento real pode variar ao longo dos meses.
- O IR usa a alíquota do **prazo total** da aplicação (simplificação). Na prática, cada saque é tributado pelo seu próprio tempo de aplicação, o que deixa o líquido um pouco menor.
- Não considera **IOF** (zera após 30 dias) nem carência/liquidez do CDB. Confira se o seu título permite resgate a qualquer momento.
- Confira sempre a taxa CDI vigente e as condições do seu CDB antes de decidir.
- Material informativo — **não constitui recomendação de investimento**.

---

## Detalhes técnicos

- Um único arquivo `index.html`. Sem servidor, build ou bibliotecas externas.
- Fontes (Space Grotesk, Inter, JetBrains Mono) carregadas do Google Fonts; offline o navegador usa fontes padrão sem quebrar nada.
- Todo o cálculo roda **localmente no navegador**. Nenhum dado é enviado a lugar nenhum.
