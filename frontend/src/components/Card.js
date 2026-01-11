import { motion } from "framer-motion";

export default function Card({ carte }) {
  const { rang, couleur, visible } = carte;

  return (
    <motion.div
      className={`w-24 h-32 border rounded-lg flex items-center justify-center text-lg font-bold cursor-pointer
                  ${visible ? "bg-white" : "bg-gray-700 text-gray-700"}`}
      animate={{ rotateY: visible ? 0 : 180 }}
      transition={{ duration: 0.6 }}
    >
      {visible ? `${rang} de ${couleur}` : "🂠"}
    </motion.div>
  );
}
