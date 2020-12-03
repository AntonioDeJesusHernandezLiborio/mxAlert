const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_denuncias.php';
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
        Menssage: "Denuncia publicada con éxito"
    },
    successEdit: {
        Alert: "alert alert-success",
        Menssage: "Denuncia actualizada con éxito"
    },
    successDelete: {
        Alert: "alert alert-success",
        Menssage: "Denuncia desactivado correctamente"
    },
    Error: {
        Alert: "alert alert-danger",
        Menssage: "Hubo un error al realizar la opción"
    }
}


const typeUser = new Vue({
    el: '#createAccount',
    data: {
        mensajesA: null,
        tipoalertaA: null,
        denuncias: [],
        denunciaSeleccioda: {},
        Listdenuncias: []
    },
    mounted: function () {
        this.showDataSelect()
        this.show()
    },
    methods: {
        show: function () {
            var dataSend = new FormData();
            dataSend.append("option", "getData");
            axios({
                method: 'POST',
                url: URL,
                data: dataSend,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                    console.log(response);
                    typeUser.Listdenuncias = response.data.denuncias;
                })
        },



        showDataSelect: function () {
            axios.get(URL_DENUNCIA)
                .then(function (response) {
                    typeUser.denuncias = response.data.typeComplaint;
                })
        },

        insert: function () {
            var dataSend = new FormData(document.getElementById("frmAdd"));
            dataSend.append("clave_cuenta", localStorage.getItem("id"));
            dataSend.append("option", "insert");
            if (typeUser.validateBoxes(dataSend)) {
                typeUser.sendAlert(typeMessage.emptyFiel);
            } else {
                axios({
                    method: 'POST',
                    url: URL,
                    data: dataSend,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            typeUser.clearTextBox()
                            typeUser.sendAlert(typeMessage.successAdd);
                        } else {
                            typeUser.sendAlert(typeMessage.Error);
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },

        edit: function () {
            var dataSend = new FormData();
            dataSend.append("clave_cuenta", localStorage.getItem("id"));
            dataSend.append("option", "update");
            dataSend.append("id", "update");
            if (typeUser.validateBoxes(dataSend)) {
                typeUser.sendAlert(typeMessage.emptyFiel);
            } else {
                axios({
                    method: 'POST',
                    url: URL,
                    data: dataSend,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then(function (response) {
                        if (response.data.msj == typeResponse.success) {
                            typeUser.clearTextBox()
                            typeUser.sendAlert(typeMessage.successEdit);
                        } else {
                            typeUser.sendAlert(typeMessage.Error);
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
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

        passDataEdit(denuncia) {
            console.log(denuncia);
            document.getElementById("name-desactivar").value = denuncia.id;
        },
        passDataDelete(potition) {
            id = registros[result.content][potition].id;
            document.getElementById("name-delete").value = registros[result.content][potition].protocolo;
        },

        sendAlert(menssage) {
            typeUser.tipoalertaA = menssage.Alert;
            typeUser.mensajesA = menssage.Menssage;
        },

        clearTextBox() {
            document.getElementById("name-insert").value = ''
        },

        validateBoxes(dataProduct) {
            if (
                dataProduct.get("descripcion") == "" ||
                dataProduct.get("estado") == "" ||
                dataProduct.get("municipio") == "" ||
                dataProduct.get("colonia") == "" ||
                dataProduct.get("calle") == "" ||
                dataProduct.get("clave_denuncia") == null ||
                dataProduct.get("file-imagen") == null
            ) {
                return true;
            }
            return false;
        },
    }
});


document.getElementById("file").onchange = function (e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
        let preview = document.getElementById('preview'),
            image = document.createElement('img');
        image.src = reader.result;
        image.width = 450;
        image.height = 450;

        preview.innerHTML = '';
        preview.append(image);
    };
};
