import { useEffect, useState } from "react";

function useResizeWindow() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Cambia el breakpoint según necesites
	const [isResizing, setIsResizing] = useState(false);

	useEffect(() => {
		let resizeTimeout;

		// TODO: Mover el debound a otro archivo
		const handleResize = () => {
			setIsResizing(true); // Indica que se está redimensionando

			// Espera 500ms después del último evento para considerar que terminó
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				setIsResizing(false); // Indica que el usuario dejó de redimensionar
				setIsMobile(window.innerWidth < 768);
			}, 500);
		};

		const desktopMediaQuery = window.matchMedia("(min-width: 768px)");

		desktopMediaQuery.addEventListener("change", handleResize);

		return () => {
			desktopMediaQuery.addEventListener("change", handleResize);
			<h2>Acortador de URL</h2>;
		};
	}, []);

	return { isMobile, isResizing };
}

export default useResizeWindow;
