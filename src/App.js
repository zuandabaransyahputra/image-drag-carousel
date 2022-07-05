/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useLayoutEffect, useRef } from 'react';

function App() {
  const divRef = useRef(null);
  let isDown = false; //Ketika ditekan
  let startX = useRef();
  let scrollLeft = useRef();

  const mouseDown = useCallback(
    e => {
      isDown = true;
      startX = e.pageX - divRef.current.offsetLeft;
      scrollLeft = divRef.current.scrollLeft;
    },
    [isDown, startX, scrollLeft]
  );

  const mouseUp = useCallback(
    e => {
      isDown = false;
    },
    [isDown]
  );

  const mouseLeave = useCallback(
    e => {
      isDown = false;
    },
    [isDown]
  );

  const mouseMove = useCallback(
    e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - divRef.current.offsetLeft;
      const walk = (x - startX) * 3;
      divRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDown, startX, scrollLeft]
  );

  useLayoutEffect(() => {
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);

    return () => {
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    };
  }, [mouseDown, mouseLeave, mouseUp, mouseMove]);

  return (
    <>
      <h1 className="text-4xl text-purple-700 text-center my-10">
        Image Drag Carousel
      </h1>
      <div
        className="relative px-10 overflow-x-hidden flex space-x-8 w-full"
        ref={divRef}
      >
        {Array(10)
          .fill()
          .map((_, index) => (
            <img
              key={index}
              src="/images/mountain.jpg"
              alt="Mountain"
              className="w-[300px] h-[450px] rounded-lg cursor-pointer"
            />
          ))}
      </div>
    </>
  );
}

export default App;
