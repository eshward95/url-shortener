import { useEffect, useMemo } from "react";
import { useListContext } from "../context/ListContext";
import Item from "./Item";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

export function List() {
  const { list, existingUrl } = useListContext();

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
  const reversedList = useMemo(() => [...list].reverse(), [list]);

  return (
    <Table className="mt-4">
      <TableHeader>
        {/* <TableCaption></TableCaption> */}
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
        {reversedList.map((link, i) => (
          <Item key={i} link={link} />
        ))}
      </TableBody>
    </Table>
  );
}
