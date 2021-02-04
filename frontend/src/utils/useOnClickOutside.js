import React, {useEffect} from 'react'

export default function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                // ref 요소를 클릭하면 암것도 안함
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            }
        }, [ref, handler]
    )
}