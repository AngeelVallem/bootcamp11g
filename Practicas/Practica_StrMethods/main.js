/*
    Usando la frase "La mejor forma de predecir el futuro es creándolo" lograr los siguientes resultados:
    1.- Mostrar la misma frase en snake_case
    2.- Mostrar la misma frase en kebab-case
    3.- Mostrar la misma frase con todas las vocales en mayúscula
    4.- Mostrar los primeros 10 caracteres de la frase
    5.- Mostrar los últimos 10 caracteres de la frase 
*/



let phrase = 'la mejor forma de predecir el futuro es creándolo';

// SNAKE_CASE
console.log();

// KEBAB-CASE
console.log(phrase.replace(/ /g,'-'));

// VOCALES EN MAYUSCULA
console.log(phrase.replace(/[a,á,e,é,i,í,o,ó,u,ú]/g,(str) => str.toUpperCase()));

// PRIMEROS 10 CARACTERES DE LA FRASE
console.log(phrase.substr(0,10));

// ULTIMOS 10 CARACTERES DE LA FRASE
console.log(phrase.substr(-10))











