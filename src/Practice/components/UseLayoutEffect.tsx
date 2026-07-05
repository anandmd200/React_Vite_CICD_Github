import React, { useRef, useLayoutEffect } from "react";

function UseLayoutEffect() {
  const boxRef: any = useRef(null);

  useLayoutEffect(() => {
    boxRef.current.style.width = "300px";
    console.log("useLayoutEffect executed");
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: "100px",
        height: "100px",
        background: "skyblue",
      }}
    >
      Box
    </div>
  );
}

export default UseLayoutEffect;
