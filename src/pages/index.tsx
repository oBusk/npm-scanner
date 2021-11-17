import { Button, HStack, Input } from "@chakra-ui/react";
import Head from "next/head";
import { FormEvent } from "react";
import Layout from "^/components/Layout";

export default function Home() {
    const onSubmit = (event: FormEvent): void => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            search: HTMLInputElement;
        };

        window.open(`/${encodeURIComponent(target.search.value)}`, "_blank");
    };

    return (
        <>
            <Head>
                <title>npm scanner</title>
            </Head>
            <Layout>
                <HStack
                    as="form"
                    onSubmit={onSubmit}
                    align="center"
                    justify="center"
                >
                    <Input
                        name="search"
                        maxWidth="320px"
                        placeholder="E.g. react@^16"
                    />
                    <Button type="submit">scan 🔬</Button>
                </HStack>
            </Layout>
        </>
    );
}
