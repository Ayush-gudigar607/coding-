interface Book{
    readonly title:string;
    author:string;
    pages:number;
}

const book:Book={
    title:"TypeScript Basics",
    author:"Jane Smith",
    pages:250
};

// book.title="Advanced TypeScript"; // Error: Cannot assign to 'title' because it is a read-only property