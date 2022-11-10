import { useEffect } from "react";

export const useSiteTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Instagram`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};