const baseUrl = "http://localhost:8080/api/instrumentos"; 

document.addEventListener("DOMContentLoaded", fetchInstrumentos);


function fetchInstrumentos() {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error("Error al obtener instrumentos:", error));
}


function renderTable(instrumentos) {
  const tableBody = document.getElementById("instrumento-list");
  tableBody.innerHTML = "";
  instrumentos.forEach(instrumento => {
    const row = `
      <tr>
        <td>${instrumento.id}</td>
        <td>${instrumento.nombre}</td>
        <td>${instrumento.categoria}</td>
        <td>${instrumento.cantidad}</td>
        <td>${instrumento.estado}</td>
        <td>${instrumento.descripcion}</td>
        <td>
          <button onclick="editInstrumento(${instrumento.id})">Editar</button>
          <button onclick="deleteInstrumento(${instrumento.id})">Eliminar</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}


function saveInstrumento() {
  const id = document.getElementById("instrumento-id").value;
  const nombre = document.getElementById("nombre").value;
  const categoria = document.getElementById("categoria").value;
  const cantidad = document.getElementById("cantidad").value;
  const estado = document.getElementById("estado").value;
  const descripcion = document.getElementById("descripcion").value;

  const instrumento = { nombre, categoria, cantidad, estado, descripcion };

  const method = id ? "PUT" : "POST";
  const url = id ? `${baseUrl}/${id}` : baseUrl;

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(instrumento)
  })
    .then(() => {
      resetForm();
      fetchInstrumentos();
    })
    .catch(error => console.error("Error al guardar instrumento:", error));
}


function editInstrumento(id) {
  fetch(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("instrumento-id").value = data.id;
      document.getElementById("nombre").value = data.nombre;
      document.getElementById("categoria").value = data.categoria;
      document.getElementById("cantidad").value = data.cantidad;
      document.getElementById("estado").value = data.estado;
      document.getElementById("descripcion").value = data.descripcion;
    })
    .catch(error => console.error("Error al obtener instrumento:", error));
}


function deleteInstrumento(id) {
  fetch(`${baseUrl}/${id}`, { method: "DELETE" })
    .then(() => fetchInstrumentos())
    .catch(error => console.error("Error al eliminar instrumento:", error));
}


function resetForm() {
  document.getElementById("instrumento-id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("descripcion").value = "";
}
