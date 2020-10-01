const URL = 'http://localhost/mxalert/MxAlertBackEnd/controller/controller_typeUser.php';
var id = 0;

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
            let formdata = new FormData();
            axios.get(URL, formdata)
                .then(function (response) {
                    typeUser.typerUsers = response.data.typeUser;
                })
        },
        insert: function () {
            const datos = {
                nombre: document.getElementById("name-insert").value
            }
            if (typeUser.validateBoxes(datos)) {
                typeUser.sendAlert('alert alert-danger', 'Campo vacio');
                return false;
            } else {
                axios.post(URL, datos)
                    .then(function (response) {
                        if (response.data.msj == "success") {
                            typeUser.showData()
                            typeUser.clearTextBox(),
                                typeUser.sendAlert('alert alert-success', 'Tipo de usuario agregado correctamente');
                        } else {
                            typeUser.sendAlert(`alert alert-danger', 'Hubo un error al registrar ${insertado.msj}`);
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
                typeUser.sendAlert('alert alert-danger', 'Campo vacio');
                return false;
            } else {
                axios.put(URL, datos)
                    .then(function (response) {
                        if (response.data.msj == "success") {
                            typeUser.showData()
                            typeUser.clearTextBox(),
                                typeUser.sendAlert('alert alert-success', 'Tipo de usuario actualizado correctamente');
                        } else {
                            typeUser.sendAlert(`alert alert-danger', 'Hubo un error al actualizar ${response.data.msj}`);
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
                typeUser.sendAlert('alert alert-danger', 'Campo vacio');
                return false;
            } else {
                axios.delete(`${URL}?id=${id}`,{ method: 'DELETE' })
                    .then(function (response) {
                        console.log(response);
                        if (response.data.msj == "success") {
                            typeUser.showData()
                            typeUser.clearTextBox(),
                            typeUser.sendAlert('alert alert-success', 'Tipo de usuario eliminado correctamente');
                        } else {
                            typeUser.sendAlert(`alert alert-danger', 'Hubo un error al eliminar ${response.data.msj}`);
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

        sendAlert(alert, menssage) {
            typeUser.tipoalertaA = alert,
                typeUser.mensajesA = menssage
        },

        validateBoxes(datos) {
            if (datos.nombre == 0) {
                return true;
            }
            return false;
        },
        clearTextBox() {
            document.getElementById("name-insert").value = ''
        }
    }
});