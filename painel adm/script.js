const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const addUser = document.getElementById("addUser");
const userTable = document.getElementById("userTable");
const totalUsers = document.getElementById("totalUsers");
const darkToggle = document.getElementById("darkModeToggle");
const search = document.getElementById("search");

let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers() {
  userTable.innerHTML = "";
  users.forEach((user, index) => {
    userTable.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><button class="deleteBtn" onclick="deleteUser(${index})">Excluir</button></td>
      </tr>
    `;
  });
  totalUsers.textContent = users.length;
}

function deleteUser(index) {
  users.splice(index, 1);
  saveUsers();
  renderUsers();
}

openModal.onclick = () => modal.style.display = "flex";
closeModal.onclick = () => modal.style.display = "none";

addUser.onclick = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) return alert("Preencha os campos!");

  users.push({ name, email });
  saveUsers();
  renderUsers();

  modal.style.display = "none";
};

search.onkeyup = () => {
  const value = search.value.toLowerCase();
  document.querySelectorAll("#userTable tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
  });
};

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

// GRÁFICO DE VENDAS
new Chart(document.getElementById("salesChart"), {
  type: "line",
  data: {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun"],
    datasets: [{
      label: "Vendas",
      data: [1200, 1900, 3000, 2500, 3200, 4000],
      borderColor: "#6366f1",
      fill: false
    }]
  }
});

// GRÁFICO DE USUÁRIOS
new Chart(document.getElementById("usersChart"), {
  type: "doughnut",
  data: {
    labels: ["Ativos","Inativos"],
    datasets: [{
      data: [70, 30],
      backgroundColor: ["#6366f1","#e5e7eb"]
    }]
  }
});

renderUsers();