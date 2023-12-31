"use client";

import {
    useSessionContext,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

export default function AuthModal() {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { close, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            close();
        }
    }, [session, router, close]);

    const onChange = (open: Boolean) => {
        if (!open) {
            close();
        }
    };
    return (
        <Modal
            title="Welcome back!"
            description="Sign in to your account to continue."
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                theme="dark"
                magicLink
                providers={[]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e",
                            },
                        },
                    },
                }}
            />
        </Modal>
    );
}
