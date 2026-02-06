type TeaRecipe=
{
    water:number;
    milk:number;
}

class MasalaChai implements TeaRecipe{
    water=100;
    milk=50;
}

interface Responce{
    ok:boolean;
}
class myRes implements Responce{
    ok: boolean=true;
}

type Teatype="masala" | "ginger" | "cardamom";
function ordercha(t:Teatype){
  console.log(`Order for ${t} chai placed`);
}


type Base={
    teaLeaves:number;
}
type Extra={
    masala:number;
}

type FullTeaReceipe=Base & Extra;

const cup:FullTeaReceipe={
    teaLeaves:10,
    masala:5
}

type config={
    readonly host:string;
    version:number;
}

const conf:config={
    host:"localhost",
    version:1.0
}
