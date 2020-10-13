const URL = 'http://localhost/mxalert/MxAlertBackEnd/controller/controller_typeUser.php';
var id = 0;
var registros = [];
const typeResponse = {
    success: "success"
};

const typeMessage = {
    emptyFiel: {
        Alert: "alert alert-danger",
        Menssage: "Campo vacio"
    },
    successAdd: {
        Alert: "alert alert-success",
        Menssage: "Tipo de usuario agregado correctamente"
    },
    successEdit: {
        Alert: "alert alert-success",
        Menssage: "Tipo de usuario editado correctamente"
    },
    successDelete: {
        Alert: "alert alert-success",
        Menssage: "Tipo de usuario eliminado correctamente"
    },
    Error: {
        Alert: "alert alert-danger",
        Menssage: "Hubo un error al realizar la opción"
    }
}

const typeUser = new Vue({
    el: '#tableTypeUser',
    data: {
        mensajesA: null,
        tipoalertaA: null,
        typerUsers: [],
        elegido: {},
        selected: 'Seleccione tipo usuario',
    },
    mounted: function () {
        this.showData()
    },
    methods: {
        showData: function () {
            axios.get(URL)
                .then(function (response) {
                    typeUser.typerUsers = response.data.typeUser;
                })
        },
        insert: function () {
            const datos = {
                nombre: document.getElementById("name-insert").value
            }
            if (typeUser.validateBoxes(datos)) {
                typeUser.sendAlert(typeMessage.emptyFiel);
                return false;
            } else {
                axios.post(URL, datos)
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            typeUser.showData()
                            typeUser.clearTextBox()
                            typeUser.sendAlert(typeMessage.successAdd);
                        } else {
                            typeUser.sendAlert(typeMessage.Error);
                        }
                    })
            }
        },
        edit: function () {
            const datos = {
                id: id,
                nombre: document.getElementById("name-update").value
            }
            if (typeUser.validateBoxes(datos)) {
                typeUser.sendAlert(typeMessage.emptyFiel);
                return false;
            } else {
                axios.put(URL, datos)
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            typeUser.showData()
                            typeUser.clearTextBox()
                            typeUser.sendAlert(typeMessage.successEdit);
                        } else {
                            typeUser.sendAlert(typeMessage.Error);
                        }
                    })
            }
        },
        deleteType: function () {
            const datos = {
                id: id,
                nombre: document.getElementById("name-delete").value
            }
            if (typeUser.validateBoxes(datos)) {
                typeUser.sendAlert(typeMessage.emptyFiel);
                return false;
            } else {
                axios.delete(`${URL}?id=${id}`)
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            typeUser.showData()
                            typeUser.clearTextBox()
                            typeUser.sendAlert(typeMessage.successDelete);
                        } else {
                            typeUser.sendAlert(typeMessage.Error);
                        }
                    })
            }
        },


        passDataEdit(typeUser) {
            id = typeUser.id;
            document.getElementById("name-update").value = typeUser.nombre;
        },
        passDataDelete(typeUser) {
            id = typeUser.id;
            document.getElementById("name-delete").value = typeUser.nombre;
        },

        sendAlert(menssage) {
            typeUser.tipoalertaA = menssage.Alert;
            typeUser.mensajesA = menssage.Menssage;
        },

        validateBoxes(datos) {
            if (datos.nombre == 0) {
                return true;
            }
            return false;
        },
        clearTextBox() {
            document.getElementById("name-insert").value = ''
        },
        clearTable() {

            table.clear().draw();
        }
    }
});