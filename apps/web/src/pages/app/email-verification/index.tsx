import Seo from "@/components/SEO";
import { SignIn } from "@/components/SignInToken";
import { useSearchParams } from "next/navigation";

export default function PasswordResetSent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    return (
        <>
            <Seo title="Email Verification" siteName="Germla Auth" />
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-sm p-3.5 border rounded-lg shadow sm:p-5 bg-white border-slate-200">
                    {searchParams && token ? (
                        <>
                            <h1 className="mb-3 mt-0 !text-3xl text-center font-primary font-semibold text-gray-900 md:text-xl">
                                Verifying...
                            </h1>
                            <SignIn token={token} />
                        </>
                    ) : (
                        <p className="text-center">No token provided</p>
                    )}
                </div>
            </div>
        </>
    );
}
