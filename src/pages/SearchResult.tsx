import {
  Text,
  Button,
  TextInput,
  Checkbox,
  Group,
  NativeSelect,
  Stack,
  Box,
  Paper,
  useMantineTheme,
  NavLink,
} from "@mantine/core";
import search from "../mock-data/search.json";
import type { SelectOption } from "../types/select-options";
import type { Search } from "../types/api";
import parse, { domToReact, type DOMNode } from "html-react-parser";

// --- 1. Define types for your new data ---
interface FilterCount {
  [key: string]: number;
}

interface FilterGroup {
  groupBy: string;
  totalHits: number;
  totalGroups: number;
  count: FilterCount;
}

// Your new data
const filterData: FilterGroup[] = [
  {
    groupBy: "document_type",
    totalHits: 7120,
    totalGroups: 7,
    count: {
      pdf: 3270,
      html: 3793,
      docx: 43,
      xlsx: 3,
      xls: 4,
      plain: 4,
      csv: 3,
    },
  },
  {
    groupBy: "domain_name",
    totalHits: 7121,
    totalGroups: 2,
    count: {
      DPO_Homepage: 7120,
      SynonymsDB: 1,
    },
  },
];

// Helper function to format titles
const formatTitle = (title: string) => {
  return title
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

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

  const filterSidebar = (
    <Stack gap={0} style={{ overflow: "hidden" }}>
      {filterData.map((group) => (
        <Paper
          styles={{ root: { border: "2px solid gray", borderRadius: "10px" } }}
          key={group.groupBy}
        >
          <NavLink
            bg="#BBE1E2"
            label={formatTitle(group.groupBy)}
            fw={700}
            styles={{
              root: { borderRadius: "10px" },
            }}
          />

          {Object.entries(group.count).map(([key, value]) => (
            <NavLink
              key={key}
              label={key}
              styles={{
                label: { fontSize: "13px" },
                root: { borderRadius: "10px" },
              }}
              rightSection={<Text>({value})</Text>}
            />
          ))}
        </Paper>
      ))}
    </Stack>
  );

  const mainContent = (
    <Stack>
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

      <Group gap={"xs"} my={10}>
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
            // Use a stable key like result.url if available
            <Box key={index}>
              <Stack gap={"xs"} py={10}>
                <Text c={"blue"} td={"underline"}>{`${
                  index + 1
                }. [${result.document_type.toUpperCase()}] ${
                  result.title
                }`}</Text>

                <Text lineClamp={3} style={{ overflowWrap: "break-word" }}>
                  {parse(result.content_summary, options)}
                </Text>

                <Text style={{ overflowWrap: "break-word" }} c={"blue"}>
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
    </Stack>
  );

  return (
    <Group align="flex-start" wrap="nowrap" p="md">
      <Box w={300}>{filterSidebar}</Box>

      <Box style={{ flex: 1, minWidth: 0 }}>{mainContent}</Box>
    </Group>
  );
};

export default SearchResult;
