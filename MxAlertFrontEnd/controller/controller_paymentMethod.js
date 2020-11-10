
const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_paymentMethod.php';
var id = 0;
var registros = [];
const typeResponse = {
    success: "success"
};

const result = {
    content: "paymentMethod"
};

const typeMessage = {
    emptyFiel: {
        Alert: "alert alert-danger",
        Menssage: "Campo vacio"
    },
    successAdd: {
        Alert: "alert alert-success",
        Menssage: "Metodo de pago agregado correctamente"
    },
    successEdit: {
        Alert: "alert alert-success",
        Menssage: "Metodo de pago editado correctamente"
    },
    successDelete: {
        Alert: "alert alert-success",
        Menssage: "Metodo de pago eliminado correctamente"
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
        showData() {
            window.itemC = new Array();
            fetch(URL)
              .then(response => { return response.json() })
              .then(users => { registros = users })
              .then(() => {
                var table = $('#myTable').DataTable();
                table.clear().draw();
                let str = '';
                for (let i = 0; i < registros[result.content].length; i++) {
                  window.itemC[i] = registros[result.content][i];
                  str += '<tr>';
                  str += '<td>' + itemC[i].id + '</td>';
                  str += '<td>' + itemC[i].nombre + '</td>';
                  str += '<td> <button class="btn btn-success" data-toggle="modal" data-target="#edit-newTypeUser" onclick="typeUser.passDataEdit('+ i +')">Editar</button> <button class="btn btn-danger" data-toggle="modal"  data-target="#delete-typeUser" onclick="typeUser.passDataDelete('+i+')">Eliminar</button> </td>';
                  str += '</tr>'
                }
                table.rows.add($(str)).draw();
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

        passDataEdit(potition) {
            id =  registros[result.content][potition].id;
            document.getElementById("name-update").value = registros[result.content][potition].nombre;
        },
        passDataDelete(potition) {
            id = registros[result.content][potition].id;
            document.getElementById("name-delete").value = registros[result.content][potition].nombre;
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
        }
    }
});