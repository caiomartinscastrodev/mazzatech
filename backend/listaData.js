document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

function fetchData() {
    fetch('http://localhost:3000/api/list')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
}

function displayData(data) {
    const tableBody = document.querySelector('#data-table tbody');

    // Limpar o conteúdo atual da tabela
    tableBody.innerHTML = '';

    // Preencher a tabela com os dados recebidos
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.cpf}</td>
            <td><img src="../backend/uploads/${item.photo}" alt="Foto"></td>
        `;
        tableBody.appendChild(row);
    });
}
