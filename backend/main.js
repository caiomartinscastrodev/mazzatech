function saveData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    
    // Obtenha o arquivo (foto) do input
    const fileInput = document.getElementById('photo');
    const photo = fileInput.files[0];

    // Função para validar e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para validar CPF
    function isValidCPF(cpf) {
        // Lógica básica para verificar se o CPF possui 11 dígitos
        return /^\d{11}$/.test(cpf);
    }

    // Validar e-mail e CPF
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (!isValidCPF(cpf)) {
        alert('Por favor, insira um CPF válido.');
        return;
    }

    // Se a validação passar, prosseguir com a requisição de salvamento
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('cpf', cpf);
    formData.append('photo', photo);

    fetch('http://localhost:3000/api/save', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => {
        console.error('Erro ao salvar registro:', error);
    });

}

//________________
function editData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;

    // Obtenha o arquivo (foto) do input
    const fileInput = document.getElementById('photo');
    const newPhoto = fileInput.files[0];

    // Função para validar e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para validar CPF
    function isValidCPF(cpf) {
        // Lógica básica para verificar se o CPF possui 11 dígitos
        return /^\d{11}$/.test(cpf);
    }

    // Validar e-mail
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Validar CPF
    if (!isValidCPF(cpf)) {
        alert('Por favor, insira um CPF válido.');
        return;
    }

    // Se a validação passar, prosseguir com a requisição de edição
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('cpf', cpf);

    // Adicione a nova foto apenas se um novo arquivo for selecionado
    if (newPhoto) {
        formData.append('photo', newPhoto);
    }

    fetch(`http://localhost:3000/api/edit/${id}`, {
        method: 'PUT',
        body: formData,
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => {
        console.error('Erro ao editar registro:', error);
    });
}


//_______________________

function deleteData() {
    const id = document.getElementById('id').value;

    fetch(`http://localhost:3000/api/delete/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => {
        console.error('Erro ao excluir registro:', error);
    });
}
