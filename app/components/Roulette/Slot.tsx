import { motion } from "framer-motion";

interface Props {
  number: number;
}

export default function RouletteSlot(props: Props) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: [null, 2, 1], rotate: [null, 360], x: 0 }}
      initial={{ opacity: 0, x: -500 }}
      exit={{ opacity: 0, x: 500 }}
      transition={{ duration: 0.9, ease: "easeIn" }}
      className={[
        "w-20 h-20 flex justify-center items-center shrink-0 rounded-lg absolute",
        props.number == 0
          ? "bg-green-700"
          : props.number % 2 == 0
          ? "bg-red-700"
          : "bg-neutral-800",
      ]
        .join(" ")
        .trimEnd()}
    >
      <p className="font-bold text-xl">{props.number}</p>
    </motion.div>
  );
}
