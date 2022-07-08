/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useLayoutEffect, useRef } from 'react';

function App() {
  const divRef = useRef(null);
  const imageRef = useRef(null)
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
      console.log(divRef.current.scrollLeft)
    },
    [isDown, startX, scrollLeft]
  );

  const touchEnd = useCallback(e => {
    isDown = false;
  },
    [isDown])

  const touchStart = useCallback(e => {
    isDown = true;
    startX = e.touches[0].pageX - divRef.current.offsetLeft;
    scrollLeft = divRef.current.scrollLeft;
  },
    [isDown, startX, scrollLeft])

  const touchMove = useCallback(e => {
    if (!isDown) return;
    const x = e.touches[0].pageX - divRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    divRef.current.scrollLeft = scrollLeft - walk;
  },
    [isDown, startX, scrollLeft])

  useLayoutEffect(() => {
    divRef.current.addEventListener('mousedown', mouseDown);
    divRef.current.addEventListener('mouseleave', mouseLeave);
    divRef.current.addEventListener('mouseup', mouseUp);
    divRef.current.addEventListener('mousemove', mouseMove);
    divRef.current.addEventListener('touchstart', touchStart);
    divRef.current.addEventListener('touchend', touchEnd);
    divRef.current.addEventListener('touchmove', touchMove);

    return () => {
      divRef.current.removeEventListener('mousedown', mouseDown);
      divRef.current.removeEventListener('mouseleave', mouseLeave);
      divRef.current.removeEventListener('mouseup', mouseUp);
      divRef.current.removeEventListener('mousemove', mouseMove);
      divRef.current.removeEventListener('touchstart', touchStart);
      divRef.current.removeEventListener('touchend', touchEnd);
      divRef.current.removeEventListener('touchmove', touchMove);
    };
  }, [mouseDown, mouseLeave, mouseUp, mouseMove, touchStart,
    touchEnd,
    touchMove]);

  return (
    <>
      <h1 className="text-3xl lg:text-4xl text-purple-700 text-center my-10">
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
              ref={imageRef}
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
