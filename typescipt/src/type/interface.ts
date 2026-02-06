type Order={
    type:string,price:number
}
type DineInOrder=
{
    type:string,
    price:number,
    table:number,
}


function makechai(order:Order){
    return `Order for ${order.type} with price ${order.price} is placed`
}

function serverchai(order:DineInOrder){
    return `Order for ${order.type} with price ${order.price} is placed on table ${order.table}`
}
console.log(makechai({type:"chai",price:50}))
console.log(serverchai({type:"chai",price:50,table:5}))

class chai implements Order{
    type="chai";
    price=50;
}



