export const ADD=(item)=>{
    console.log("Add"+item)
    return{
        type: "ADD_CART",
        payload: item
    }
}

export const DLT=(id)=>{
return{
   type: "RMV_CART",
     payload: id
}
}

export const REMOVE=(item)=>{
    return{
        type:"RMV_ONE",
        payload:item
    }
}
