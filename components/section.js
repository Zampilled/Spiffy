import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return shouldForwardProp(prop) || prop === 'transition'
    },

})

const Section = ({ children, delay = 0}) => (
    <StyledDiv whileHover={{
        scale:1.05,
        transition: { duration: 0.2 },
    }}
    >
        <StyledDiv
            initial={{ y:15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit = {{y:15, opacity:0}}
            transition={{duration: 0.8, delay }}
        >
            {children}
        </StyledDiv>
    </StyledDiv>
)
export default Section