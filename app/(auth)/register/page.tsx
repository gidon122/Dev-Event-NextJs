import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex w-full justify-center">
      <SignUp
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "border border-white/10 bg-[#0d161a]/90 shadow-2xl backdrop-blur-xl text-white",
            headerTitle: "text-white text-xl font-bold",
            headerSubtitle: "text-slate-400 text-xs",
            socialButtonsBlockButton:
              "border-white/10 bg-white/5 text-white hover:bg-white/10",
            formButtonPrimary:
              "bg-[#59deca] text-black hover:bg-[#5dfeca] font-semibold text-xs transition-colors",
            formFieldInput:
              "bg-[#070b0e] border-[#182830] text-white text-xs focus:border-[#59deca]",
            formFieldLabel: "text-slate-300 text-xs",
            footerActionLink: "text-[#5dfeca] hover:underline",
            identityPreviewText: "text-white",
            dividerLine: "bg-white/10",
            dividerText: "text-slate-400 text-xs",
          },
        }}
      />
    </div>
  );
}
