import Head from 'next/head'

import {
    Image,
    Box,
    Button,
    Container,
    Heading,
    Text,
    List,
    Table,
    TableContainer,
    Th,
    Tbody,
    Td,
    Thead,
    Tr,
    useColorModeValue,
    Flex,
    Spacer,
    SimpleGrid,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Link,
    Tabs,
    Spinner
} from "@chakra-ui/react";
import {useSession, signIn, signOut} from 'next-auth/react';
import {useState} from 'react';
import ThemeToggleButton from "../components/themetoggle";
import Section from "../components/section";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import {animationControls, motion} from "framer-motion";

export default function Home() {

    const {data: session} = useSession();
    const [list, setList] = useState([]);
    const [sdis,setSdis] = useState(false)
    const [mdis,setMdis] = useState(false)
    const [ldis, setLdis] = useState(false)
    const [loading, setLoading] = useState(false)

    const getMySongsShort = async () => {
        setList([])
        setLoading(true)
        setSdis(true)
        setMdis(false)
        setLdis(false)
        const res = await fetch('/api/shortsongs');
        const {items} = await res.json();
        setLoading(false)
        setList(items);
    };
    const getMySongsMed = async () => {
        setList([])
        setLoading(true)
        setSdis(false)
        setMdis(true)
        setLdis(false)
        const res = await fetch('/api/medsongs');
        const {items}=await res.json();
        setLoading(false)
        setList(items);
    };
    const getMySongsLong = async () => {
        setList([])
        setLoading(true)
        setSdis(false)
        setMdis(false)
        setLdis(true)
        const res = await fetch('/api/longsongs');
        const {items} = await res.json();
        setLoading(false)
        setList(items);
    };
    const color = useColorModeValue('#black', '#white')
    console.log(list)
    if (session) {
        return (

            <Container align="center" mt={2}>
                <Box align="center" borderWidth={"5px"} borderColor={color} borderRadius={"lg"} mb={"2"}>

                    <Heading as="h1" mt={0} textAlign="center" size={"4xl"} color={color}>SPIFFY</Heading>
                    <Text mt={1} fontSize={"lg"}>Top Songs On Demand</Text>
                    <Box alignContent="center" mt={6} mb={"2"}>
                        <ThemeToggleButton/>
                        <Button variant={"outline"} ml={2} color={color} onClick={() => signOut()}>Sign out</Button>
                    </Box>
                    <Text color={color} fontSize={"2xl"}>Select Length of Time:</Text>
                    <Box align={"center"}>
                    <Button mt={2} mb={2} align={"center"} isDisabled={sdis} bgColor={color} onClick={() => getMySongsShort()}>2 Month</Button>
                    <Button mt={2} mb={2} m={2} align={"center"} isDisabled={mdis} bgColor={color} onClick={() => getMySongsMed()}>6 Month</Button>
                    <Button mt={2} mb={2} align={"center"} isDisabled={ldis} bgColor={color} onClick={() => getMySongsLong()}>All Time</Button>
                    </Box>
                </Box>
                <Box>
                    {loading? <Box mt={4} align={"center"}><Spinner size={"xl"} /></Box>:
                    <Accordion allowToggle >
                    {list.map((item, index) =>(

                        // eslint-disable-next-line react/jsx-key
                        <AccordionItem borderWidth={"0px"}>
                        <Section delay={index / 5} key={index}>
                        <Box  mt={2} borderRadius={"lg"} borderWidth={"5px"} borderColor={color}>

                            <Flex alignItems={"center"} >
                                <AccordionButton>
                                <Text fontSize={"3xl"} ml={3} fontWeight={"bold"} >{index<9?0:""}{index+1}</Text>
                                <Image borderRadius={"lg"} src={item.album.images[0].url} ml={3} layout={"fill"} height={"60px"}/>
                                <SimpleGrid columns={2} width={"100%"} textAlign={"start"}>
                                    <Text isTruncated fontSize={"xl"} ml={2}  fontWeight={"bold"}>{item.artists[0].name}</Text>
                                    <Text isTruncated fontSize={"xl"} >{item.name}</Text>
                                </SimpleGrid>
                                    <AccordionIcon/>
                                </AccordionButton>
                            </Flex>

                            <AccordionPanel>

                                <Text fontSize={"xl"}>
                                    Track <strong>{item.track_number}</strong> of <strong>{item.album.total_tracks}</strong> on <strong>{item.album.name}</strong>
                                </Text>

                                <Text fontSize={"xl"}>Duration: <strong>{Math.floor((item.duration_ms/1000/60) << 0)}:{(Math.floor((item.duration_ms/1000) % 60))<10?"0"+(Math.floor((item.duration_ms/1000) % 60)):(Math.floor((item.duration_ms/1000) % 60))}</strong></Text>
                                <Link  isExternal href={item.external_urls.spotify}>
                                    <Button bgColor={color} mt={2} rightIcon={<ExternalLinkIcon/>}>
                                        View on Spotify
                                    </Button>
                                </Link>
                            </AccordionPanel>
                        </Box>
                        </Section>
                        </AccordionItem>
                        )
                    )}
                    </Accordion>
                    }
                </Box>

            </Container>

        );
    }
    return (
        <Container mt={2}>
            <Box align="center" borderWidth={"5px"} borderColor={color} borderRadius={"lg"} mb={"2"}>

                <Heading as="h1" mt={10} textAlign="center" size={"4xl"} color={color}>SPIFFY</Heading>
                <Text mt={1} fontSize={"lg"}>Top Songs On Demand</Text>

                <Box alignContent="center" mt={6} mb={"2"}>
                    <ThemeToggleButton/>
                    <Button variant={"ghost"} color={color}  onClick={() => signIn()}>Sign in</Button>
                </Box>
            </Box>

        </Container>

    );
}


