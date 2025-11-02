import {
  Table,
  Text,
  Button,
  TextInput,
  Input,
  Divider,
  Checkbox,
  Group,
  NativeSelect,
  Radio,
  UnstyledButton,
  Select,
  Stack,
  Box,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import search from "../mock-data/search.json";
import type { SelectOption } from "../types/select-options";
import type { Search } from "../types/api";
import parse, { domToReact, type DOMNode, Element } from "html-react-parser";

const SearchResult = () => {
  const searchResults: Search = search;

  const searchRangeOptions: SelectOption[] = [
    { value: "any", label: "Anytime" },
    { value: "7", label: "Last week" },
    { value: "14", label: "Last 2 weeks" },
    { value: "30", label: "Last 30 days" },
    { value: "60", label: "Last 60 days" },
    { value: "90", label: "Last 90 days" },
    { value: "180", label: "Last 180 days" },
    { value: "1y", label: "Last year" },
    { value: "2y", label: "Last 2 years" },
  ];

  const theme = useMantineTheme();

  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode.type === "tag" && domNode.attribs) {
        if (domNode.name === "font" && domNode.attribs.color === "red") {
          return (
            <Text component="span" fw={700} c={theme.colors.red[9]} inherit>
              {domToReact(domNode.children as DOMNode[], options)}
            </Text>
          );
        }
      }
    },
  };

  console.log(searchResults);

  return (
    <>
      <Group bg={"gray"} justify="space-between">
        <Group gap={"xs"}>
          <TextInput w={350} />
          <Button px={10} w="auto">
            New Search
          </Button>
          <Button px={10} w="auto">
            Search Within Result
          </Button>
          <Button px={10} w="auto">
            Advanced Search
          </Button>
        </Group>
        <Button>Help</Button>
      </Group>
      <Group gap={"xs"} my={10} pl={350}>
        <Group gap="xs" wrap="nowrap">
          <Checkbox radius="xs" size="xs" />
          <Text size="13px" fw={500}>
            {"Exact Match"}
          </Text>
        </Group>
        <NativeSelect data={searchRangeOptions} />
      </Group>
      <Paper radius={0} bg={"#BBE1E2"} p={10}>
        <Box>
          <Text>
            {`Result 1 - ${searchResults.payload.docList.length} of ~${
              searchResults.payload.totalHits
            } for${" "}`}
            <Text component="span" fw={700}>
              {`[query]`}
            </Text>
          </Text>
        </Box>
        {searchResults.payload.docList.map((result, index) => {
          return (
            <Box key={index}>
              <Stack gap={"xs"} py={10} key={index}>
                <Text c={"blue"} td={"underline"}>{`${
                  index + 1
                }. [${result.document_type.toUpperCase()}] ${
                  result.title
                }`}</Text>
                <Text lineClamp={3}>
                  {parse(result.content_summary, options)}
                </Text>
                <Text
                  styles={{ root: { overflowWrap: "break-word" } }}
                  c={"blue"}
                >
                  {result.reference}
                </Text>
              </Stack>
              <Group>
                <Text fw={700} td={"underline"}>
                  Search Similar Page
                </Text>
                <Text>
                  <Text component="span" fw={700}>
                    Date:{" "}
                  </Text>
                  {result.modified_time_string}
                </Text>

                <Text>
                  <Text component="span" fw={700}>
                    Size:{" "}
                  </Text>
                  {(Number(result.document_size) / (1024 * 1024)).toFixed(2)} MB
                </Text>

                <Text>
                  <Text component="span" fw={700}>
                    Source:{" "}
                  </Text>
                  {result.domain_name}
                </Text>
              </Group>
            </Box>
          );
        })}
      </Paper>
    </>
  );
};

export default SearchResult;
