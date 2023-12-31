"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
interface LibaryProps {
    songs: Song[];
}
const Libary: React.FC<LibaryProps> = ({ songs }) => {

    const onPlay = useOnPlay(songs);
    const authModal = useAuthModal();
    const uploadModal = useUploadModal()
    const { user, subscription } = useUser();
    const onClick = () => {
        if (!user) {
            return authModal.open();
        }

        return uploadModal.open();
    };
    return (
        <div className="flex flex-col">
            <div
                className="
                items-center
                flex
                justify-between
                px-5
                pt-4
                "
            >
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">Your Libary</p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="
                    cursor-pointer
                    hover:text-white
                    transition
                    text-neutral-400
                    "
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((song) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={song.id}
                        data={song}
                    />
                ))}
            </div>
        </div>
    );
};

export default Libary;
