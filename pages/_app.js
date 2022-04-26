import {SessionProvider} from 'next-auth/react';
import Chakra from '../components/chakra'
import {AnimatePresence} from "framer-motion";

if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
}

import { ChakraProvider } from '@chakra-ui/react'


export default function App({ Component, router, pageProps: {session, ...pageProps} }) {
  return(

        <Chakra cookies={pageProps.cookies}>

                <AnimatePresence>
                    <SessionProvider session={session}>
                        <Component {...pageProps} />
                    </SessionProvider>
                </AnimatePresence>

        </Chakra>

  )
}

