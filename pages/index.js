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
    Flex, Spacer, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Link, Tabs
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

    const getMySongsShort = async () => {
        const res = await fetch('/api/shortsongs');
        setList([])
        const {items} = await res.json();

        setList(items);
    };
    const getMySongsMed = async () => {
        const res = await fetch('/api/medsongs');
        setList([])
        const {items}=await res.json();

        setList(items);
    };
    const getMySongsLong = async () => {
        const res = await fetch('/api/longsongs');
        setList([])
        const {items} = await res.json();

        setList(items);
    };
    const color = useColorModeValue('#cc8b86', '#725AC1')
    console.log(list)
    if (session) {
        return (
            <Container align="center">
                <Box align="center" borderWidth={"5px"} borderColor={color} borderRadius={"lg"} mb={"2"}>

                    <Heading as="h1" mt={10} textAlign="center" size={"4xl"} color={color}>Spiffy</Heading>
                    <Box alignContent="center" mt={6} mb={"2"}>
                        <ThemeToggleButton/>
                        <Button variant={"ghost"} color={color} onClick={() => signOut()}>Sign out</Button>
                    </Box>
                </Box>

                <Box align={"center"}>
                    <Button mt={2} mb={2} align={"center"} bgColor={color} onClick={() => getMySongsShort()}>Short</Button>
                    <Button mt={2} mb={2} m={2} align={"center"} bgColor={color} onClick={() => getMySongsMed()}>Med</Button>
                    <Button mt={2} mb={2} align={"center"} bgColor={color} onClick={() => getMySongsLong()}>Long</Button>


                </Box>
                <Box>
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
                </Box>

            </Container>

        );
    }
    return (
        <Container>
            <Box align="center">
                <Heading as="h1" mt={10} textAlign="center" color={color} size={"4xl"}>Spotify</Heading>
                <Box alignContent="center" mt={6}>
                    <Button onClick={() => signIn()}>Sign in</Button>
                </Box>
            </Box>
        </Container>

    );
}


