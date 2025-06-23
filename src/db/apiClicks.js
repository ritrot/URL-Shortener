import { data } from "react-router-dom";
import supabase from "./supabase";

export async function getClicks(urlIds){
    let {data , error} = await supabase.from("clicks").select("*").eq("url_id" , urlIds);
    if(error){
        console.error(error.message)
        throw new Error("Unable to load the clicks");
    }
    return data;
}