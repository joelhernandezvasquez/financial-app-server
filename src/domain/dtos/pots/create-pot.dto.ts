// export class CreatePotsDTO{
    
//     private constructor(
//         public readonly name:string,
//         public readonly available:boolean
//     ){}

//     static create(object:{[key:string]:any}):[string?,CreateCategoryDTO?]{
//         const {name,available=false} = object;
//         let availableBoolean = available;

//         if(!name) return ['Missing Name']
//         if(typeof available !=='boolean'){
//          availableBoolean = (available === 'true')
//         }

//         return[undefined,new CreateCategoryDTO(name,availableBoolean)];
//     }

// }