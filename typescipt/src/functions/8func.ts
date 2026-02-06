function filterEvenNumbers(numbers:number[],predicate:(n:number)=>boolean):number[]{
    return numbers.filter(predicate);
}

const evens=filterEvenNumbers([1,2,3,4,5,6],(n)=>n%2===0);
console.log(evens);
