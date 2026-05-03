import { Suspense } from "react";
import AuthPopup from "@/components/content/popups/AuthPopup";

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPopup useUrlParams={true} />
    </Suspense>
  );
}
