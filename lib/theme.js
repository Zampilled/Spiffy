
import {mode} from '@chakra-ui/theme-tools'
import {extendTheme} from "@chakra-ui/react";

const styles = {
    global: props => ({
        body: {
            bg: mode("#F9EAE1","#242038")(props),
        }
    })
}


const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}



const theme = extendTheme({styles,config})
export default theme