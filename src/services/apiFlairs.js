import toast from "react-hot-toast";
import supabase from "./supabase";

// Get a specific single Post record given a Post ID
export async function getFlairs() {
    const { data: flairs, error } = await supabase
        .from('flairs')
        .select(`*`)

    if (error) {
        toast.error(error.message);
        throw new Error(error);
    }

    return flairs;
}