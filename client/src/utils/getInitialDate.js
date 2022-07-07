//import React from "react";

export const getInitialDate = () => {
    
    const today = new Date()
    let day = today.toDateString().slice(0,3), 
        date = today.getDate(), 
        month = today.getMonth(), 
        year = today.getFullYear()

    switch (day) {
        case "Sun":
            day = "domingo"            
            break;
        case "Mon":
            day = "lunes"            
            break;
        case "Tue":
            day = "martes"            
            break;
        case "Wed":
            day = "miércoles"            
            break;
        case "Thu":
            day = "jueves"            
            break;
        case "Fri":
            day = "viernes"            
            break;
        default:
            day = "sábado"
            break;
    };

    switch (month) {
        case 0:
            month = "enero"            
            break;
        case 1:
            month = "febrero"            
            break;
        case 2:
            month = "marzo"            
            break;
        case 3:
            month = "abril"            
            break;
        case 4:
            month = "mayo"            
            break;
        case 5:
            month = "junio"            
            break;
        case 6:
            month = "julio"            
            break;
        case 7:
            month = "agosto"            
            break;
        case 8:
            month = "septiembre"            
            break;
        case 9:
            month = "octubre"            
            break;
        case 10:
            month = "noviembre"            
            break;
        default:
            month = "diciembre"
            break;
    };

    return `${day} ${date} de ${month} de ${year}`
};