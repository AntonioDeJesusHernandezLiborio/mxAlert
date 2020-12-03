const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_denuncias.php';
var id = 0;

const typeResponse = {
    success: "success"
};

const typeUser = new Vue({
    el: '#createAccount',
    data: {
        mensajesA: null,
        tipoalertaA: null,
        Listdenuncias: []
    },
    mounted: function () {
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
        edit() {
            var dataSend = new FormData();
            dataSend.append("clave_cuenta", localStorage.getItem("id"));
            dataSend.append("option", "update");
            dataSend.append("id", id);
            axios({
                method: 'POST',
                url: URL,
                data: dataSend,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.data.msj == typeResponse.success) {
                        typeUser.show();
                        typeUser.sendAlert(typeMessage.successEdit);
                    } else {
                        typeUser.sendAlert(typeMessage.Error);
                    }
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        passDataEdit(denuncia) {
            id = denuncia.id;
            document.getElementById("name-descativar").value = denuncia.descripcion;
        }
    },
});


