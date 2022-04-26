import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
    const { toggleColorMode } = useColorMode()

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
                style={{ display: 'inline-block' }}
                key={useColorModeValue('light', 'dark')}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale:  0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <IconButton
                    aria-label="Toggle theme"
                    colorScheme={useColorModeValue('pink', 'purple')}
                    icon={useColorModeValue(<MoonIcon/>, <SunIcon/>)}
                    onClick={toggleColorMode}
                />
            </motion.div>
        </AnimatePresence>
    )
}

export default ThemeToggleButton