/* Calculadora de días habiles entre dos fechas para Mexico 2023 
   Es necesario ingresar las fechas en el formato mm-dd-yyyy para evitar errores al momento de convertir la información introducida por el prompt
*/


//Los siguientes arrays podrian evitarse, pero por comodidad se utilizan 
//Meses del año
let meses =  [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
];

//Dias de asueto en México 2023
let dias_asueto =  [
    "2023-1-1","2023-2-6","2023-3-20",
    "2023-5-1","2023-9-16","2023-11-20",
    "2023-12-25"
];


// Está funcion convierte una variable tipo fecha en una representacion de la fecha en cadena
function fecha_texto(date) {
    let dia = date.getDate();
    let mesIndex = date.getMonth();
    let year = date.getFullYear();

    return resultado = dia + ' ' + meses[mesIndex] + ' ' + year;
}

function dias_habiles(fecha_inicial,fecha_final){
    /*
    Los dias habiles entre dos fechas se pueden calcular al contar los días entresemana en el intervalo de tiempo
    menos los dias de asueto que no son ni sabado ni domingo en el intervalo de tiempo.
    Esta función solo es valida para México con fechas del 2023, debido a que solo se cuentan con los días de asueto de este pais
    en este intervalo de tiempo
    */

    //Validamos que la fecha inicial no sea mayor que la fecha final
    if (fecha_inicial > fecha_final){
        return 'La fecha inicial es mayor que la fecha final, no es posible calcular los dias habiles';
    }
    
    let entre_semana = 0;
    let loop = new Date(fecha_inicial);
        //Calculamos los días entre semana 
    while(loop <= fecha_final){
        //Los días 6 y 0 corresponde al sabado y domingo respectivamente, por lo cual los descartamos
       if (loop.getDay() != 6 && loop.getDay() !=0){
          entre_semana = entre_semana + 1;
       }

    //Obtenemos la fecha siguiente
    let fecha_aux = loop.setDate(loop.getDate() + 1);
    loop = new Date(fecha_aux);
    }
    
    let asueto = 0;
    //Calculamos los días de asueto
    for (var i = 0; i < dias_asueto.length; i++) {
        let asueto_dia = new Date(dias_asueto[i]);
        // Se valida si algun día de asueto se encuentra entre la fecha inicia y final
        if (asueto_dia >= fecha_inicial && asueto_dia <= fecha_final) {
                 // Solo se toman en cuenta los días de asueto que no son sabado ni domingo debido a que fueron descartados anteriormente
                 if (asueto_dia.getDay() != 6 && asueto_dia.getDay() != 0) {
                     asueto = asueto + 1;
                 }
        }
    }

    return entre_semana - asueto ;
}


//Obtenemos la fecha inicial
let fecha_inicial =  new Date(prompt('Ingrese la fecha inicial'));
console.log("La fecha inicial introducida es: " + fecha_texto(fecha_inicial));


//Obtenemos la fecha final
let fecha_final =  new Date(prompt('Ingrese la fecha final'));
console.log("La fecha final introducida es: " + fecha_texto(fecha_final));

//Resultado
console.log("El numero de días habiles entre estas dos fechas es: " + dias_habiles(fecha_inicial,fecha_final));

