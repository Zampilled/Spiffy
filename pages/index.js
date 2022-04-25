import Head from 'next/head'
import Image from 'next/image'
import {Box, Button, Container, Heading, List, Table, TableContainer,Th, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {useSession, signIn, signOut} from 'next-auth/react';
import {useState} from 'react';

export default function Home() {
    const {data: session} = useSession();
    const [list, setList] = useState([]);

    const getMySongsShort = async () => {

        const res = await fetch('/api/shortsongs');
        const {items} = await res.json();

        setList(items);
    };
    const getMySongsMed = async () => {
        const res = await fetch('/api/medsongs');
        const {items} = await res.json();
        setList(items);
    };
    const getMySongsLong = async () => {
        const res = await fetch('/api/longsongs');
        const {items} = await res.json();
        setList(items);
    };

    if (session) {
        return (
            <Container>
                <Box align="center" borderWidth={"5px"} borderColor={"pink"} borderRadius={"lg"} mb={"2"}>
                    <Heading as="h1" mt={10} textAlign="center" size={"4xl"} color={"pink.300"}>Spotify</Heading>
                    <Box alignContent="center" mt={6} mb={"2"}>
                        <Button variant={"ghost"} color={"pink"} onClick={() => signOut()}>Sign out</Button>
                    </Box>
                </Box>
                <Box align={"center"}>
                    <Button mt={2} mb={2} align={"center"} bgColor={"pink"} onClick={() => getMySongsShort()}>Short</Button>
                    <Button mt={2} mb={2} m={2} align={"center"} bgColor={"pink"} onClick={() => getMySongsMed()}>Med</Button>
                    <Button mt={2} mb={2} align={"center"} bgColor={"pink"} onClick={() => getMySongsLong()}>Long</Button>
                    <TableContainer >
                        <Table variant={"striped"} colorScheme={"pink"}>
                            <Thead>
                                <Th>Rank</Th>
                                <Th>Name</Th>
                                <Th>Artist</Th>
                            </Thead>
                            <Tbody>

                                    {list.map((item, index) =>(
                                        <Tr key={item.id}>
                                            <Td>{index +1}</Td>
                                            <Td>{item.artists[0].name}</Td>


                                            <Td>{item.name}</Td>

                                        </Tr>
                                    ))}

                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

            </Container>

        );
    }
    return (
        <Container>
            <Box align="center">
                <Heading as="h1" mt={10} textAlign="center" size={"4xl"}>Spotify</Heading>
                <Box alignContent="center" mt={6}>
                    <Button onClick={() => signIn()}>Sign in</Button>
                </Box>
            </Box>
        </Container>

    );
}

