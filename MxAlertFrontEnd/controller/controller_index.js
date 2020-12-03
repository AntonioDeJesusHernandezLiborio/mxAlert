const URL_USER = "http://localhost/mxAlert/MxAlertBackEnd/controller/controller_user.php";

const index = new Vue({
    el: '#index',
    data: {
        nombre_usuario: null,
        numero_denuncias: null,
        nombre_titular: null,
        telefono: null,
        nombre:null,
        fecha_creacion: null
    },
    mounted: function () {
        this.show()
    },
    methods: {
        show: function () {
            datos = {id: localStorage.getItem("id")}
            axios.post(URL_USER,datos)
                .then(function (response) {
                    console.log(response);
                    //typeUser.denuncias = response.data.typeComplaint;
                    index.nombre_usuario = response.data.accounts[0].nombre;
                    index.numero_denuncias = response.data.accounts[0].cantidad_denuncias;
                    index.nombre_titular = response.data.accounts[0].nombre;
                    index.telefono= response.data.accounts[0].telefono;
                    index.nombre= response.data.accounts[0].usuario;
                    index.fecha_creacion= response.data.accounts[0].fecha;
                })
        },
    },
});


