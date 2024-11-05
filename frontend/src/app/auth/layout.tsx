import AppLogo from "@/ui/app-logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4 bg-gray-50 h-full">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div className="flex items-center p-6 h-full w-full">{children}</div>
      </div>
    </div>
  );
}
