import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface SavedChat {
  title: string;
  url: string;
}

const testSavedChats: SavedChat[] = [
  {
    title: "Test Chat 1",
    url: "/chat/1",
  },
  {
    title: "Test Chat 2",
    url: "/chat/2",
  },
];

// need to add a function to retrieve the saved chats from DynamoDB
const savedChats = [];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Agentic AI Assitant</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {testSavedChats.map((chat) => (
                <SidebarMenuItem key={chat.title}>
                  <SidebarMenuButton asChild>
                    <a href={chat.url}>{chat.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Sign Out...</SidebarFooter>
    </Sidebar>
  );
}
