var prompt = require('prompt');
var prompt = require('prompt-sync')();

function getrandomarr(){
    var newarr = [];
    console.log("Please input the length of array");
    var arrlength = prompt(); 

    for(i = 0;i < arrlength;i++)
    {
        newarr[i] = Math.round((Math.random() * 10 ) + (Math.random() * 10 ))
    }
    console.log("The length of array is " + arrlength);
    console.log("The original array is ");
    console.log(newarr);
    return newarr;
}



//We cite codes partially from here.
function BouncyBubbleSort(){
    var newarr = getrandomarr();
    var temp;
    var swap = 0;
    var left = 0;
    var right = 0;

    for(var i=0;i<newarr.length-1;i++){
        
        if(i%2==0){
            for(var j=left;j<newarr.length-1-right;j++){
                if(newarr[j]>newarr[j+1]){
                    temp = newarr[j];
                    newarr[j] = newarr[j+1];
                    newarr[j+1] = temp;
                    swap++;
                    console.log("Array sort from left to right time " + right + 1 );
                    console.log(newarr);
                }
            }
            right++;

        }else{
            for(var j=newarr.length-1-right;j>left;j--){
                if(newarr[j]<newarr[j-1]){
                    temp = newarr[j];
                    newarr[j] = newarr[j-1];
                    newarr[j-1] = temp;
                    swap++;
                    console.log("Array sort from right to left time " + left + 1 );
                    console.log(newarr);
                }
            }
            left++;
        }
        
        if(swap==0){
            break;
        }else{
            swap = 0;
        }
    }
    console.log("The sortted array is : ");
    console.log(newarr);
    //Cite end.
    return newarr; 
}
    

BouncyBubbleSort();