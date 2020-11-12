const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_protocolType.php';
const URL_DENUNCIA = "http://localhost/mxAlert/MxAlertBackEnd/controller/controller_typeComplaint.php";
var id = 0;
var registros = [];


const typeResponse = {
    success: "success"
};

const result = {
    content: "protocol",
};

const typeMessage = {
    emptyFiel: {
        Alert: "alert alert-danger",
        Menssage: "Campo vacio"
    },
    successAdd: {
        Alert: "alert alert-success",
        Menssage: "Protocolo agregado correctamente"
    },
    successEdit: {
        Alert: "alert alert-success",
        Menssage: "Protocolo editado correctamente"
    },
    successDelete: {
        Alert: "alert alert-success",
        Menssage: "Protocolo eliminado correctamente"
    },
    Error: {
        Alert: "alert alert-danger",
        Menssage: "Hubo un error al realizar la opción"
    }
}

const typeUser = new Vue({
    el: '#TypeProtocol',
    data: {
        mensajesA: null,
        tipoalertaA: null,
        denuncias: [],
        denunciaSeleccioda: {}
    },
    mounted: function () {
        this.showData()
        this.showDataSelect()
    },
    methods: {

        showDataSelect: function () {
            axios.get(URL_DENUNCIA)
                .then(function (response) {
                    typeUser.denuncias = response.data.typeComplaint;
                })
        },

        showData() {
            window.itemC = new Array();
            fetch(URL)
                .then(response => { return response.json() })
                .then(protocolo => { registros = protocolo })
                .then(() => {
                    var table = $('#myTable').DataTable();
                    table.clear().draw();
                    let str = '';
                    for (let i = 0; i < registros[result.content].length; i++) {
                        window.itemC[i] = registros[result.content][i];
                        str += '<tr>';
                        str += '<td>' + itemC[i].id + '</td>';
                        str += '<td>' + itemC[i].protocolo + '</td>';
                        str += '<td>' + itemC[i].tipo_denuncia + '</td>';
                        str += '<td> <button class="btn btn-success" data-toggle="modal" data-target="#edit-newTypeUser" onclick="typeUser.passDataEdit(' + i + ')">Editar</button> <button class="btn btn-danger" data-toggle="modal"  data-target="#delete-typeUser" onclick="typeUser.passDataDelete(' + i + ')">Eliminar</button> </td>';
                        str += '</tr>'
                    }
                    table.rows.add($(str)).draw();
                })
        },

        insert: function () {
            const datos = {
                protocolo: document.getElementById("name-insert").value,
                tipo: document.getElementById("denuncia-insert").value
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
                protocolo: document.getElementById("name-update").value,
                tipo: document.getElementById("denuncia-update").value
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
            id = registros[result.content][potition].id;
            document.getElementById("name-update").value = registros[result.content][potition].protocolo;
            document.getElementById("denuncia-update").value = registros[result.content][potition].id_denuncia;
        },
        passDataDelete(potition) {
            id = registros[result.content][potition].id;
            document.getElementById("name-delete").value = registros[result.content][potition].protocolo;
        },

        sendAlert(menssage) {
            typeUser.tipoalertaA = menssage.Alert;
            typeUser.mensajesA = menssage.Menssage;
        },

        validateBoxes(datos) {
            return datos.protocolo == 0 || datos.tipo == 0;
        },
        clearTextBox() {
            document.getElementById("name-insert").value = ''
        }
    }
});