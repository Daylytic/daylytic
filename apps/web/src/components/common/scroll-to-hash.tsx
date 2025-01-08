import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollToHash: React.FC = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Remove the '#' from the hash to get the element's id
            const id = hash.replace('#', '');
            const targetElement = document.getElementById(id);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return null; // This component does not render anything
};