var png_js = require('png-js');
var fs = require('fs');

var blue_images = [];


var zoomLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var XMAX = [1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143];
var YMAX = [1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143];


var zoomNum = 7;
var mapDir = "D:\\Workspace\\fasttrack\\public\\cloudmade\\images\\998\\256\\"
var filePath;
var objects = [];

var blues = [];
var tans = [];
var scanned = 0;
var openCount = 0;


for(xMap=0;xMap<=XMAX[zoomNum-1];xMap++){
    for(yMap=0;yMap<=YMAX[zoomNum-1];yMap++){
        
        filePath = mapDir + zoomNum + "\\" +  xMap + "\\" + yMap + ".png"
        
        /*
        var exists = fs.existsSync(filePath);
        if(exists == false){
            //console.log(filePath);
            break;
        }
        
        */
         
        newObject = {
            filePath:filePath,
            scanPixels:function(parent){
            
                png_js.decode(parent.filePath, function(pixels){
                    
                    
                    
                    var length = pixels.length;
                    //console.log("\nBuffer Length: " + length);
                    //console.log("Pixels: " + length/4);
                    
                    
                    var rAvg = 0;
                    var rCount = 0;
                    
                    var gAvg = 0;
                    var gCount = 0;
                    
                    var bAvg = 0;
                    var bCount = 0;
                    
                    
                    
                    //Loop thru pixels in file
                    for(var index=0;index<length;index+=4){
                        var rPix = pixels[index];
                        var gPix = pixels[index+1];
                        var bPix = pixels[index+2];
                        
                        rAvg+=rPix;
                        gAvg+=gPix;
                        bAvg+=bPix;
                        
                        rCount++;
                        gCount++;
                        bCount++;
                        
                        //console.log(rCount);
                        
                    }
                    
                    scanned++;
                    console.log(scanned);
                    
                    
                    
                    if(rCount != 65536 || gCount != 65536 || bCount!=65536){
                        console.log('Pixel Error: \n\trCount = ' + rCount + "\n\tgCount = " + gCount + "\n\tbCount = " + bCount );
                        
                    } else {
                    
                        rAvg = rAvg / rCount;
                        gAvg = gAvg / gCount;
                        bAvg = bAvg / bCount;
                        
                        //console.log("rAvg = " + rAvg);
                        //console.log("gAvg = " + gAvg);
                        //console.log("bAvg = " + bAvg);
                        
                        
                        
                        if(rAvg == 241 && gAvg == 229 && bAvg == 212){
                            //tan
                            tans.push(parent.filePath);
                        } else if(rAvg == 171 && gAvg == 188 && bAvg == 201){
                            //blue
                            blues.push(parent.filePath);
                        }
                        
                        var total = Math.pow(XMAX[zoomNum-1]+1, 2);
                        //console.log(total);
                        //console.log(scanned);
                        if(scanned == total){
                            console.log("Blues: " + blues.length);
                            console.log("Tans: " + tans.length);
                        }
                        
                      
                    }
                    
                    
                });
                
                
                
                
                
                
            }
        }
        
        
        
        
        objects.push(newObject);
   
    }
}



for(var index=0;index<objects.length;index++){
    objects[index].scanPixels(objects[index]);
}


    
