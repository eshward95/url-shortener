/* eslint-disable react/prop-types */
import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { useListContext } from "../context/ListContext";
import { deleteShortUrl } from "../services/api.service";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useToast } from "./ui/use-toast";

const Item = ({ link }) => {
  const apiUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const { toast } = useToast();

  const { deleteUrl } = useListContext();
  const [loading, setLoading] = useState(false);
  // const
  const onDelete = async (data) => {
    try {
      setLoading(true);
      const response = await deleteShortUrl(data.shortUrl);
      deleteUrl(response);
      toast({
        duration: 1000,
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
        duration: 1000,
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
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    toast({
      duration: 1000,
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
  return (
    <TableRow id={`row-${link._id}`}>
      <TableCell className="font-medium">
        <span>{`${link.shortUrl}`}</span>
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
                <div className="truncate max-w-[650px]">{link.originalUrl}</div>

                <i
                  className="fa-regular fa-copy cursor-pointer"
                  onClick={() => copyToClipboard(link.originalUrl)}
                />
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
      <TableCell>
        {new Date(link.createdAt).toLocaleTimeString("en-us")}{" "}
        {new Date(link.createdAt).toLocaleDateString("en-GB", {
          // weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </TableCell>
      <TableCell className="cursor-pointer w-[14px]">
        {loading ? (
          <LucideLoader2 className="animate-spin text-gray-400" />
        ) : (
          <Button variant="ghost" size="sm" onClick={() => onDelete(link)}>
            <i className="fa-solid fa-trash text-red-600"></i>
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Item;
