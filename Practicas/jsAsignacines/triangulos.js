let l1 = prompt("Introduce el primer lado")
let l2 = prompt("Introduce el segundo lado")
let l3 = prompt("Introduce el tercero lado")

if(l1 == l2 && l2 == l3 && l1 == l3){
    alert('El triangulo es un equilatero')
}else if(l1 != l2 && l2 != l3 && l1 != l3){
    alert('El triangulo es un escaleno')
}else{
    alert('El triangulo es un isosceles')
}
