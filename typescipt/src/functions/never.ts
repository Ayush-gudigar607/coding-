function throwError(message:string):never{
    throw new Error(message);
}

throwError("This is a fatal error");