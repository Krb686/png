var png_js = require('png-js');

png_js.decode("test.png", function(pixels){
    console.log(pixels)
    
});