import { redirect } from "next/navigation";

/** Legacy route — admin attendance lives under the corporate portal. */
export default function AdminShiftsRedirect() {
    redirect("/personal/admin/attendance");
}
