"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Account = () => {
    const router = useRouter()
    const { isLoading, user } = useUser()


    useEffect(() => {

        if (!isLoading && !user) {
            router.replace("/")
        }

    }, [user, isLoading, router])

    return (
        <div
            className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      "
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Account Settings
                    </h1>
                </div>
            </Header>
            <div className="mb-7 px-6">
                <div className="flex flex-col gap-y-4">
                    <p>You are currently on the
                        free plan.
                    </p>
                    <Button
                        disabled
                        className="w-[300px] bg-neutral-400"
                    >
                        Stripe Integration Pending
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Account;
