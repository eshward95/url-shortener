import { useState } from "react";
import { useListContext } from "../context/ListContext";
import { createShortUrl } from "../services/api.service";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const InputSection = () => {
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(false);
  const { addUrl, setExistingUrl } = useListContext();
  const { toast } = useToast();

  const createShortUrls = async () => {
    setExistingUrl("");
    setLoading(true);
    setInput("");
    try {
      const data = await createShortUrl(input);
      if (data.existing) {
        toast({
          duration: 500,
          variant: "info",
          title: (
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="first-letter:capitalize">
                URL already exists
              </span>
            </div>
          ),
        });
        setExistingUrl(data.long_url);
      } else {
        toast({
          duration: 500,
          variant: "success",
          title: (
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-circle-check"></i>
              <span className="first-letter:capitalize">
                Successfully created URL
              </span>
            </div>
          ),
        });
        addUrl(data);
      }
    } catch (error) {
      toast({
        duration: 500,
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="first-letter:capitalize">
              Error while creating short URL
            </span>
          </div>
        ),
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const checkUrl = (urlString) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );
    return pattern.test(urlString);
  };
  return (
    <>
      <div className="flex items-center space-x-2 self-stretch justify-center">
        <Input
          type="email"
          placeholder="Enter URL"
          onChange={(e) => setInput(e.target.value)}
          className="max-w-[500px] outline-none bg-none focus-visible:ring-1 focus-visible:border-none focus-visible:ring-[#144EE3]/90"
          value={input}
        />
        <Button
          type="submit"
          variant="default"
          onClick={() => createShortUrls(input)}
          className="bg-[#144EE3] rounded-md h-10 border-0 hover:bg-[#144EE3]/90 text-white max-w-[25%] min-w-[120px]"
          disabled={!input}
        >
          {loading ? <Loader /> : "Shorten"}
        </Button>
      </div>
      {/* { <p className="text-sm text-muted-foreground">Enter URL.</p>} */}
    </>
  );
};

export default InputSection;
