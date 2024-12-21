import React, { useEffect, useState } from "react";

function useIntersectionObserver(options = {}) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
            ...options,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsVisible(entry.isIntersecting);
            });
        }, observerOptions);

        const element = document.querySelector("video");

        if (element) observer.observe(element);

        // Cleanup on unmount
        return () => {
            observer.disconnect();
        };
    }, [options]);

    return isVisible;
}

export default useIntersectionObserver;
