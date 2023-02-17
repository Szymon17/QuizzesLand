import { motion } from "framer-motion";
import "./Spiner.styles.css";

const Spiner = () => {
  return (
    <div className="center-block">
      <div className="spiner-container">
        <motion.div className="spiner" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
      </div>
    </div>
  );
};

export default Spiner;
