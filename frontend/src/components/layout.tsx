import Sidebar from "./sidebar";
import Dashboard from "./dashboard";


export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-slate-50 overflow-y-auto">
        <Dashboard/>
      </main>
    </div>
  );
}
