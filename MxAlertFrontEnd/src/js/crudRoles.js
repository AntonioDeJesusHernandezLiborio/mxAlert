const rol = new Vue({
    el: '#tablaRoles',
    data: {
        mensajesA: null,
        tipoalertaA: null,
        mensajesE: null,
        tipoalertaE: null, 
        mensajesEli: null,
        tipoalertaEli: null,
        roles: [],
        elegido: {},
        selected:'Seleccione Rol'
       
    },
    mounted: function () {
        this.cargarDatos() 
    },
    methods: {
        cargarDatos: function () {
            let formdata = new FormData();
            formdata.append("option", "showdata")
            axios.post("../controller/rol_controller.php", formdata)
                .then(function (response) {
                    console.log(response);
                    rol.roles = response.data.roles;
                })
        },
        nuevoRol: function () {
            if ((document.getElementById("nombreRol").value) == 0) {
                rol.tipoalertaA = 'alert alert-danger',
                    rol.mensajesA = 'Campos vacios'
                    return false;
            } else {
                let formdata = new FormData();
                formdata.append("option", "insert")
                formdata.append("nombre", document.getElementById("nombreRol").value)
                axios.post("../controller/rol_controller.php", formdata)
                    .then(function (response) {
                        if (response.data == 1) {
                            rol.cargarDatos()
                            document.getElementById("nombreRol").value = '',
                                rol.tipoalertaA = 'alert alert-success',
                                rol.mensajesA = 'Rol agregado correctamente'
                        } else if (response.data == "") {
                            rol.tipoalertaA = 'alert alert-danger',
                                rol.mensajesA = 'Error, el rol ya existe'
                        }

                    })
            }
        },
        editarRol: function () {
            if ((document.getElementById("nombreEditar_rol").value) == 0) {
                rol.tipoalertaE = 'alert alert-danger',
                    rol.mensajesE = 'Campo vacios'
                return false;
            } else {
                let formdata = new FormData();
                formdata.append("option", "update")
                formdata.append("id", document.getElementById("codigoEditar_rol").value)
                formdata.append("nombre", document.getElementById("nombreEditar_rol").value)
                axios.post("../controller/rol_controller.php", formdata)
                    .then(function (response) {
                        if (response.data == 1) {
                            rol.cargarDatos()
                            rol.tipoalertaE = 'alert alert-success',
                            rol.mensajesE = 'El rol se ah editado corrrectamente'
                        }
                    })
            }
        },
        eliminarRol: function () {
            if ((document.getElementById("nombreEliminar_rol").value) == 0) {
                rol.tipoalertaEli = 'alert alert-danger',
                rol.mensajesEli = 'Campo vacio'
            } else {
                let formdata = new FormData();
                formdata.append("option", "delete")
                formdata.append("id", document.getElementById("codigoEliminar_rol").value)
                axios.post("../controller/rol_controller.php", formdata)
                    .then(function (response) {
                        if (response.data == 1) {
                            rol.cargarDatos()
                            rol.tipoalertaEli = 'alert alert-success',
                            rol.mensajesEli = 'El rol se ah eliminado corrrectamente'
                        }else if(response.data == ""){
                            rol.tipoalertaEli = 'alert alert-danger',
                            rol.mensajesEli = 'Error al eliminar, el rol esta asignado a por lo menos 1 usuario'
                        }
                    })
            }
        },
        pasarDatosEditar(Rol) {
            document.getElementById("nombreEditar_rol").value = Rol.rol;
            document.getElementById("codigoEditar_rol").value = Rol.Id;
        },
        pasarDatosEliminar(Rol) {
            document.getElementById("nombreEliminar_rol").value = Rol.rol;
            document.getElementById("codigoEliminar_rol").value = Rol.Id;
        },
        limpiar(){
            rol.mensajesA= null,
            rol.tipoalertaA= null,
            rol.mensajesE= null,
            rol.tipoalertaE= null,
            rol.mensajesEli= null,
            rol.tipoalertaEli=null
        },
       
    }
});


