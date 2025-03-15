import { useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";

import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ErrorToast: React.FC = () => {

    const error = useSelector((state: RootState) =>
        Object.values(state).find(slice => slice.error)?.error
    );

    useEffect(() => {
        if (error) {
            toast("Error occurred", {
                description: error,
                action: {
                    label: "GOT IT",
                    onClick: () => console.log(error.message),
                },
                icon: "",
                style: {
                    backgroundColor: "#92010a",
                    color: "#ffffff",
                    border: "1px solid #f5c6cb",
                },
            });
           ;        }
    }, [error]);

    return <Toaster />;
};

export default ErrorToast;