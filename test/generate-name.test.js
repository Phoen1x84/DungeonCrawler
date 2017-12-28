const generateName = require('./../src/app/constructors/generate-name/index.js');

test('should return a name', ()=> {    
    // example of names in the generateName function
    const nameArr = ['Odin', 'Thor', 'Sniffles', 'Kitopants'];
    const name = generateName();    
    expect(nameArr).toContain(name);
});
