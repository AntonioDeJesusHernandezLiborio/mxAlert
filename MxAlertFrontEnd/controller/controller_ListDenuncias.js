const URL = 'http://localhost/mxAlert/MxAlertBackEnd/controller/controller_denuncias.php';

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
        }
    }
});


