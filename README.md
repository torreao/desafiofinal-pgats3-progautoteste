# Trabalho de Conclusão - Integração Contínua para Automação de Testes
### Curso: PGATS3 - Programação para Automação de Testes

Repositório dedicado à resolução do desafio final da disciplina de Integração Contínua. O objetivo do projeto é estruturar uma esteira automatizada de testes para validar o código de forma contínua a cada alteração.

---

## Conceitos de CI Aplicados

* **Feedback Rápido:** Execução automatizada da suite de testes a cada alteração de código, permitindo identificar quebras na aplicação antes do deploy.
* **Ambiente Isolado (Idempotência):** Garantia de que os testes rodam em um ambiente limpo e controlado na nuvem (VM Ubuntu), eliminando variações de sistemas locais.
* **Persistência de Resultados:** Armazenamento dos resultados gerados em cada execução através de artefatos anexados diretamente ao histórico da pipeline.

---

## Estrutura da Pipeline (`ci.yaml`)

A esteira foi configurada utilizando GitHub Actions e executa os seguintes passos a cada acionamento:

1. **Setup do ambiente:** Inicializa um runner Linux (`ubuntu-latest`) e faz o checkout do código do repositório.
2. **Configuração do runtime:** Instala o Node.js (versão 22.x) e configura o cache do gerenciador de pacotes (`npm`) para otimizar o tempo de build.
3. **Instalação limpa:** Executa `npm ci` para garantir que as dependências sejam instaladas seguindo estritamente o `package-lock.json`.
4. **Execução:** Roda o script de testes automatizados (`npm run test`).
5. **Coleta de métricas:** Localiza a pasta de relatórios gerada pelo framework e faz o upload dos arquivos.

---

## Formas de Disparo Configuradas

Para atender aos requisitos do projeto, a pipeline responde a três gatilhos distintos mapeados no bloco `on`:

* **Gatilho de Push (`push`):** Dispara automaticamente sempre que um desenvolvedor envia alterações para as branches `main` ou `master`.
* **Gatilho Agendado (`schedule`):** Configurado via cron (`0 4,11 * * *`) para rodar de forma periódica todos os dias às 01h00 e às 08h00 (ajustado para o fuso horário de Brasília / UTC-3).
* **Gatilho Manual (`workflow_dispatch`):** Habilita a interface visual no GitHub (aba Actions) para que qualquer usuário possa disparar a suite de testes sob demanda através do botão "Run workflow".

---

## Framework de Testes e Relatórios

O projeto utiliza o **Mocha** como runner de testes. A generation dos relatórios foi integrada utilizando a biblioteca **Mochawesome**, responsável por gerar os resultados após a execução.

Os logs são salvos na pasta `mochawesome-report/` em dois formatos:
* **HTML:** Interface gráfica e interativa para análise visual do status dos testes.
* **JSON:** Dados estruturados para possíveis integrações com outras ferramentas ou dashboards.

O passo de upload do relatório na pipeline foi configurado com a diretiva `if: always()`, garantindo que os arquivos HTML e JSON fiquem disponíveis para download mesmo se algum cenário de teste falhar durante a execução.