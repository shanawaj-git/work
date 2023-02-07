import { useEffect, useState } from 'react';

function useScript(src) {
  if (!src) throw new Error('You must provide a src');

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let script = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        setLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, [src]);

  return loaded;
}

export default useScript;
