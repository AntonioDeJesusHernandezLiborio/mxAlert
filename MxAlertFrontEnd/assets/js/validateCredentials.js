const typeUser = {
    Administration: "Administración",
    Premiun: "Premium",
    Free: "Free"
};

const URL = {
    administration: "http://localhost/mxAlert/MxAlertFrontEnd/administrador/index.html",
    premium: "http://localhost/mxAlert/MxAlertFrontEnd/clientes/index.html"
}

var tipo_user = localStorage.getItem("tipo");
var URLactual = window.location;
switch (tipo_user) {
    case typeUser.Administration:
        if (URLactual != URL.administration) {
            window.location.href = URL.administration;
        }
        break;
    case typeUser.Premiun:
        if (URLactual != URL.premium) {
            window.location.href = URL.premium;
        }
        break;
    default:
        window.location.href = 'http://localhost/mxAlert/MxAlertFrontEnd/administrador/login.html';
        break;
}

