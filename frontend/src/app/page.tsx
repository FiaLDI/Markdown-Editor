import { Sidebar } from "@/widgets/Sidebar";
import { ActiveTabs } from "@/widgets/ActiveTabs/ui/ActiveTabs";
import { EditorPanel } from "@/widgets/EditorPanel";
import { Notification } from "@/widgets/Notification";

export default function Page() {

  return (
    <main className="flex h-screen text-white">
      <Sidebar />
      <section className="flex-1 flex flex-col">
        <ActiveTabs />
        <EditorPanel />
      </section>
      <Notification />
    </main>
  );
}
