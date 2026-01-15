import { motion } from "framer-motion";

export default function Card({ carte }) {
  const isRed = carte?.couleur === "♥" || carte?.couleur === "♦";

  return (
    <motion.div
      className="w-20 h-28 perspective"
      initial={false}
      animate={{ rotateY: carte?.visible ? 0 : 180 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full h-full preserve-3d">
        {/* Face cachée */}
        <div className="absolute w-full h-full backface-hidden bg-gray-700 rounded flex items-center justify-center text-white text-2xl">
          🂠
        </div>

        {/* Face visible */}
        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded border flex flex-col justify-between p-2 ${
            isRed ? "text-red-600" : "text-black"
          }`}
        >
          <span className="text-lg font-bold">{carte?.rang}</span>
          <span className="text-3xl text-center">{carte?.couleur}</span>
        </div>
      </div>
    </motion.div>
  );
}
