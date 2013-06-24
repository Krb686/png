var png_js = require('png-js');

png_js.decode("C:\\workspace\\cloudmade\\images\\998\\256\\1\\0\\0.png", function(pixels){
    console.log(pixels);
    
    slice = pixels.slice[0, 4];
    console.log(pixels[0]);
    console.log(pixels[1]);
    console.log(pixels[2]);
    console.log(pixels[3]);
});