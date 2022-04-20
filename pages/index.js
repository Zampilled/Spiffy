import Head from 'next/head'
import Image from 'next/image'
import {Box, Button, Container, Heading, List, Table, TableContainer,Th, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {useSession, signIn, signOut} from 'next-auth/react';
import {useState} from 'react';

export default function Home() {
    const {data: session} = useSession();
    const [list, setList] = useState([]);

    const getMySongs = async () => {
        const res = await fetch('/api/songs');
        const {items} = await res.json();
        setList(items);
    };
    console.log(list)
    if (session) {
        return (
            <Container>
                <Box align="center">
                    <Heading as="h1" mt={10} textAlign="center" size={"4xl"}>Spotify</Heading>
                    <Box alignContent="center" mt={6}>
                        <Button onClick={() => signOut()}>Sign out</Button>
                    </Box>
                </Box>
                <Box>
                    <Button onClick={() => getMySongs()}>Get Songs</Button>
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

