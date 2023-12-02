import Countdown, { CountdownRendererFn } from "react-countdown";
import { motion } from "framer-motion";

interface Props {
  endDate: number;
}

export default function CooldownTimer(props: Props) {
  const renderer: CountdownRendererFn = ({ total }) => {
    return (
      <span className="font-bold text-2xl flex">
        <p>{total / 1000}s</p>
      </span>
    );
  };

  return (
    <div className="flex items-center">
      <Countdown
        date={props.endDate}
        renderer={renderer}
        intervalDelay={100}
        precision={1}
      />
    </div>
  );
}
