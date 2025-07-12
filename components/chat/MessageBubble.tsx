import { Message } from "@/types/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {
//   oneDark,
//   oneLight,
// } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { formatDistanceToNow } from "date-fns";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { toast } = useToast();
  const { theme } = useTheme();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Message content has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`flex gap-4 p-4 ${
        message.role === "assistant" ? "bg-muted/30" : ""
      }`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback
          className={
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }
        >
          {message.role === "user" ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">
            {message.role === "user" ? "You" : message.model || "Assistant"}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "";
                const isInline = !match;

                if (!isInline && match) {
                  return (
                    <div className="relative">
                      {/* <SyntaxHighlighter
                        style={theme === "dark" ? oneDark : oneLight}
                        language={language}
                        PreTag="div"
                        className="rounded-md"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => copyToClipboard(String(children))}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                }

                return (
                  <code
                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(message.content)}
            className="h-7 px-2 text-xs"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}
