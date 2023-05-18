import { signIn } from "next-auth/react";
import { useEffect } from "react";

export const SignIn = ({ token }: { token: string }) => {
  useEffect(() => {
    if (token) {
      signIn("token", {
        token: token,
        callbackUrl: `app.${window.location.host}/`,
      });
    }
  }, [token]);

  return <></>;
};