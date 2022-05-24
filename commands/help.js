function help() {
    console.log(`
       These are some myCLI commands used in various situation:
       
             1. node main.js tree <path>
             2. node main.js organize <path>
             3. node main.js help
    `);
}

module.exports= {
    help:help,
}