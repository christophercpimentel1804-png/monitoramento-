// Dados simulados para exemplo:
const treinoDeHoje = [
  { nome: 'Supino Reto', series: 4, reps: 10 },
  { nome: 'Agachamento', series: 3, reps: 12 }
];
let isAdmin = false;

// Renderiza login
function renderLogin() {
  document.getElementById('mainContainer').innerHTML = `
    <div class="card">
      <h2>Login</h2>
      <input type="text" id="user" placeholder="Nome de usuário"/>
      <input type="password" id="pass" placeholder="Senha"/>
      <button onclick="login()">Entrar</button>
    </div>
  `;
  document.getElementById('logoutBtn').classList.add('hide');
}

function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  // Apenas exemplo: admin/admin é admin, senão é aluno.
  if (user === 'admin' && pass === 'admin') {
    isAdmin = true;
    renderAdmin();
  } else if (user.length > 0 && pass.length > 0) {
    isAdmin = false;
    renderDashboard();
  } else {
    alert('Preencha os dados!');
  }
  document.getElementById('logoutBtn').classList.remove('hide');
}

function renderDashboard() {
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
    <div class="card">
      <h3>Chat com o Coach</h3>
      <div id="chatMsg"></div>
      <input id="msgInput" placeholder="Digite sua mensagem"/>
      <button onclick="enviarMsg()">Enviar</button>
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
      <p>Aqui você pode criar treinos e ver relatórios dos alunos.</p>
      <button onclick="alert('Funcionalidade em construção')">Criar Treino para Aluno</button>
      <button onclick="alert('Funcionalidade em construção')">Ver Relatórios</button>
    </div>
  `;
}

function enviarMsg() {
  const msg = document.getElementById('msgInput').value;
  if (!msg) return;
  const chat = document.getElementById('chatMsg');
  chat.innerHTML += `<div><b>Você:</b> ${msg}</div>`;
  document.getElementById('msgInput').value = '';
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById('logoutBtn').onclick = function() {
  renderLogin();
};

window.onload = renderLogin;
