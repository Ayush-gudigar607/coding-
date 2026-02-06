const orders=['12','34','56'];
let currentorder:string |undefined = '';

for(const orderId of orders)
{
    if(orderId==='34')
    {
        currentorder=orderId;
        break;
    }
}
console.log(`Current order is ${currentorder}`);