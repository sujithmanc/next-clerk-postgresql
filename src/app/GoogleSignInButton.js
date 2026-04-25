"use client";

import { useSignIn } from "@clerk/nextjs";

export default function GoogleSignInButton() {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <button className="button-primary" onClick={signInWithGoogle}>
      Continue with Google
    </button>
  );
}