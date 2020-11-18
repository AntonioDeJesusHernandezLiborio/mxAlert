const typeUser = {
    Administration: "Administración",
    Premiun: "Premium",
    Free: "Free"
};

const URL ={
    administration : "http://localhost/mxAlert/MxAlertFrontEnd/administrador/administracion.html",
    premium : "http://localhost/mxAlert/MxAlertFrontEnd/administrador/premium.html"
}

var tipo_user= localStorage.getItem("tipo");
var URLactual = window.location;
switch(tipo_user){
    case typeUser.Administration:
            if(URLactual != URL.administration){
                window.location.href = URL.administration;
            }
        break;
    case typeUser.Premiun:
            if(URLactual != URL.premium){
                window.location.href = URL.premium;
            }
        break;
    default:
        window.location.href = './login.html';
        break;
}

function cerrarSesion(){
    localStorage.removeItem("tipo");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.href = './login.html';
}