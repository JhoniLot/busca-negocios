# 🛒 Busca Descontos - Comparador de Preços Inteligente

Bem-vindo ao código-fonte do **Busca Descontos**, um site comparador de preços rápido, moderno e 100% otimizado para o mercado brasileiro.

---

## 📋 Como Funciona a Camada de Dados e Integração com a Lomadee

Toda a lógica de busca e produtos está centralizada em **um único arquivo**:
`lib/produtos.ts`

- **Hoje (Modo de Demonstração)**: O site lê mais de 40 produtos cadastrados com preços em diversas lojas (Amazon, Mercado Livre, Magalu, Casas Bahia, Kabum, Fast Shop).
- **Amanhã (Integração com a Lomadee)**: Para usar dados em tempo real da Lomadee, basta preencher a sua chave de API no arquivo `.env.local` conforme o exemplo abaixo. A rota de servidor em `app/api/busca/route.ts` esconde o token e garante que ele **nunca fique exposto ao navegador do usuário**.

### Configuração do Arquivo de Ambiente (.env)
1. Crie um arquivo chamado `.env.local` na raiz da pasta do projeto.
2. Escreva a seguinte linha colocando a sua chave obtida no painel da Lomadee:
```env
LOMADEE_TOKEN=sua_chave_aqui_123456
```

---

## 💻 Passo a Passo Simples: Como Abrir o Site no Seu Computador

Se você não é programador, siga estas 3 etapas simples para ver o site rodando na sua máquina:

### 1. Instalar o Node.js (Se ainda não tiver)
- Baixe e instale a versão recomendada do **Node.js** no site oficial: [https://nodejs.org/](https://nodejs.org/) (clique na opção "LTS").

### 2. Abrir o Terminal ou Prompt de Comando
- Abra a pasta do projeto `busca descontos`.
- Clique na barra de endereço da pasta no topo do Windows, digite `cmd` e aperte **Enter**.

### 3. Iniciar o Site
No Prompt que se abriu, digite exatamente o comando abaixo e aperte **Enter**:
```bash
npm run dev
```

Pronto! Aparecerá uma mensagem dizendo que o site está rodando. Abra o seu navegador (Google Chrome, Edge ou Safari) e digite o endereço:
👉 **`http://localhost:3000`**

---

## 🚀 Passo a Passo Simples: Como Publicar o Site na Vercel (Gratuito)

A Vercel é a plataforma oficial do Next.js e permite colocar seu site no ar na internet em menos de 3 minutos de forma gratuita.

### Passo 1: Criar uma Conta na Vercel
1. Acesse [https://vercel.com/](https://vercel.com/) e clique em **Sign Up** (Cadastrar).
2. Você pode se cadastrar gratuitamente usando sua conta do GitHub ou e-mail.

### Passo 2: Enviar seu projeto para o GitHub
1. Crie uma conta no [GitHub.com](https://github.com) se ainda não tiver.
2. Crie um novo repositório com o nome `busca-descontos`.
3. Envie os arquivos da pasta para o repositório.

### Passo 3: Importar na Vercel
1. No painel da Vercel, clique no botão azul **"Add New..."** -> **"Project"**.
2. Selecione o repositório `busca-descontos` do seu GitHub.
3. Na seção **Environment Variables** (Variáveis de Ambiente), adicione:
   - **Key**: `LOMADEE_TOKEN`
   - **Value**: o seu token da Lomadee
4. Clique no botão **"Deploy"**.

Aguarde cerca de 1 minuto e a Vercel vai gerar um link público (ex: `https://busca-descontos.vercel.app`) para qualquer pessoa no mundo acessar o seu site pelo celular ou computador!

---

## 🎨 Identidade de Cores da Marca
- **Azul-Marinho Profundo (`#0B1F3A`)**: Autoridade, segurança e leitura.
- **Verde Economia (`#12B76A`)**: Destaque de menor preço e botões "Ver na loja".
- **Laranja Desconto (`#FF7A1A`)**: Selos de % de desconto e ofertas especiais.
