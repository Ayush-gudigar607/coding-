class BankAccount{
    private balance:number=500;

    deposit(amount:number){
        if(amount>0)
        {
            console.log(`Initial Balance: ${this.balance}`);
            this.balance=this.balance+amount;
            console.log(`Deposited: ${amount}, New Balance: ${this.balance}`);
        }
    }

    getInfoBalance(){
        return this.balance;
    }

}

let myacc=new BankAccount();
myacc.deposit(5000);
console.log(`Current Balance: ${myacc.getInfoBalance()}`);