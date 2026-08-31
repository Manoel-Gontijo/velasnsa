VELAS NOSSA SENHORA APARECIDA — V6.2 CONVERSÃO
==================================================

Projeto estático, responsivo, Bootstrap e sem banco de dados.

PÁGINAS
- index.html                 Página inicial
- produto-velas.html        Configuração das velas
- produto-parafina.html     Configuração da parafina
- admin.html                 Painel administrativo local

PAINEL ADMINISTRATIVO
Abra admin.html no mesmo navegador usado para visualizar o site.

Fluxo de trabalho:
1. Abra admin.html.
2. Altere os dados desejados.
3. Clique em "Salvar alterações".
4. Clique em "Atualizar / visualizar site" para conferir.
5. Quando estiver tudo certo, clique em "Baixar config.js".
6. Substitua o arquivo assets/js/config.js da hospedagem pelo arquivo gerado.
7. Atualize a página publicada.

IMPORTANTE
O projeto NÃO usa banco de dados nem backend.
O botão "Salvar" grava uma prévia no LocalStorage do navegador e não altera sozinho os arquivos da hospedagem.
Para publicar para todos os visitantes, é necessário substituir assets/js/config.js pelo arquivo exportado pelo painel.

O QUE PODE SER ALTERADO NO ADMIN
- Nome da empresa
- WhatsApp e telefone de exibição
- Cidade, estado e região atendida
- Textos dos 3 slides do carrossel
- Sobre nós
- Área de contato
- Espessura e tamanhos das velas
- Apresentações de 6, 8 unidades e 1 kg
- Pesos da parafina
- Aviso promocional ativável/desativável
- Caminhos das imagens
- Títulos e descrições SEO
- Backup e restauração via JSON

IMAGENS REAIS
Quando as fotos reais estiverem prontas, coloque os arquivos em assets/img/ e altere os caminhos na aba "Imagens" do admin.

WHATSAPP ATUAL
(37) 98825-9454
Número técnico usado nos links: 5537988259454


NOVIDADES V5.2
- Ativar/desativar cada slide do carrossel.
- Alterar tempo automático e textos dos botões do carrossel.
- Catálogo configurável na página inicial: cadastrar, remover, reordenar, ativar/desativar e marcar produto como destaque.
- Preço/chamada opcional por card. Campo vazio mantém “Consulte valores”.
- Faixa Destaque/Oferta ativável pelo painel, com preço anterior/atual opcionais e botão.
- Tudo continua sem banco de dados.


V5.3 - PREÇOS E CORES
- Na aba Velas do admin, cada apresentação possui preço por tamanho (12, 14, 16 e 18 cm).
- Deixe o preço vazio para exibir “Consulte o valor”.
- Na mesma aba, cadastre cores e informe uma imagem para cada apresentação.
- A página de compra troca a imagem automaticamente quando o cliente escolhe outra cor.
- Atualmente somente a cor Branca vem ativa, porque é a cor disponível hoje. Quando novas cores forem produzidas, cadastre-as no painel e informe as respectivas fotos.

V5.6 — Galeria de produto: imagem ampliada no quadro e aviso discreto “Imagem meramente ilustrativa”.


V5.7 — Linha Velas Palito + carrinho
- Padronizada a nomenclatura comercial do site: toda a linha de velas passa a ser chamada somente de Velas Palito.
- Carrinho local sem banco de dados, salvo no navegador via localStorage.
- É possível adicionar diferentes tamanhos/apresentações e parafina e finalizar o pedido completo pelo WhatsApp.
- O carrinho não processa pagamento; valores e disponibilidade continuam sendo confirmados pelo atendimento.


V5.8
- Home: carrossel atualizado com as três artes finais (velas, pacotes de 1 kg e parafina).
- Pacote de 6 unidades: fotos por tamanho (12, 14, 16 e 18 cm) com troca automática na página do produto.
- Parafina: nova foto de produto mantida em assets/img/parafina.png.
- Menu Produtos: fundo bege e hover azul-marinho com texto branco.
- Carrinho e botões: contraste de navegação e estados hover corrigidos.


V6.0 — REVISÃO RESPONSIVA E BASE SEO
- Layout revisado para 320/375/430 px, tablets, notebooks e desktop.
- Galeria de produto deixou de depender de alturas fixas e passa a usar proporção responsiva.
- Menu mobile com rolagem segura em telas baixas e alvos de toque maiores.
- Carrossel com dimensões declaradas, preload do primeiro banner e lazy load dos demais.
- Imagem Sobre Nós com proporção estável e texto factual.
- Correção do fallback pack_8.png inexistente.
- Canonical, og:url, og:image e Twitter Card adicionados.
- robots.txt e sitemap.xml adicionados para www.velasnsa.com.br.
- Schema Product básico nas páginas de velas e parafina.
- Suporte a prefers-reduced-motion e foco visível para acessibilidade.

Próxima fase recomendada: V6.1 Performance + SEO local (otimizar PNGs, WebP/AVIF, dados estruturados locais, Search Console e revisão de conteúdo por intenção de busca).


V6.1 — PERFORMANCE + SEO LOCAL
- Imagens principais convertidas para WebP, reduzindo drasticamente o peso carregado nas páginas.
- Compatibilidade com configurações antigas: caminhos .png conhecidos são normalizados automaticamente para .webp.
- Open Graph/Twitter Cards revisados e imagem social dedicada.
- Dados estruturados LocalBusiness, catálogo e breadcrumbs.
- Conteúdo local útil para buscas de fábrica de velas em Divinópolis, revenda e atacado.
- Sitemap atualizado com lastmod.
- Produto de parafina com dimensões de imagem definidas para estabilidade visual.


V6.2 — CONVERSÃO DE VENDAS
- Carrinho não interrompe mais a navegação ao adicionar item: mostra confirmação discreta.
- Checkout pelo WhatsApp com nome, cidade, tipo de compra e observação opcionais.
- Mensagem final organiza produtos, quantidades, subtotais e total estimado quando houver preços.
- Botão “Continuar comprando” no carrinho.
- Atalhos de quantidade 1, 5, 10 e 20 nas páginas de velas e parafina.
- Indicadores de fabricação própria, atendimento direto e pedido sem cadastro.
- Parafina agora aceita preços configuráveis para 500 g e 1 kg pelo painel.
- Eventos internos nsa:conversion preparados para futura integração com Analytics/Meta Pixel.


V6.3 — REDES SOCIAIS E MÉTRICAS
- Configure Instagram, Facebook e TikTok em Admin > Redes / Métricas.
- Os ícones ficam ocultos enquanto o link estiver vazio.
- Google Analytics 4 e Meta Pixel ficam desativados por padrão.
- Ao ativar métricas com um ID válido, o visitante recebe uma escolha de consentimento antes dos scripts de rastreamento serem carregados.
- Eventos preparados: add_to_cart, whatsapp_buy_now, cart_whatsapp_checkout, whatsapp_click, social_click e share_product.
- Search Console: recomendamos validar velasnsa.com.br por DNS no provedor do domínio; não depende do código do site.


V6.4 — CONFIANÇA E VENDA PROFISSIONAL
- Nova seção dedicada a atacado e revenda na Home.
- CTA comercial específico para lojistas, revendedores, igrejas e comunidades.
- Atalho de atacado nas páginas de velas e parafina.
- Bloco de redes sociais na Home aparece somente após cadastrar uma rede no painel.
- Reforço de confiança usando apenas informações objetivas, sem depoimentos fictícios.
- Layout responsivo dos novos blocos para celular, tablet e desktop.


V6.5 — AUDITORIA FINAL
-----------------------
- Revisão de referências locais: nenhum asset HTML ausente.
- Corrigida referência CSS antiga para candle_bg.jpg, que não existia mais.
- JavaScript validado sintaticamente.
- Verificação de IDs duplicados nas páginas públicas/admin: nenhum encontrado.
- Link de acessibilidade “Ir para o conteúdo” nas páginas públicas.
- Foco de teclado mais visível.
- Suporte a prefers-reduced-motion para visitantes que reduzem animações no sistema.
- Dimensões intrínsecas adicionadas às imagens estáticas para reduzir deslocamentos durante carregamento.
- Ajuste extra para telas muito estreitas (<360 px).

ANTES DA PUBLICAÇÃO DEFINITIVA
1. Confirmar que https://www.velasnsa.com.br é realmente o domínio que será usado. Canonical, sitemap e Schema atualmente usam esse endereço.
2. Cadastrar links reais de Instagram/Facebook/TikTok no painel.
3. Inserir GA4 e Meta Pixel somente após criar as contas e obter os IDs reais.
4. Validar o domínio no Google Search Console e enviar sitemap.xml.
5. Cadastrar/otimizar Perfil da Empresa no Google com dados reais.
6. Inserir preços, condições de atacado e depoimentos apenas quando forem informações reais e aprovadas.
