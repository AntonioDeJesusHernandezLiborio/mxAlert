createAccount
const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_Account.php';
const URL_userType = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_typeUser.php';

const typeResponse = {
    success: "success"
};

const result = {
    content: "plan"
};

const typeMessage = {
    emptyFiel: {
        Alert: "alert alert-danger",
        Menssage: "Campos vacios"
    },
    successAdd: {
        Alert: "alert alert-success",
        Menssage: "Cuenta guardado correctamente"
    },
    successEdit: {
        Alert: "alert alert-success",
        Menssage: "Plan editado correctamente"
    },
    successDelete: {
        Alert: "alert alert-success",
        Menssage: "Plan eliminado correctamente"
    },
    Error: {
        Alert: "alert alert-danger",
        Menssage: "Ocurrio un error."
    },
    password: {
        Alert: "alert alert-warning",
        Menssage: "Contraseñas no coinciden."
    }
}

const account = new Vue({
    el: '#createAccount',
    data: {
        mensajesA: null,
        tipoalertaA: null,
        rols: [],
        rolSeleccionado: {}
    },
    mounted: function () {
        this.showDataSelect()
    },
    methods: {
        showDataSelect: function () {
            axios.get(URL_userType)
                .then(function (response) {
                    account.rols = response.data.typeUser;
                })
        },
        insert: function () {
            const datos = {
                nombre: document.getElementById("name-insert").value,
                ap: document.getElementById("ap-insert").value,
                am: document.getElementById("am-insert").value,
                direccion: document.getElementById("direccion-insert").value,
                telefono: document.getElementById("phone-insert").value,
                usuario: document.getElementById("user-insert").value,
                contraseña: document.getElementById("password-insert").value,
                contraseña_rep: document.getElementById("password-insert-repie").value,
                rol: document.getElementById("denuncia-insert").value
            }
            if (account.validateBoxes(datos)) {
                account.sendAlert(typeMessage.emptyFiel);
                return false;
            } else if (account.validatePassword(datos)) {
                account.sendAlert(typeMessage.password);
                return false;
            } else {
                axios.post(URL, datos)
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            account.clearTextBox()
                            account.sendAlert(typeMessage.successAdd);
                        } else {
                            account.sendAlert(typeMessage.Error);
                        }
                    })
            }
        },
        validateBoxes(datos) {
            return datos.nombre == 0 || datos.ap == 0 || datos.am == 0 || datos.direccion == 0 || datos.telefono == 0 || datos.usuario == 0 || datos.contraseña == 0 || datos.contraseña_rep == 0 || datos.rol == 0;
        },
        validatePassword(datos) {
            return datos.contraseña != datos.contraseña_rep;
        },
        sendAlert(menssage) {
            account.tipoalertaA = menssage.Alert;
            account.mensajesA = menssage.Menssage;
        },
        clearTextBox() {
            document.getElementById("name-insert").value = ''
            document.getElementById("ap-insert").value= ''
            document.getElementById("am-insert").value= ''
            document.getElementById("direccion-insert").value= ''
            document.getElementById("phone-insert").value= ''
            document.getElementById("user-insert").value= ''
            document.getElementById("password-insert").value= ''
            document.getElementById("password-insert-repie").value= ''
            document.getElementById("denuncia-insert").value= ''
        }
    }
});