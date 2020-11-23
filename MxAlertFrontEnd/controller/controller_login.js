const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_credentials.php';

const typeResponse = {
    success: "success",
    non_existent: "Usuario inexistente"
};

const status = {
    locked: 0,
    unlocked: 1
};

const typeUser = {
    Administration: "Administración",
    Premiun: "Premium",
    Free: "Free"
};

const typeMessage = {
    emptyFiel: {
        Alert: "alert alert-danger",
        Menssage: "Campos vacios"
    },
    Error: {
        Alert: "alert alert-danger",
        Menssage: "Ocurrio un error."
    },
    locked: {
        Alert: "alert alert-danger",
        Menssage: "Cuenta bloqueada."
    },
    empy: {
        Alert: "alert alert-warning",
        Menssage: "Datos incorrectos/cuenta no existe."
    }
}

const login = new Vue({
    el: '#login',
    data: {
        mensajesA: null,
        tipoalertaA: null
    },
    methods: {
        login: function () {
            const datos = {
                usuario: document.getElementById("username").value,
                contrasena: document.getElementById("password").value
            }
            if (login.validateBoxes(datos)) {
                login.sendAlert(typeMessage.emptyFiel);
                return false;
            } else {
                axios.post(URL, datos)
                    .then(function (response) {
                        response.data.user[0].status != typeResponse.non_existent ? login.validateCredentials(response.data.user[0]) : login.sendAlert(typeMessage.empy);
                    })
            }
        },

        validateCredentials(user) {
            if (user == null) {
                login.sendAlert(typeMessage.Error)
            } else {
                user.status == status.unlocked ? login.locationUser(user) : login.sendAlert(typeMessage.locked);
            }
        },

        locationUser(user) {
            let user_type = user.tipo_usuario;
            localStorage.setItem("id", user.Id);
            localStorage.setItem("username", user.nombre);
            localStorage.setItem("tipo", user.tipo_usuario);
            switch (user_type) {
                case typeUser.Administration:
                    window.location.href = '../administrador/index.html';
                    break;
                case typeUser.Premiun:
                    window.location.href = '../clientes/index.html';
                    break;
            }
        },

        validateBoxes(datos) {
            return datos.usuario == 0 || datos.contrasena == 0;
        },
        sendAlert(menssage) {
            login.tipoalertaA = menssage.Alert;
            login.mensajesA = menssage.Menssage;
        },
        clearTextBox() {
            document.getElementById("username").value = ''
            document.getElementById("password").value = ''
        }
    }
});