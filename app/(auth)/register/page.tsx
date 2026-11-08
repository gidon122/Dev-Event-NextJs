import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex w-full justify-center">
      <SignUp
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "border border-line bg-surface/90 shadow-2xl backdrop-blur-xl text-foreground",
            headerTitle: "text-foreground text-xl font-bold",
            headerSubtitle: "text-muted-foreground text-xs",
            socialButtonsBlockButton:
              "border-line bg-surface-raised text-foreground hover:bg-surface-hover",
            formButtonPrimary:
              "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs transition-colors",
            formFieldInput:
              "bg-background border-line-strong text-foreground text-xs focus:border-primary",
            formFieldLabel: "text-muted-foreground text-xs",
            footerActionLink: "text-primary hover:underline",
            identityPreviewText: "text-foreground",
            dividerLine: "bg-line",
            dividerText: "text-muted-foreground text-xs",
          },
        }}
      />
    </div>
  );
}
