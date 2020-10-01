const Category = new Vue({
  el: "#tablaCategories",
  data: {
    messagealert: null,
    alertaofaccess: null,
    alertgeneral: null,
    alertavalidregister: null,
    messagealertregister: null,
    btniniciartext: "Iniciar",
    usuarios: [],
    category: [],
    elegido: {},
    url: '',
    url2: ''
  },
  mounted: function () {
    this.getDatos();
  },
  methods: {
    getDatos: function () {
      let formdata = new FormData();
      formdata.append("option", "showdata")
      axios.post("../controller/category_controller.php", formdata)
        .then(function (response) {
          console.log(response);
          Category.category = response.data.categories;
        })
    },
    nuevaCategoria: function () {
      if ((document.getElementById("nombreCategoria").value) == 0) {
          Category.mostraAlertas('alert alert-danger','Campos vacios');
        return false;
      } else {
        let formdata = new FormData();
        formdata.append("option", "insert")
        formdata.append("nombre", document.getElementById("nombreCategoria").value)
        axios.post("../controller/category_controller.php", formdata)
          .then(function (response) {
            if (response.data == 1) {
              Category.getDatos()
              document.getElementById("nombreCategoria").value = '',
              Category.mostraAlertas('alert alert-success','Categoria agregada correctamente');
            } else if (response.data == "") {
                Category.mostraAlertas('alert alert-danger','Error, la categoria ya existe');
            }

          })
      }
    },
    editarCategoria: () => {
      if ((document.getElementById("nombre-update").value) == 0) {
          Category.mostraAlertas('alert alert-danger','Campo vacio');
        return false;
      } else {
        let formdata = new FormData();
        formdata.append("option", "update")
        formdata.append("id", document.getElementById("codigo-update").value)
        formdata.append("nombre", document.getElementById("nombre-update").value)
        axios.post("../controller/category_controller.php", formdata)
          .then(function (response) {
            if (response.data == 1) {
              Category.getDatos()
                Category.mostraAlertas('alert alert-success','La categoria se ah editado corrrectamente');
            }else{
              Category.mostraAlertas('alert alert-danger','La categoria no pudo ser editada, intenta más tarde');
            }
          })
      }
    },
    eliminarCategoria: function () {
      if ((document.getElementById("nombre-delete").value) == 0) {
        Category.mostraAlertas('alert alert-danger','Campo vacio');
      } else {
        let formdata = new FormData();
        formdata.append("option", "delete")
        formdata.append("id", document.getElementById("codigo-delete").value)
        axios.post("../controller/category_controller.php", formdata)
          .then(function (response) {
            if (response.data == 1) {
              Category.getDatos();
              Category.mostraAlertas('alert alert-success','La categoria se ah eliminado corrrectamente');
            } else if (response.data == "") {
              Category.mostraAlertas('alert alert-danger','Error al eliminar, la categoria esta asignado a por lo menos 1 imagen')
            }
          })
      }
    },

    limpiarAlertas: () => {
      Category.alertaofaccess = null;
      Category.alertgeneral = null;
    },
    pasarDatosEditar: (categoria) => {
      document.getElementById("codigo-update").value=categoria.Id;
      document.getElementById("nombre-update").value= categoria.Categoria;
    },
    pasarDatosEliminar: (categoria) => {
      document.getElementById("codigo-delete").value=categoria.Id;
      document.getElementById("nombre-delete").value= categoria.Categoria;
    },
    mostraAlertas: (clase,mensajes) => {
      Category.alertgeneral = clase;
      Category.alertaofaccess = mensajes;
    }

  }
});