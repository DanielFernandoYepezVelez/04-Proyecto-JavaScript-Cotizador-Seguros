/* Accediendo Al DOM */
const selectMarcas = document.querySelector('#marca');
const selectAnios = document.getElementById('anio');
// const radioButtonTipo = document.querySelector('input[name="tipo"]:checked').value;
const formulario = document.querySelector('#cotizar-seguro');
const resultadoFinal = document.getElementById('resultado');

/* Eventos Del Usuario Y Del Sistema */
eventosUsuario();

function eventosUsuario() {
    formulario.addEventListener('submit', obtenerDatosFormulario);
}

/* En Esta Clase Van Los Datos Capturados Por El Sistema */
class Seguro {
    constructor(marca, anio, tipoSeguro) {
        this.marca = marca;
        this.anio = anio;
        this.tipoSeguro = tipoSeguro;
    }

    /* Metodo De La Clase Seguro */
    cotizarSeguro() {

        /* Dependiendo De La Marca Se Le Asigna Un Pago De Seguro */
        let cantidad;
        const base = 2000;

        switch (Number(this.marca)) {
            case 1:
                cantidad = base * 1.15;
                break;

            case 2:
                cantidad = base * 1.05;
                break;

            case 3:
                cantidad = base * 1.35;
                break;

            default:
                confirm('No Existe La Marca Ingresada');
                break;
        }

        /* Años De Diferencia Para Aplicar Un Descuento A Dicho Seguro */
        const aniosDiferencia = new Date().getFullYear() - this.anio;
        const valorDescuento = (cantidad * 0.03) * aniosDiferencia; //Se Multiplica Por Los Años De Diferencia
        let precioFinal = cantidad - valorDescuento;

        /* Kit De Seguro A Seleccionar (Completo O Basico) */
        if (this.tipoSeguro === 'basico') {
            precioFinal *= 1.30;

        } else {
            precioFinal *= 1.50;
        }

        return precioFinal;
    }
}

/* Esta Clase Esta Relacionada A La Interfaz De Usuario */
class Interfaz {
    /* Método De La Clase Interfaz De Usuario */
    mostrarMensaje(mensaje, tipo) {

        const divUno = document.createElement('div');
        const divDos = document.createElement('div');
        const img = document.createElement('img');

        img.style.width = '150px';
        divDos.style.textAlign = 'center';

        img.src = './img/spinner.gif';
        divUno.innerHTML = `${mensaje}`;

        divDos.appendChild(img);

        if (tipo === 'error') {
            divUno.classList.add('error');
            formulario.insertAdjacentElement('beforebegin', divUno); //Primer Lugar por Fuera

        } else {
            divUno.classList.add('correcto');
            formulario.insertAdjacentElement('beforebegin', divDos); //Primer Lugar por Fuera
        }

        setTimeout(function() {
            divUno.remove();
            divDos.remove();
            formulario.insertAdjacentElement('beforebegin', divUno); //Primer Lugar por Fuera

            setTimeout(() => {
                divUno.remove();
            }, 2500);

        }, 2000);
    }

    /* Método Para Mostrar El Resultado Final */
    mostrarResultado(seguro, total) {
        let marcaAuto;

        switch (seguro.marca) {
            case '1':
                marcaAuto = 'Americano';
                break;

            case '2':
                marcaAuto = 'Asiatico';
                break;

            case '3':
                marcaAuto = 'Europeo';
                break;

            default:
                confirm('No Existe La Marca Ingresada');
                break;
        }

        const div = document.createElement('div');
        const resumen = document.createElement('p');
        const marca = document.createElement('p');
        const anio = document.createElement('p');
        const tipoSeguro = document.createElement('p');
        const precio = document.createElement('p');

        resumen.classList.add('header');

        resumen.innerHTML = 'Tu Cotización';
        marca.innerHTML = `Marca: ${marcaAuto}`;
        anio.innerHTML = `Año: ${seguro.anio}`;
        tipoSeguro.innerHTML = `Tipo De Seguro: ${seguro.tipoSeguro}`;
        precio.innerHTML = `Precio: ${total}`;

        setTimeout(function() {
            div.appendChild(resumen);
            div.appendChild(marca);
            div.appendChild(anio);
            div.appendChild(tipoSeguro);
            div.appendChild(precio);
            resultadoFinal.appendChild(div);
        }, 2000);
    }
}

/* Funcionalidad Para Obtener Los Datos Leidos En El Formulario */
function obtenerDatosFormulario(e) {
    e.preventDefault();

    /* IMPORTANTE */
    /* De Esta Forma Se Leen Los Selects En JS */
    const marcaSeleccionada = selectMarcas.options[selectMarcas.selectedIndex].value;

    /* IMPORTANTE */
    /* De Esta Forma Se Leen Los Selects En JS */
    const anioSeleccionado = selectAnios.options[selectAnios.selectedIndex].value;

    /* IMPORTANTE */
    /* De Esta Forma Se Leen Los Radio Buttons En JS */
    const seguroSeleccionado = document.querySelector('input[name="tipo"]:checked').value;

    /* Creamos Una Instancia U Objeto De Interfaz Y De Seguro */
    const interfaz = new Interfaz();
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, seguroSeleccionado);

    /* Validando Que Los Campos Del Formulario No Esten Vacios */
    if (marcaSeleccionada !== '' && anioSeleccionado !== '' && seguroSeleccionado !== '') {

        interfaz.mostrarMensaje('Cotización Exitosa', 'correcto');
        const cantidad = seguro.cotizarSeguro();
        interfaz.mostrarResultado(seguro, cantidad);

        /* Limpiar Contenedor Del Contenido */
        const limpiarContenedor = document.querySelector('#resultado div');
        if (limpiarContenedor != null) {
            limpiarContenedor.remove();
        }

    } else {
        interfaz.mostrarMensaje('Faltan Datos En El Formulario', 'error');
    }
}

/* Mostrar Los Años Desde JavaScript */
const anioActual = new Date().getFullYear();
const anioMinimo = anioActual - 20;

for (let index = anioActual; index >= anioMinimo; index--) {

    const optionAnio = document.createElement('option');
    optionAnio.value = index;
    optionAnio.innerHTML = index;
    selectAnios.appendChild(optionAnio);
}