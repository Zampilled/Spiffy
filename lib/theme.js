
import {mode} from '@chakra-ui/theme-tools'
import {extendTheme} from "@chakra-ui/react";

const styles = {
    global: props => ({
        body: {
            bg: mode("WHITE","black",)(props),
        }
    })
}


const fonts =  {
    heading: "`Montserrat`",

}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}



const theme = extendTheme({fonts,styles,config})
export default theme