import { ReactNode } from "react";
import { PortalAttendanceGuard } from "./components/PortalAttendanceGuard";
import { LateReasonModal } from "./components/LateReasonModal";
import { EarlyReasonModal } from "./components/EarlyReasonModal";

export const metadata = {
    title: {
        default: "Portal",
        template: "%s | Bihospharma S.A.S",
    },
};

export default function PersonalLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <PortalAttendanceGuard />
            <LateReasonModal />
            <EarlyReasonModal />
            {children}
        </>
    );
}
