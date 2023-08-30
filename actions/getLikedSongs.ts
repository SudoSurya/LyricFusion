
import { Song } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log(sessionError)
        return []
    }

    const { data, error } = await supabase
        .from('liked_songs')
        .select('*,songs(*)')
        .eq('user_id', sessionData?.session?.user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
        return []
    }
    if (!data) return []

    return data.map((item) => ({
        ...item.songs
    }))
}
