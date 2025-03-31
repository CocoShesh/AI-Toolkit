import { useEffect } from "react";

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }, []);
};

export default useScrollToTop;
