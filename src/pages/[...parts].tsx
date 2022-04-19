import { Box, Code, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import * as pacote from "pacote";
import { ParsedUrlQuery } from "querystring";
import Layout from "^/components/Layout";

const VIRUSTOTAL_API_URL = "https://www.virustotal.com/api/v3";
const RETRY_INTERVAL = 1500;

function analyseUrl(url: string): Promise<VirusTotalUploadResponse> {
    if (process.env.VIRUSTOTAL_API_KEY === undefined) {
        throw new Error("VIRUSTOTAL_API_KEY is not defined");
    }
    return fetch(`${VIRUSTOTAL_API_URL}/urls`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
        body: new URLSearchParams({
            url,
        }),
    }).then((res) => res.json());
}

function getAnalysis(id: string): Promise<any> {
    if (process.env.VIRUSTOTAL_API_KEY === undefined) {
        throw new Error("VIRUSTOTAL_API_KEY is not defined");
    }
    return fetch(`${VIRUSTOTAL_API_URL}/urls/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
    }).then((res) => res.json());
}

interface VirusTotalUploadResponse {
    data: {
        type: "analysis";
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
    res,
}) => {
    if (!parts) {
        throw new Error("No spec specified");
    }

    const spec = Array.isArray(parts) ? parts.join("/") : parts;

    console.log(`Fetching ${spec}`);

    const url = await pacote.resolve(spec);

    try {
        const analysis = await analyseUrl(url);

        const [, id] = analysis.data.id.split("-");

        let maxAttempts = 10;
        let analysisResult: any = await getAnalysis(id);

        while (
            !analysisResult?.data?.attributes?.last_http_response_content_sha256
        ) {
            if (--maxAttempts === 0) {
                throw new Error("Max attempts reached");
            }

            console.log(`Waiting for analysis to complete`, { maxAttempts });

            await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));

            analysisResult = await getAnalysis(id);
        }
        const fileHash =
            analysisResult?.data?.attributes?.last_http_response_content_sha256;

        const minute = 60;
        const hour = 60 * minute;
        const day = 24 * hour;

        res.setHeader(
            "cache-control",
            ["public", `max-age=${30 * minute}`, `s-maxage=${1 * day}`].join(
                ", ",
            ),
        );

        return {
            redirect: {
                permanent: false,
                destination: `https://www.virustotal.com/gui/file/${fileHash}`,
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
                <Box textAlign="center" maxWidth="500px">
                    <h1>Something went wrong...</h1>
                    <Code>{JSON.stringify(error, null, 2)}</Code>
                </Box>
            </VStack>
        </Layout>
    );
};

export default PackageScanner;
