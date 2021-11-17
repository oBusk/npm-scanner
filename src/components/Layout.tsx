import { Stack, StackProps } from "@chakra-ui/react";
import Head from "next/head";
import { FunctionComponent } from "react";
import Footer from "./Footer";
import Header from "./Header";

export interface LayoutProps extends StackProps {
    title?: string;
}

const PADDING = "1em";

const Layout: FunctionComponent<LayoutProps> = ({
    children,
    title = "",
    ...props
}) => {
    return (
        <>
            <Head>
                <title>
                    {title ? `${title} • ` : ""}npm-scanner.vercel.app 📦🔬
                </title>
            </Head>
            <Stack
                minHeight="100vh"
                justifyContent="space-between"
                padding={PADDING}
                {...props}
            >
                <Header margin={`-${PADDING} -${PADDING} 0`} />
                {children}
                <Footer margin={`-${PADDING}`} />
            </Stack>
        </>
    );
};

export default Layout;
