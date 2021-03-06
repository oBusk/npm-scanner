import { Box, Flex, FlexProps, Heading, HStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import NextLink from "^/components/theme/NextLink";
import { GithubLink } from "./GithubLink";

const Header: FunctionComponent<FlexProps> = (props) => (
    <Flex
        as="nav"
        align="center"
        padding="1.5rem"
        position="sticky"
        top="0"
        left="0"
        right="0"
        zIndex="2"
        {...props}
    >
        <HStack flex="1 0 0px">
            <GithubLink variant="ghost" />
        </HStack>
        <NextLink href="/">
            <Box
                as="a"
                transition="all 0.2s"
                borderRadius="md"
                _focus={{
                    boxShadow: "outline",
                }}
            >
                <Heading as="h1" fontSize={{ base: "md", sm: "xl", lg: "3xl" }}>
                    npm-scanner 📦🔬
                </Heading>
            </Box>
        </NextLink>
        <Flex flex="1 0 0px" justifyContent="flex-end"></Flex>
    </Flex>
);

export default Header;
