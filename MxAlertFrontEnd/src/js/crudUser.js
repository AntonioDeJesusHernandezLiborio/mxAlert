const User = new Vue({
  el: "#app-user",
  data: {
    titlelog: "Login",
    messagealert: null,
    alertaofaccess: null,
    alertgeneral: null,
    alertavalidregister: null,
    messagealertregister: null,
    btniniciartext: "Iniciar",
    usuarios: [],
    roles: [],
    elegido: {},
    url: '',
    url2: ''
  },
  mounted: function () {
    this.getDatos();
    this.cargarComboRol();
  },
  methods: {
    getDatos: function () {
      let formdata = new FormData();
      formdata.append("option", "showdata")
      axios.post("../controller/user_controller.php", formdata)
        .then(function (response) {
          console.log(response);
          User.usuarios = response.data.users;
          
        })
    },
    accesoUser: () => {
      if (
        document.getElementById("user").value == 0 ||
        document.getElementById("password").value == 0
      ) {
        User.alertaofaccess = "alert alert-danger",
          User.messagealert = "Campos vacios";
      } else {
        User.btniniciartext = "Iniciando..";
        let formd = new FormData();
        formd.append("option", "access");
        formd.append("user", document.getElementById("user").value);
        formd.append("password", document.getElementById("password").value);

        axios.post("controller/user_controller.php", formd)
          .then(response => {
            if (response.data == "1") {
            
              window.location.href = "view/index.php";
            } else {
              (User.alertaofaccess = "alert alert-danger"),
              (User.messagealert = "Error al iniciar sesion");
              User.btniniciartext = "Iniciando";
              
            }
          });
      }
    },
    registerUserAccount: () => {
      //variables iniciales para  registro de cuenta y validacion
      let password = document.getElementById("pass").value;
      let password2 = document.getElementById("pass2").value;
      var valspace = /\s/;
      let datos = {
        nombre: document.getElementById("nombre").value,
        appaterno: document.getElementById("ap-paterno").value,
        apmaterno: document.getElementById("ap-materno").value,
        correo: document.getElementById("correo").value,
        usuario: document.getElementById("usuario").value,
        password: password,
      };

      if (
        datos.nombre == 0 ||
        datos.appaterno == 0 ||
        datos.apmaterno == 0 ||
        datos.correo == 0 ||
        datos.usuario == 0 ||
        password == 0 ||
        password2 == 0
      ) {
        (User.alertavalidregister = "alert alert-danger"),
        (User.messagealertregister = "Existen campos vacios");
        return false;
      } else {
        if (valspace.test(password)) {
          (User.alertavalidregister = "alert alert-danger"),
          (User.messagealertregister =
            "La contraseña no debe tener espacios");
        } else {
          if (password == password2) {
            let formData = User.toFormData(datos, 'register', '0')
            axios
              .post("controller/user_controller.php", formData)
              .then(response => {
                if (response.data == "1") {
                  User.limpiarcajasRegistroAccount();
                  User.alertavalidregister = "alert alert-success",
                    User.messagealertregister = "Se ha registrado su cuenta exitosamente";
                } else {
                  (User.alertavalidregister = "alert alert-danger"),
                  (User.messagealertregister =
                    "Su cuenta no pudo registrarse " + response.data);
                }
              });

          } else {
            User.alertavalidregister = "alert alert-danger",
              User.messagealertregister = "Las contraseñas no coinciden";
          }
        }
      }
    },
    toFormData: (obj, option, fileimg) => {
      let fd = new FormData();
      fd.append('option', option);
      if (fileimg == "0") {
        for (var i in obj) {
          fd.append(i, obj[i]);
        }
      } else {
        fd.append('img', fileimg)
        for (var i in obj) {
          fd.append(i, obj[i]);
        }
      }
      return fd;
    },
    verImagen: (e) => {
      var filereader = new FileReader();
      filereader.readAsDataURL(e.target.files[0])
      filereader.onload = (e) => {
        User.url = e.target.result
      }
    },
    verImagenUpdate: (e) => {
      var filereader = new FileReader();
      filereader.readAsDataURL(e.target.files[0])
      filereader.onload = (e) => {
        User.url2 = e.target.result
      }
    },
    nuevoUsuario: () => {
      var valspace = /\s/;
      let datos = {
        nombre: document.getElementById("nombre-insert").value,
        appaterno: document.getElementById("apepaterno-insert").value,
        apmaterno: document.getElementById("apematerno-insert").value,
        rol: document.getElementById("combo-rol-insert").value,
        correo: document.getElementById("correo-insert").value,
        usuario: document.getElementById("usuario-insert").value,
        img: document.getElementById("foto").files[0],
        password: document.getElementById("password-insert").value,
      };

      if (datos.nombre == 0 ||
        datos.appaterno == 0 ||
        datos.apmaterno == 0 ||
        datos.rol == 0 ||
        datos.correo == 0 ||
        datos.usuario == 0 ||
        datos.password == 0) {
        (User.alertgeneral = "alert alert-danger"),
        (User.messagealert = "Existen campos vacios");

        return false;
      } else {
        if (valspace.test(datos.password)) {
          (User.alertgeneral = "alert alert-danger"),
          (User.messagealert =
            "La contraseña no debe tener espacios");
        } else {
          let formData = User.toFormData(datos, 'insert', datos.img)
          axios
            .post("../controller/user_controller.php", formData)
            .then(response => {
              if (response.data == "1") {
                User.getDatos();
                User.limpiarCajasNuevoUsuario();
                User.alertgeneral = "alert alert-success",
                  User.messagealert = "Se ha registrado el usuario exitosamente";
              } else {
                (User.alertgeneral = "alert alert-danger"),
                (User.messagealert =
                  "El usuario no pudo registrarse " + response.data);
              }
            });
        }
      }
    },
    editarUsuario: () => {
      var valspace = /\s/;
      let datos = {
        id: document.getElementById("id-user-update").value,
        nombre: document.getElementById("nombre-update").value,
        appaterno: document.getElementById("apepaterno-update").value,
        apmaterno: document.getElementById("apematerno-update").value,
        rol: document.getElementById("combo-rol-update").value,
        correo: document.getElementById("correo-update").value,
        usuario: document.getElementById("usuario-update").value,
        img: document.getElementById("foto-update").files[0],
        password: document.getElementById("password-update").value,
      };

      if (datos.id == 0 ||
        datos.nombre == 0 ||
        datos.appaterno == 0 ||
        datos.apmaterno == 0 ||
        datos.rol == 0 ||
        datos.correo == 0 ||
        datos.usuario == 0 ||
        datos.password == 0) {
        (User.alertgeneral = "alert alert-danger"),
        (User.messagealert = "Existen campos vacios");

        return false;
      } else {
        if (valspace.test(datos.password)) {
          (User.alertgeneral = "alert alert-danger"),
          (User.messagealert =
            "La contraseña no debe tener espacios");
        } else {
          let formData;
          if (document.getElementById("foto-update").files[0] == null) {
            formData = User.toFormData(datos, 'updateOffPhoto','0')
            console.log("no selecciono");
          } 
          else{
            formData = User.toFormData(datos, 'update', datos.img);
            console.log("Selecciono");
          }
          axios
            .post("../controller/user_controller.php", formData)
            .then(response => {
              if (response.data == "1") {
                User.getDatos();
                User.alertgeneral = "alert alert-success",
                  User.messagealert = "Se ha actualizado el usuario exitosamente";
              } else {
                (User.alertgeneral = "alert alert-danger"),
                (User.messagealert =
                  "El usuario no pudo actualizar los datos :" + response.data);
              }
            });
        }
      }
    },
    elimarUsuario: () => {
      if ((document.getElementById("nombreEliminar_user").value) == 0) {
        User.alertgeneral = 'alert alert-danger',
          User.messagealert = 'Campo vacio'
      } else {
        let formdata = new FormData();
        formdata.append("option", "delete")
        formdata.append("id", document.getElementById("codigoEliminar_user").value)
        axios.post("../controller/user_controller.php", formdata)
          .then(function (response) {
            if (response.data == 1) {
              User.getDatos();
              User.alertgeneral = 'alert alert-success',
                User.messagealert = 'El usuario se ah eliminado corrrectamente'
            } else {
              User.alertgeneral = 'alert alert-danger',
                User.messagealert = 'Error al eliminar :' + response.data;
            }
          })
      }
    },
    pasarDatosEditar: (Usuarios) => {
      document.getElementById("id-user-update").value= Usuarios.Id;
      document.getElementById("nombre-update").value = Usuarios.nombre;
      document.getElementById("apepaterno-update").value = Usuarios.Apepaterno;
      document.getElementById("apematerno-update").value = Usuarios.Apematerno;
      document.getElementById("correo-update").value = Usuarios.correo;
      document.getElementById("usuario-update").value = Usuarios.usuario;
      document.getElementById("password-update").value = Usuarios.pass;
      User.url2 = '../src/img/' +Usuarios.img;
      console.log(User.url2);
      document.getElementById("combo-rol-update").value = Usuarios.rol;
    },
    pasarDatosEliminar: (Usuarios) => {
      User.elegido = Usuarios;
    },
    limpiarAlertas: () => {
      User.alertaofaccess = null;
      User.messagealert = null;
      User.alertavalidregister = null;
      User.messagealertregister = null;
      User.alertgeneral = null;
    },
    limpiarcajasRegistroAccount: () => {
      document.getElementById("nombre").value = "";
      document.getElementById("ap-paterno").value = "";
      document.getElementById("ap-materno").value = "";
      document.getElementById("correo").value = "";
      document.getElementById("usuario").value = "";
      document.getElementById("pass").value = "";
      document.getElementById("pass2").value = "";
    },
    cargarComboRol: function () {
      let formdata = new FormData();
      formdata.append("option", "showdata")
      axios.post("../controller/rol_controller.php", formdata)
        .then(function (response) {
          console.log(response);
          User.roles = response.data.roles;
        })
    },
    limpiarCajasNuevoUsuario: () => {
      document.getElementById("nombre-insert").value = " ";
      document.getElementById("apepaterno-insert").value = "";
      document.getElementById("apematerno-insert").value = "";
      document.getElementById("combo-rol-insert").value = 0;
      document.getElementById("correo-insert").value = "";
      document.getElementById("usuario-insert").value = "";
      document.getElementById("foto").value = '';
      document.getElementById("password-insert").value = ""
      User.url = '';
    }
  }
});