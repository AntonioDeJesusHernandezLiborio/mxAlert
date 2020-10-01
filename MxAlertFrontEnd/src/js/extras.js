$(document).ready(function() {
    $('#sidebarCollapse').on('click', () => {
        $('#sidebar').toggleClass('active');  
    });

    $('#sidebarCollapse').on('click', () => {
        $('.container-fluid').toggleClass('mx-width-1075')
    });


    
});

let counts = new Vue({
    el:"#contadores",
    data:{
        usuarios:'Usuarios',
        countUsers:0,
        countCategory:0,
        countImages:0
    },
    mounted:function (){
        this.cargarUsers();
        this.cargarCategorys();
        this.cargarImagen();
    },
    methods:{
        cargarUsers: () => {
            let formdata = new FormData();
            formdata.append("option", "countUser");
            axios.post("../controller/controller_counts_table.php", formdata)
                .then(function (response) {
                    console.log(response);
                    counts.countUsers = response.data;
                })
        },
        cargarCategorys: () => {
            let formdata = new FormData();
            formdata.append("option", "countCategorys");
            axios.post("../controller/controller_counts_table.php", formdata)
                .then(function (response) {
                    console.log(response);
                    counts.countCategory = response.data;
                })
        },
        cargarImagen: () =>{
            let formdata = new FormData();
            formdata.append("option", "countImage");
            axios.post("../controller/controller_counts_table.php", formdata)
                .then(function (response) {
                    console.log(response);
                    counts.countImages = response.data;
                })
        },
    }

});