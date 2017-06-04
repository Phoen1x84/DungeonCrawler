// name generator
var generateName = function() {
    var names = [
        'Odin',
        'Thor',
        'Sniffles',
        'Kitopants'
    ];
    return names[Math.floor(Math.random() * names.length)];
};
