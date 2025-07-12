import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Download, Settings, Menu } from "lucide-react";
import { Model } from "@/types/chat";
import { useTheme } from "next-themes";

interface ChatHeaderProps {
  selectedModel: Model;
  models: Model[];
  onModelChange: (model: Model) => void;
  onExportChat: () => void;
  onToggleSidebar: () => void;
  currentTitle?: string;
}

export function ChatHeader({
  selectedModel,
  models,
  onModelChange,
  onExportChat,
  onToggleSidebar,
  currentTitle = "DeepSeek",
}: ChatHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                DS
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-lg">DeepSeek</h1>
              {currentTitle !== "DeepSeek" && (
                <p className="text-xs text-muted-foreground">{currentTitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={selectedModel.id}
            onValueChange={(value) => {
              const model = models.find((m) => m.id === value);
              if (model) onModelChange(model);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {model.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Light mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark mode
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExportChat}>
                <Download className="mr-2 h-4 w-4" />
                Export chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
