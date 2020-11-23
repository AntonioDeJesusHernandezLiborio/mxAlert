document.getElementById("file").onchange = function (e) {
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();

    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);

    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function () {
        let preview = document.getElementById('preview'),
            image = document.createElement('img');

        image.src = reader.result;
        image.width = 150;
        image.height = 150;

        preview.innerHTML = '';
        preview.append(image);
    };
}