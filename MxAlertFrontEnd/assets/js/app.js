function cargarSectionPages(){
    $("#header").load("./header.html");
    $("#sidebar").load("./sidebar.html");
    $("#footer").load("./footer.html");
}
cargarSectionPages();

function cerrarSesion() {
    localStorage.removeItem("tipo");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.href = 'http://localhost/mxAlert/MxAlertFrontEnd/administrador/login.html';
}
