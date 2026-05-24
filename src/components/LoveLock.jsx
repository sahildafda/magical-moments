import { useState } from "react";
import { motion } from "framer-motion";

const LoveLock = ({ correctCode, onUnlock }) => {
    const [code, setCode] = useState("");

    const handleNumber = (num) => {
        if (code.length >= 4) return;

        const newCode = code + num;
        setCode(newCode);

        if (newCode.length === 4) {
            setTimeout(() => {
                if (newCode === correctCode) {
                    onUnlock();
                } else {
                    alert("Wrong Love Code 💔");
                    setCode("");
                }
            }, 300);
        }
    };

    const handleDelete = () => {
        setCode(code.slice(0, -1));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl text-center max-w-md w-full"
            >
                <div className="text-6xl mb-4">🔒❤️</div>

                <h2 className="text-3xl font-bold text-white mb-2">
                    Enter Love Code
                </h2>

                <p className="text-white/80 mb-6">
                    A special code is required to unlock this surprise.
                </p>

                <div className="flex justify-center gap-3 mb-8">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`w-5 h-5 rounded-full border-2 border-white ${i < code.length ? "bg-white" : ""
                                }`}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleNumber(num.toString())}
                            className="w-16 h-16 mx-auto rounded-full bg-white/20 text-white text-xl font-bold hover:bg-white/30 transition"
                        >
                            {num}
                        </button>
                    ))}

                    <div />

                    <button
                        onClick={() => handleNumber("0")}
                        className="w-16 h-16 mx-auto rounded-full bg-white/20 text-white text-xl font-bold hover:bg-white/30 transition"
                    >
                        0
                    </button>

                    <button
                        onClick={handleDelete}
                        className="w-16 h-16 mx-auto rounded-full bg-red-500 text-white text-xl"
                    >
                        ⌫
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default LoveLock;