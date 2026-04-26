"use client";

import { useSignIn } from "@clerk/nextjs";

export default function GoogleSignInButton() {
  const { signIn, isLoaded } = useSignIn();
  console.info("GoogleSignInButton rendered, isLoaded:", isLoaded);
  console.info("signIn object:", signIn);

  if (!isLoaded) return null;

  const signInWithGoogle = async () => {
    if (!signIn) {
      console.error("signIn not available");
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <button className="button-primary" onClick={signInWithGoogle}>
      Continue with Google
    </button>
  );
}