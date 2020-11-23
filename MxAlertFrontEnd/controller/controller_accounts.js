const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_Account.php';
const URL_DENUNCIA = "http://localhost/mxAlert/MxAlertBackEnd/controller/controller_typeUser.php"
var id = 0;
var registros = [];


const typeResponse = {
    success: "success"
};

const result = {
    content: "accounts"
    
};

const typeMessage = {
    emptyFiel: {
        Alert: "alert alert-danger",
        Menssage: "Campo vacio"
    },

    successEdit: {
        Alert: "alert alert-success",
        Menssage: "Cuenta editada correctamente"
    },
    successDelete: {
        Alert: "alert alert-success",
        Menssage: "Cuenta bloqueada correctamente"
    },
    Error: {
        Alert: "alert alert-danger",
        Menssage: "Ocurrio un error."
    }
}

const typeUser = new Vue({
    el: '#TypeUser',
    data: {
        mensajesA: null,
        tipoalertaA: null,
        tipocuentas: [],
        tipocuentaSeleccioda: {}
    },
    mounted: function () {
        this.showData()
        this.showDataSelect()
    },
    methods: {
        showDataSelect: function () {
            axios.get(URL_DENUNCIA)
                .then(function (response) {
                    typeUser.tipocuentas = response.data.typeUser;
                })
        },
        showData() {
            window.itemC = new Array();
            fetch(URL)
              .then(response => { return response.json() })
              .then(users => { registros = users })
              .then(() => {
                var table = $('#myTableAccounts').DataTable();
                table.clear().draw();
                let str = '';
                for (let i = 0; i < registros[result.content].length; i++) {
                  window.itemC[i] = registros[result.content][i];
                  let estado = itemC[i].estado == 1 ? 'ACTIVO' : 'BLOQUEADO';
                  let estadoBoton = estado == 'BLOQUEADO' ? 'disabled' : ''
                  str += '<tr>';
                  str += '<td>' + itemC[i].id + '</td>';
                  str += '<td>' + itemC[i].nombre + '</td>';
                  str += '<td>' + itemC[i].telefono + '</td>';
                  str += '<td>' + itemC[i].usuario + '</td>';
                  str += '<td>' + itemC[i].tipo_cuenta + '</td>';
                  str += '<td>' + itemC[i].fecha + '</td>';
                  str += '<td>' + estado + '</td>';
                  str += '<td>' + itemC[i].cantidad_denuncias + '</td>';
                  str += '<td> <button class="btn btn-success" data-toggle="modal" data-target="#edit-newTypeUser" onclick="typeUser.passDataEdit('+ i +')"> <i class="fas fa-edit"></i></button> </td>';
                  str += `<td> <button class="btn btn-danger" data-toggle="modal"  data-target="#delete-typeUser" ${estadoBoton}  onclick="typeUser.passDataDelete(`+i+`)"><i class="fas fa-ban"></i></button></td>`;
                  str += '</tr>'
                }
                table.rows.add($(str)).draw();
              })
        },

        edit: function () {
            const datos = {
                id: id,
                nivelusuario: document.getElementById("nivelUsuario-edit").value
            }
            if (typeUser.validateBoxes(datos)) {
                typeUser.sendAlert(typeMessage.emptyFiel);
                return false;
            } else {
                axios.put(URL, datos)
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            typeUser.showData();
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
                razon:document.getElementById("razon-delete").value
            }
            if (typeUser.validateBoxesLocked(datos)) {
                typeUser.sendAlert(typeMessage.emptyFiel);
                return false;
            } else {
                axios.delete(`${URL}?id=${datos.id}&razon=${datos.razon}`)
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            typeUser.showData();
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
            document.getElementById("user-update").value = registros[result.content][potition].usuario;
            document.getElementById("nivelUsuario-edit").value = registros[result.content][potition].id_tipo_cuenta;
        },

        passDataDelete(potition) {
            id =  registros[result.content][potition].id;
        },

        sendAlert(menssage) {
            typeUser.tipoalertaA = menssage.Alert;
            typeUser.mensajesA = menssage.Menssage;
        },

        validateBoxes(datos) {
            return datos.id == 0 || datos.nivelusuario == 0;
        },

        validateBoxesLocked(datos) {
            return datos.id == 0 || datos.razon == 0;
        }
    }
});