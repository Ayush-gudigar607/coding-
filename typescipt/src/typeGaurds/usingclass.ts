class car{
    drive(){
console.log(`hyy i am driving car`)
    }
}

class Bike{
    ride()
    {
console.log(`hyy i am riding bike`)
    }
}

function move(vehicle:car |Bike)
{
    if (vehicle instanceof car)
    {
        vehicle.drive()
    }

    else{
        vehicle.ride()
    }
}

move(new car())