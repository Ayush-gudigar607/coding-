function getFirst<T>(arr:T[]){
    return arr[0];
}

console.log(getFirst([1,2,3,4]));
getFirst(["a","b","c"]);
getFirst([true,false,true]);