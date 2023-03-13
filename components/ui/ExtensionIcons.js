import React from 'react'
import { BsFillImageFill, BsTrashFill, BsStarFill, BsFillFileTextFill } from "react-icons/bs";

export const ExtensionIcons = ({extension}) => {
    
// const extensionesValidas = ['txt', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'JPEG'];

 switch(extension){

    case "txt":
    case "docx":
    case "pdf": 
        return <BsFillFileTextFill />  

    case "jpg":
    case "jpeg": 
    case "png":
    case "JPEG": 
        return <BsFillImageFill />


    default: 
        return null
 }

}

export default ExtensionIcons
