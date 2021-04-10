import { useEffect, useState } from "react";
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform,
    AnimatePresence
} from "framer-motion";
import styled from 'styled-components';


const ProgressContainer = styled(motion.div)`
    position: fixed;
    top: 20px;
    left: 20px;
    width: 120px;
    height: 120px;
    color: white;
`;


export const ScrollingAnimation = () => {
    const [currentPrecent, setCurrentPercent] = useState(null)
    const [currentProgressColor, setCurrentProgressColor] = useState(null)
    const { scrollYProgress } = useViewportScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    useEffect(
        () =>
            yRange.onChange((v) => {
                setCurrentPercent(Math.trunc(yRange.current))
            }),
        [yRange]
    );

    useEffect(() => {
        setCurrentProgressColor(
            currentPrecent >= 90 ? "#CDFF00" :
                currentPrecent >= 45 ? "#31A9D5" :
                    currentPrecent >= 20 ? "#F2BD1D" :
                        "#FF3B77"
        )
    }, [currentPrecent])

    return (
        <ProgressContainer>
                <svg className="progress-icon" viewBox="0 0 60 60">
                    <motion.path
                        fill={currentPrecent === 100 ? "#CDFF00" : "none"}
                        strokeWidth="8"
                        stroke={currentProgressColor}
                        strokeDasharray="0 1"
                        d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                        style={{
                            pathLength,
                            rotate: 90,
                            translateX: 5,
                            translateY: 5,
                            opacity: pathLength,
                            scaleX: -1
                        }}
                    />
                </svg>
            <motion.div
                style={{
                    position: "-webkit-sticky",
                    position: "absolute",
                    top: "40px",
                    left: "40px",
                    width: "120px",
                    height: "120px",
                    opacity: pathLength,

                }}
            >
                {currentPrecent}
            </motion.div>
        </ProgressContainer>
    )
}
