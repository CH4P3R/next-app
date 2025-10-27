import SideBar from "@/components/global/SideBar";
export default function HomeLayout({ children }) {
  return (
    <main className="flex w-screen h-screen items-center justify-center bg-slate-100">
        <SideBar />
        {children}
    </main>
  );
}
