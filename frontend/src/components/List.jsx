import { Button } from "./ui/button";

import { useEffect } from "react";
import { useListContext } from "../context/ListContext";
import { deleteShortUrl } from "../services/api.service";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useToast } from "./ui/use-toast";

// const CheckIcon = window.RadixIcons.Check;

export function List() {
  const apiUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const { toast } = useToast();

  const { list, deleteUrl, existingUrl } = useListContext();
  const onDelete = async (data) => {
    try {
      const response = await deleteShortUrl(data.shortUrl);
      deleteUrl(response);
      toast({
        duration: 500,
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-circle-check"></i>
            <span className="first-letter:capitalize">
              Successfully deleted URL
            </span>
          </div>
        ),
      });
    } catch (error) {
      toast({
        duration: 500,
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="first-letter:capitalize">
              Error while deleting short URL
            </span>
          </div>
        ),
      });
    }
  };
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    toast({
      duration: 500,
      variant: "success",
      title: (
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-circle-check"></i>
          <span className="first-letter:capitalize">
            URL copied to clipboard
          </span>
        </div>
      ),
    });
  };
  useEffect(() => {
    if (existingUrl) {
      const matchingElement = list.find(
        (item) => item.originalUrl === existingUrl
      );
      if (matchingElement) {
        const elementId = `row-${matchingElement._id}`;
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" });

          element.classList.add(
            "bg-yellow-100",
            "dark:bg-yellow-500",
            "transition-all"
          );

          setTimeout(() => {
            element.classList.remove(
              "dark:bg-yellow-500",
              "transition-all",
              "bg-yellow-100"
            );
          }, 3000);
        }
      }
    }
  }, [existingUrl, list]);

  return (
    <Table className="mt-4">
      <TableCaption>A list of your recent URLs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg">Short Link</TableHead>
          <TableHead className="text-lg">Original Link</TableHead>
          <TableHead className="text-lg">Clicks</TableHead>
          {/* <TableHead>Status</TableHead> */}
          <TableHead className="text-lg">Date</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((link, i) => (
          <TableRow key={i} id={`row-${link._id}`}>
            <TableCell className="font-medium">
              <span>{`${apiUrl}/${link.shortUrl}`}</span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`${apiUrl}/${link.shortUrl}`)}
              >
                <i className="fa-regular fa-copy"></i>
              </Button>
            </TableCell>
            <TableCell>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    <div className="flex items-center gap-2">
                      <img
                        width={24}
                        height={24}
                        src={`https://www.google.com/s2/favicons?domain=${link.originalUrl}&sz=32`}
                        alt=""
                      />
                      <div className="truncate max-w-60">
                        {link.originalUrl}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(link.originalUrl)}
                      >
                        <i className="fa-regular fa-copy"></i>
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary-foreground text-secondary p-2">
                    {link.originalUrl}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>

            <TableCell>{link.hits}</TableCell>
            {/* <TableCell>{link.status}</TableCell> */}
            <TableCell>{new Date(link.createdAt).toUTCString()}</TableCell>
            <TableCell className="cursor-pointer w-[10px]">
              <Button variant="ghost" size="sm" onClick={() => onDelete(link)}>
                <i className="fa-solid fa-trash text-red-600"></i>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
