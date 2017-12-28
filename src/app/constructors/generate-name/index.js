const generateName = () => {    
    const names = [
      'Odin', 
      'Thor',
      'Sniffles',
      'Kitopants' 
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  module.exports = generateName;
  