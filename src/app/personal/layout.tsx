import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { PortalAttendanceGuard } from "./components/PortalAttendanceGuard";
import { LateReasonModal } from "./components/LateReasonModal";

export const metadata = {
    title: {
        default: "Portal",
        template: "%s | Bihospharma S.A.S",
    },
};

export default async function PersonalLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <PortalAttendanceGuard />
            <LateReasonModal />
            {children}
        </SessionProvider>
    );
}
