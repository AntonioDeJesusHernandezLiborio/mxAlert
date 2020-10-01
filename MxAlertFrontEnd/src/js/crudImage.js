const imagen = new Vue({
    el: '#Imagen',
    data: {
        urlJPG: '',
        urlPNG: '',
        categorias: [],
        alertgeneral: null,
        messagealert: null,
        nombre: null,
        descripcion: null,
        categoria: null,
        idUser: null,
        imagenPNG: null,
        imagenJPG: null,
        fotos: [],
        urlPNG_update: '',
        urlJPG_update: '',
        urlJPG_delete: ''

    },
    mounted: function () {
        this.cargarComboCategorias();
        this.cargarTablaFotografias();
    },
    methods: {
        nuevaImagen: function () {
            imagen.recogeValoresDeCajasdeTexto();
            if (imagen.cajasEstanVacias()) {
                imagen.alertgeneral = "alert alert-danger";
                imagen.messagealert = "Existen campos vacios";
                return false;
            } else {
                imagen.cargarDatosNuevos();
            }
        },
        cargarTablaFotografias: function () {
            let formdata = new FormData();
            let iduser = document.getElementById("id-user").value;
            formdata.append("option", "showdata");
            formdata.append("id-user",iduser);
            axios.post("../controller/image_controller.php", formdata)
                .then(function (response) {
                    console.log(response);
                    imagen.fotos = response.data.imagenes;
                })
        },
        cargarComboCategorias: function () {
            let formdata = new FormData();
            formdata.append("option", "showdata")
            axios.post("../controller/category_controller.php", formdata)
                .then(function (response) {
                    console.log(response);
                    imagen.categorias = response.data.categories;
                })
        },
        verImagenPNG: (e) => {
            var filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0])
            filereader.onload = (e) => {
                imagen.urlPNG = e.target.result;
            }
        },
        verImagenJPG: (e) => {
            var filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0])
            filereader.onload = (e) => {
                imagen.urlJPG = e.target.result;
            }
        },
        recogeValoresDeCajasdeTexto: function () {
            imagen.nombre = (document.getElementById("nombre-insert").value);
            imagen.descripcion = (document.getElementById("descripcion-insert").value);
            imagen.categoria = (document.getElementById("combo-categoria-insert").value);
            imagen.idUser = (document.getElementById("id-user-insert").value);
            imagen.imagenPNG = (document.getElementById("fotoPNG").files[0]);
            imagen.imagenJPG = (document.getElementById("fotoJPG").files[0]);
        },
        cajasEstanVacias: function () {
            if (imagen.nombre == 0 || imagen.descripcion == 0 || imagen.categoria == 0 || imagen.idUser == 0 || imagen.imagenPNG == 0 ||
                imagen.imagenJPGS == 0) {
                return true;
            }
            return false;
        },
        cargarDatosNuevos: function () {
            let datos = {
                nombre: document.getElementById("nombre-insert").value,
                descripcion: document.getElementById("descripcion-insert").value,
                categoria: document.getElementById("combo-categoria-insert").value,
                idUser: document.getElementById("id-user-insert").value,
                imagenPNG: document.getElementById("fotoPNG").files[0],
                imagenJPG: document.getElementById("fotoJPG").files[0],
            };
            let formData = imagen.toFormData(datos, 'insert', datos.imagenPNG, datos.imagenJPG);

            axios.post("../controller/image_controller.php", formData)
                .then(function (response) {
                    if (response.data == 1) {
                        imagen.alertgeneral = "alert alert-success";
                        imagen.messagealert = "Imagenes guardadas con exito!";
                        imagen.cargarTablaFotografias();
                        imagen.vaciarCajas();
                    } else if (response.data == "") {
                        imagen.alertgeneral = 'alert alert-danger';
                        imagen.messagealert = 'Ocurrio un error al subir las imagenes';
                    } else {
                        imagen.alertgeneral = 'alert alert-danger';
                        imagen.messagealert = response.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },

        toFormData: (obj, option, fileimgPNG, fileimgJPG) => {
            let fd = new FormData();
            fd.append('option', option);
            if (fileimgPNG != "0" && fileimgJPG != "0") {
                fd.append("imagenPNG", fileimgPNG);
                fd.append("imagenJPG", fileimgJPG);
            } else {
                if (fileimgPNG == "0" && fileimgJPG != "0") {
                    fd.append("imagenJPG", fileimgJPG);
                }
                if(fileimgPNG != "0" && fileimgJPG == "0"){
                    fd.append("imagenPNG", fileimgPNG);
                }
            }
            for (var i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;

        },


        limpiarAlertas: () => {
            imagen.alertgeneral = null;
            imagen.messagealert = null;
        },
        pasarDatosEditar(imagenes) {
            document.getElementById("idImagen-update").value = imagenes.Id;
            document.getElementById("nombre-update").value = imagenes.nombre;
            document.getElementById("descripcion-update").value = imagenes.descripcion;
            document.getElementById("combo-categoria-update").value = imagenes.idCategoria;
            imagen.urlJPG_update = '../src/img/JPG/' + imagenes.JPG;
            imagen.urlPNG_update = '../src/img/PNG/' + imagenes.PNG;
        },

        
        editarImagen: () => {
            let datos = {
                id: document.getElementById("idImagen-update").value,
                nombre: document.getElementById("nombre-update").value,
                descripcion: document.getElementById("descripcion-update").value,
                categoria: document.getElementById("combo-categoria-update").value,
                PNG: document.getElementById("fotoPNG-update").files[0],
                JPG: document.getElementById("fotoJPG-update").files[0],
                id_user: document.getElementById("id-user-update").value
            };

            if (datos.id == 0 ||
                datos.nombre == 0 ||
                datos.descripcion == 0 ||
                datos.categoria == 0 ||
                datos.PNG == 0 ||
                datos.JPG == 0 ||
                datos.id_user ==0 ) {
                (User.alertgeneral = "alert alert-danger"),
                (User.messagealert = "Existen campos vacios");
                return false;
            } else {

                let formData;
                if (document.getElementById("fotoPNG-update").files[0] == null && document.getElementById("fotoJPG-update").files[0] == null) {
                    formData = imagen.toFormData(datos, 'update', '0', '0')
                }else if(document.getElementById("fotoPNG-update").files[0] == null && document.getElementById("fotoJPG-update") != null){
                    formData = imagen.toFormData(datos,'updateOnlyJPG','0',datos.JPG);
                }else if(document.getElementById("fotoPNG-update").files[0] != null && document.getElementById("fotoJPG-update") == null) {
                    formData = imagen.toFormData(datos, 'updateOnlyPNG', datos.PNG, '0');
                }else{
                    formData = imagen.toFormData(datos, 'updateTwoImage', datos.PNG, datos.JPG);
                }
                axios
                    .post("../controller/image_controller.php", formData)
                    .then(response => {
                        if (response.data == "1") {
                            imagen.cargarTablaFotografias();
                            imagen.alertgeneral = "alert alert-success";
                            imagen.messagealert = "Imagenes guardadas con exito!";
                        } else if(response.data == ''){
                            imagen.alertgeneral = "alert alert-danger";
                            imagen.messagealert = "Ocurrio un error al cargar los datos";
                        }else{
                            imagen.alertgeneral = "alert alert-danger";
                            imagen.messagealert = response.data;
                        }
                    });
            }
        },

        verImagenPNG_update: (e) => {
            var filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0])
            filereader.onload = (e) => {
                imagen.urlPNG_update = e.target.result;
            }
        },
        verImagenJPG_update: (e) => {
            var filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0])
            filereader.onload = (e) => {
                imagen.urlJPG_update = e.target.result;
            }
        },

        elimarImagen: () => {
            if ((document.getElementById("descripcion-delete").value) == 0) {
                imagen.alertgeneral = "alert alert-danger";
                imagen.messagealert = "Campos vacios";
            } else {
              let formdata = new FormData();
              formdata.append("option", "delete")
              formdata.append("id", document.getElementById("id-image-delete").value)
              axios.post("../controller/image_controller.php", formdata)
                .then(function (response) {
                  if (response.data == 1) {
                    imagen.cargarTablaFotografias();
                    imagen.alertgeneral = "alert alert-success";
                    imagen.messagealert = "Imagen eliminada con exito";
                  } else if(response.data == ""){
                    imagen.alertgeneral = "alert alert-danger";
                    imagen.messagealert = "Ocurrio un error al eliminar imagen";
                  } else {
                    imagen.alertgeneral = "alert alert-success";
                    imagen.messagealert = response.data;
                  }
                })
            }
          },
          pasarDatosEliminar(imagenes) {
            document.getElementById("id-image-delete").value = imagenes.Id;
            document.getElementById("descripcion-delete").value = imagenes.nombre;
            imagen.urlJPG_delete = '../src/img/JPG/' + imagenes.JPG;
        },
        vaciarCajas: () =>{
            document.getElementById("nombre-insert").value = '';
            document.getElementById("descripcion-insert").value = '';
            document.getElementById("combo-categoria-insert").value = 0;
            document.getElementById("fotoPNG").value = '';
            document.getElementById("fotoJPG").value = '';
            imagen.urlJPG = '';
            imagen.urlPNG = '';

        }
    }
});