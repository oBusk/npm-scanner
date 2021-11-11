import { Box, Code, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import * as pacote from "pacote";
import { ParsedUrlQuery } from "querystring";
import Layout from "^/components/Layout";

interface VirusTotalUploadResponse {
    data: {
        type: string;
        id: string;
    };
}

interface Props {
    error: any;
}

interface Params extends ParsedUrlQuery {
    parts: string | string[];
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
    params: { parts } = {},
}) => {
    if (!parts) {
        throw new Error("No spec specified");
    }

    const spec = Array.isArray(parts) ? parts.join("/") : parts;

    const url = await pacote.resolve(spec);
    try {
        if (process.env.VIRUSTOTAL_API_KEY == null) {
            throw new Error("API key missing");
        }

        const result: VirusTotalUploadResponse = await fetch(
            "https://www.virustotal.com/api/v3/urls",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "x-apikey": process.env.VIRUSTOTAL_API_KEY,
                },
                body: new URLSearchParams({
                    url,
                }),
            },
        ).then((res) => res.json());

        const [, id] = result.data.id.split("-");

        return {
            redirect: {
                permanent: false,
                destination: `https://www.virustotal.com/gui/url/${id}`,
            },
        };
    } catch (error: any) {
        console.error(error);
        return {
            props: {
                error: error.toString(),
            },
        };
    }
};

const PackageScanner: NextPage<Props> = ({ error }) => {
    return (
        <Layout>
            <VStack>
                <Box align="center" justify="center" maxWidth="500px">
                    <h1>Something went wrong...</h1>
                    <Code>{JSON.stringify(error, null, 2)}</Code>
                </Box>
            </VStack>
        </Layout>
    );
};

export default PackageScanner;
