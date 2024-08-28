import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onActivate: () => void;
};

export default function Component({ onActivate }: Props) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const holdDuration = 2000; // 2 seconds to fully activate
  const progressInterval = 50; // Update progress every 50ms

  const startHolding = () => {
    setIsHolding(true);
    setProgress(0);

    holdTimeoutRef.current = setTimeout(() => {
      setIsActivated(true);
    }, holdDuration);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress =
          prevProgress + (progressInterval / holdDuration) * 100;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, progressInterval);
  };

  const stopHolding = () => {
    setIsHolding(false);
    setProgress(0);
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isActivated) {
      // Perform action when button is fully activated
      onActivate();
      setIsActivated(false);
    }
  }, [isActivated]);

  return (
    <div className="">
      <div className="relative w-64">
        <Button
          className="w-full h-16 text-lg font-semibold transition-colors duration-200"
          onMouseDown={startHolding}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          onTouchStart={startHolding}
          onTouchEnd={stopHolding}
        >
          Hold to Activate
        </Button>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-900 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">
        {isHolding ? "Engraving..." : "Press and hold to engrave"}
      </p>
    </div>
  );
}
