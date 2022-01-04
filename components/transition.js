import { motion } from 'framer-motion'

const variants = {
  hidden: { x: 0, y: 20, opacity: 0 },
  enter: { x: 0, y: 0, opacity: 1 },
  exit: { x: 0, y: 20, opacity: 0 }
}

export default function Transition({ children }) {
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className=""
    >
      {children}
    </motion.main>
  )
}
