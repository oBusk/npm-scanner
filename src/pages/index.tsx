import { Button, HStack, Input } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { FormEvent, useState } from "react";
import Layout from "^/components/Layout";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = (event: FormEvent): void => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            search: HTMLInputElement;
        };

        setIsLoading(true);
        router.push({
            pathname: `/${target.search.value}`,
        });
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
                    <Button isLoading={isLoading} type="submit">
                        scan 🔬
                    </Button>
                </HStack>
            </Layout>
        </>
    );
}
