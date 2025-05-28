# **⚖️ Vagas Abertas \- D'Avila Reis Advogados**

Este projeto é uma landing page interativa desenvolvida para a divulgação e candidatura a vagas de estágio e assistente administrativo no escritório D'Avila Reis Advogados. Ele permite que os candidatos conheçam mais sobre o escritório e se candidatem diretamente através de formulários online, com envio de informações e currículo por e-mail.

## **✨ Funcionalidades**

* **Quadro de Vagas Principal (index.html):** Uma página inicial que lista as vagas abertas, servindo como um ponto de entrada central para os candidatos.  
* **Páginas de Vaga Dedicadas:** Cada vaga (Estágio em Direito, Assistente Administrativo) possui sua própria página detalhada, com informações específicas sobre a posição.  
* **Design Responsivo:** O layout é otimizado para visualização em diversos dispositivos (desktops, tablets, celulares), garantindo uma experiência consistente.  
* **Formulário de Candidatura Online:** Um formulário integrado em cada página de vaga para que os candidatos possam se candidatar diretamente.  
* **Coleta de Dados Abrangente:** Os formulários coletam nome, e-mail, informações acadêmicas (para estágio, opcional para assistente) e uma resposta dissertativa obrigatória.  
* **Anexo de Currículo:** Opção para o candidato anexar seu currículo em formatos PDF, imagem (JPG, PNG) ou DOC/DOCX (máximo 5MB).  
* **Envio de E-mail Automatizado:** Ao finalizar a candidatura, um e-mail com todas as informações e o currículo anexado é enviado para o endereço de e-mail do recrutador.  
* **Mensagens de Feedback:** Feedback amigável e encorajador após a conclusão da candidatura, incentivando o candidato a conhecer mais sobre o escritório.  
* **Identificação da Vaga:** O sistema identifica automaticamente a qual vaga o candidato está se aplicando, facilitando a triagem.  
* **Identidade Visual Consistente:** O logo do escritório e um background visual marcante foram adicionados para reforçar a identidade da marca.

## **🚀 Tecnologias Utilizadas**

* **HTML5:** Estrutura das páginas web.  
* **CSS3:** Estilização, layout e responsividade do design.  
* **JavaScript:** Lógica do formulário, validação de campos, manipulação de arquivos e comunicação com a API.  
* **Vercel Serverless Functions (Node.js):** Backend para o envio de e-mails, configurado na pasta api/submit.js.  
* **Nodemailer:** Biblioteca Node.js utilizada na Serverless Function para facilitar o envio de e-mails via SMTP.

## **⚙️ Estrutura do Projeto**

.  
├── api/  
│   └── submit.js             \# Função Serverless para envio de e-mails  
├── public/                   \# (Opcional, se você tiver assets públicos além da raiz)  
│   └── ...  
├── Background.webp           \# Imagem de fundo para as páginas  
├── logo.webp                 \# Logo do escritório  
├── index.html                \# Página principal com o quadro de vagas  
├── vaga-estagio-direito.html \# Página de detalhes e formulário para a vaga de Estágio  
├── vaga-assistente-administrativo.html \# Página de detalhes e formulário para a vaga de Assistente Administrativo  
└── package.json              \# Gerenciador de dependências do Node.js

## **☁️ Deploy no Vercel**

Este projeto foi construído para ser facilmente implantado no Vercel.

1. **Repositório GitHub:** Certifique-se de que seu código (incluindo todas as páginas HTML, a pasta api/ com submit.js, as imagens Background.webp e logo.webp, e o package.json) está em um repositório GitHub.  
2. **Importe para o Vercel:**  
   * Acesse o painel do Vercel e clique em "Add New..." \-\> "Project".  
   * Importe seu repositório GitHub.  
   * O Vercel detectará automaticamente que é um projeto Node.js/HTML.  
3. Configure as Variáveis de Ambiente (Vercel):  
   Este passo é CRUCIAL para o envio de e-mails funcionar.  
   No painel do Vercel, vá para "Settings" \-\> "Environment Variables" do seu projeto e adicione as seguintes variáveis (para o ambiente de Produção, Preview e Desenvolvimento):  
   * SMTP\_HOST: O host do seu servidor SMTP (ex: smtp.gmail.com).  
   * SMTP\_PORT: A porta do seu servidor SMTP (ex: 587).  
   * SMTP\_SECURE: false (definido como string "false" para TLS na porta 587).  
   * SMTP\_USER: O endereço de e-mail que o escritório utilizará para enviar as candidaturas (ex: seu-email-de-envio@gmail.com).  
   * SMTP\_PASS: A senha ou **Senha de App** do e-mail configurado em SMTP\_USER.

**Importante:** Para contas Gmail com Verificação em Duas Etapas, você **deve** gerar uma [Senha de App](https://support.google.com/accounts/answer/185833?hl=en) e usá-la como SMTP\_PASS.

4. **Redeploy (Se necessário):** Após configurar ou atualizar as variáveis de ambiente, o Vercel pode precisar de um novo deploy para que as variáveis sejam ativadas. Você pode fazer um pequeno commit (ex: um espaço, um comentário) e push para o GitHub para forçar um novo deploy.

## **🌐 Link da Aplicação (Live Demo)**

\[Insira o link da sua aplicação Vercel aqui\]

## **🏢 Site do Escritório**

Conheça mais sobre o D'Avila Reis Advogados:  
www.davilareisadvogados.com.br  
Desenvolvido com 💙 para D'Avila Reis Advogados.