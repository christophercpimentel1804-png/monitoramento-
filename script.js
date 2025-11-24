let usuarios = []; // [{user: 'nome', pass: 'senha'}]
let isAdmin = false;
const treinoDeHoje = [
  { nome: 'Supino Reto Barra', series: 4, reps: 8 },
  { nome: 'Agachamento Livre', series: 4, reps: 12 },
  { nome: 'Remada Curvada', series: 3, reps: 10 }
];

function renderInicio() {
  document.getElementById('mainContainer').innerHTML = `
    <div class="card">
      <h2>RepMax</h2>
      <div class="slogan">Sua Força no Limite</div>
      <div class="entrar-cadastrar-buttons">
        <button onclick="renderCadastro()">Cadastrar</button>
        <button onclick="renderLogin(true)">Entrar</button>
      </div>
    </div>
  `;
  document.getElementById('logoutBtn').classList.add('hide');
}

function renderCadastro() {
  document.getElementById('mainContainer').innerHTML = `
    <div class="card">
      <h2>Cadastrar</h2>
      <label for="newuser">Usuário</label>
      <input type="text" id="newuser" placeholder="Nome de usuário"/>
      <label for="newpass">Senha</label>
      <input type="password" id="newpass" placeholder="Senha"/>
      <button onclick="cadastrar()">Cadastrar</button>
      <button onclick="renderInicio()" style="background:#242c2d; color:#fff;font-size:1em;">Voltar</button>
    </div>
  `;
}

function cadastrar() {
  const user = document.getElementById('newuser').value;
  const pass = document.getElementById('newpass').value;
  if (user.length < 3 || pass.length < 3) return alert('Preencha o nome e senha (mínimo 3 caracteres)');
  if (usuarios.some(u => u.user === user)) return alert('Usuário já existe!');
  usuarios.push({user, pass});
  alert('Cadastro realizado! Agora faça o login.');
  renderInicio();
}

function renderLogin(showBackBtn) {
  document.getElementById('mainContainer').innerHTML = `
    <div class="card">
      <h2>Login</h2>
      <label for="user">Usuário</label>
      <input type="text" id="user" placeholder="Nome de usuário"/>
      <label for="pass">Senha</label>
      <input type="password" id="pass" placeholder="Senha"/>
      <button onclick="login()">Entrar</button>
      ${showBackBtn ? '<button onclick="renderInicio()" style="background:#242c2d; color:#fff;font-size:1em;">Voltar</button>' : ''}
    </div>
  `;
  document.getElementById('logoutBtn').classList.add('hide');
}

function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  if (user === 'admin' && pass === 'admin') {
    isAdmin = true;
    renderAdmin();
    document.getElementById('logoutBtn').classList.remove('hide');
    return;
  }
  const found = usuarios.find(u => u.user === user && u.pass === pass);
  if (found) {
    isAdmin = false;
    renderDashboard(user);
    document.getElementById('logoutBtn').classList.remove('hide');
  } else {
    alert('Usuário ou senha inválidos!');
  }
}

function renderDashboard(username) {
  document.getElementById('mainContainer').innerHTML = `
    <div class="card">
      <h2>Meu Treino de Hoje</h2>
      <div>${treinoDeHoje.map((ex, i) => `
        <div class="workout-card" id="ex${i}">
          <h3>${ex.nome}</h3>
          <p>Séries: ${ex.series}</p>
          <p>Repetições: ${ex.reps}</p>
          <button onclick="concluir(${i})">Concluir</button>
        </div>
      `).join('')}</div>
    </div>
    <div class="card chat-box">
      <h3>Chat com o Coach</h3>
      <div id="chatMsg"></div>
      <input id="msgInput" placeholder="Digite sua mensagem"/>
      <button onclick="enviarMsg('${username || 'Aluno'}')">Enviar</button>
    </div>
  `;
}

function concluir(i) {
  document.getElementById(`ex${i}`).classList.add('done');
  document.getElementById(`ex${i}`).querySelector('button').innerText = 'Concluído';
  document.getElementById(`ex${i}`).querySelector('button').disabled = true;
}

function renderAdmin() {
  document.getElementById('mainContainer').innerHTML = `
    <div class="card">
      <h2>Painel do Admin</h2>
      <ul>
        <li><button onclick="alert('Funcionalidade em construção')">Adicionar Treino para Aluno</button></li>
        <li><button onclick="alert('Funcionalidade em construção')">Ver Relatórios</button></li>
        <li><button onclick="alert('Funcionalidade em construção')">Gerenciar Exercícios</button></li>
      </ul>
    </div>
  `;
}

function enviarMsg(user) {
  const msg = document.getElementById('msgInput').value;
  if (!msg) return;
  const chat = document.getElementById('chatMsg');
  chat.innerHTML += `<div><b>${user}:</b> ${msg}</div>`;
  document.getElementById('msgInput').value = '';
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById('logoutBtn').onclick = function() {
  renderInicio();
};
window.onload = renderInicio;
