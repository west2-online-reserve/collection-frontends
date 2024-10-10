type Shape=Circle|Square|Triangle
interface Circle{
    type: 'circle',
    radius: number
}
interface Square{
    type: 'square',
    length: number
}
interface Triangle{
    type:'triangle',
    length1:number,
    length2:number,
    length3:number,
}

let shape:Shape={
    type:"circle",
    radius: 10
}
const myShape={
    type:"triangle",
    length1:10,
    length2:10,
    length3:10
}
function isCircle(shape:any):shape is Circle{
    // 判断shape是否是一个对象
    if(typeof shape!=='object'){
        return false
    }
    // 判断对象是否具有type属性
    if(!shape.hasOwnProperty('type')){
        return false
    }
    // 判断type属性的值是否等于'circle'
    if(shape.type!=='circle'){
        return false
    }
    // 判断对象是否具有radius属性
    if(!shape.hasOwnProperty('radius')){
        return false
    }
    if(typeof shape.radius!=='number'){
        return false
    }
    return true
}
function isSquare(shape:any):shape is Square{
    if(typeof shape!=='object'){
        return false
    }
    if(!shape.hasOwnProperty('type')){
        return false
    }
    if(shape.type!=='square'){
        return false
    }
    if(!shape.hasOwnProperty('length')){
        return false
    }
    if(typeof shape.length!=='number'){
        return false
    }
    return true
}
function isTriangle(shape:any):shape is Triangle{
    if(typeof shape!=='object'){
        return false
    }
    if(!shape.hasOwnProperty('type')){
        return false
    }
    if(shape.type!=='triangle'){
        return false
    }
    if(!shape.hasOwnProperty('length1')){
        return false
    }
    if(!shape.hasOwnProperty('length2')){
        return false
    }
    if(!shape.hasOwnProperty('length3')){
        return false
    }
    if(typeof shape.length1!=='number'){
        return false
    }
    return true
}
function getArea(shape:Shape){
    if(isCircle(shape)){
        return Math.PI*shape.radius**2
    }else if(isSquare(shape)){
        return shape.length**2
    }else if (isTriangle(shape)) {
        const { length1, length2, length3 } = shape;
        const s = (length1 + length2 + length3) / 2;
        return Math.sqrt(s * (s - length1) * (s - length2) * (s - length3));
    }
}
function filterArray<T>(array: T[], filterFunc: (element: T) => boolean):T[]{
    let result: T[] = [];
    for (let element of array) {
        if (filterFunc(element)) {
            result.push(element);
        }
    }
    return result;
}

if(isCircle(myShape)|| isSquare(myShape) || isTriangle(myShape)){
    console.log(myShape);
    console.log(getArea(myShape));
}