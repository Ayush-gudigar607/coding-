let subs:number | string=Math.random()>0.5 ? 123 : "TypeScript";

let apiErrorStatus:'pending' | 'success' | 'failed'='pending';
let airseat:'aisle' | 'window' | 'middle'='middle'
console.log(`Subscription cost is ${subs}`);
console.log(`API status is ${apiErrorStatus}`);