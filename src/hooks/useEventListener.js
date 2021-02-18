import { useEffect, useRef } from "react";

const useEventListener = (event, callback, target) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = callback;
    target.addEventListener(event, callback);

    return () => target.removeEventListener(event, callback);
  }, [event, callback, target]);
};

export default useEventListener;
