import {
  Table,
  Text,
  Button,
  TextInput,
  Input,
  Divider,
  Checkbox,
  Group,
  SimpleGrid,
  NativeSelect,
  Radio,
  UnstyledButton,
  Select,
} from "@mantine/core";
import { useLocation } from "wouter";
import type { SelectOption } from "../types/SearchResult/types";

const Home = () => {
  const queryOptionTexts: string[] = [
    "Any of these words",
    "(And) All of these words",
    "(And) Exact match of these words",
    "(And) None of these words",
  ];

  const sourceOfInformation: string[] = [
    "DPO Portal",
    "DPO HomePage",
    "ITG InfoStation",
    "KICP",
    "ALL",
  ];

  const fileFormats: string[] = [
    "HTML",
    "JSP",
    "ASP",
    "TXT",
    "RTF",
    "PDF",
    "DOC",
    "XLS",
    "PPT",
    "ODT",
    "ODS",
    "ODP",
    "ALL",
  ];

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

  const resultPerPageOptions: SelectOption[] = [
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const sortByOptions: SelectOption[] = [
    { value: "1", label: "Relevancy (descending)" },
    { value: "2", label: "Last Update Date (descending)" },
    { value: "3", label: "Last Update Date (ascending)" },
    { value: "4", label: "Document title (ascending)" },
    { value: "5", label: "Document title (descending)" },
  ];

  const [, setLocation] = useLocation();

  const handleSearch = () => {
    setLocation("/DPO/search");
  };

  return (
    // <Paper bg={"red"} shadow="md">
    <Table bg={"#BBE1E2"} variant="vertical" withRowBorders={false}>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} w={"25%"}>
            <Text size="120%" fw={600}>
              Advanced Search
            </Text>
          </Table.Th>
        </Table.Tr>
        {queryOptionTexts.map((text) => (
          <Table.Tr key={text}>
            <Table.Th bg={"#BBE1E2"} h={40} w={160}>
              <Text size="13px">{text}</Text>
            </Table.Th>
            <Table.Td h={20}>
              <TextInput w="60%" />
            </Table.Td>
          </Table.Tr>
        ))}
        <Table.Tr>
          <Table.Td colSpan={2} w={"100%"}>
            <Divider color="gray" size={"sm"} />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={40} w={160}>
            <Text size="13px">{"Source of Information"}</Text>
          </Table.Th>
          <Table.Td>
            <Checkbox.Group defaultValue={sourceOfInformation}>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xs">
                {sourceOfInformation.map((text) => (
                  <Group key={text} gap="xs" wrap="nowrap">
                    <Checkbox radius="xs" size="xs" value={text} />
                    <Text size="13px" fw={500}>
                      {text}
                    </Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Checkbox.Group>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td colSpan={2} w={"100%"}>
            <Divider color="gray" size={"sm"} />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={40} w={160}>
            <Text size="13px">{"File Format"}</Text>
          </Table.Th>
          <Table.Td>
            <Checkbox.Group defaultValue={fileFormats}>
              <SimpleGrid cols={{ base: 2, sm: 4, md: 7 }} spacing="xs">
                {fileFormats.map((text) => (
                  <Group key={text} gap="xs" wrap="nowrap">
                    <Checkbox radius="xs" size="xs" value={text} />
                    <Text size="13px" fw={500}>
                      {text}
                    </Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Checkbox.Group>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={40} w={160}>
            <Text size="13px">{"Other Formats"}</Text>
          </Table.Th>
          <Table.Td>
            <TextInput w="60%" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td colSpan={2} w={"100%"}>
            <Divider color="gray" size={"sm"} />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={20} w={160}>
            <Text size="13px">{"Last Update Date"}</Text>
          </Table.Th>
          <Table.Td py={0}>
            <Group gap="xs">
              <Text size="13px">From</Text>
              <TextInput w="25%" />
              <Text size="13px">To</Text>
              <TextInput w="25%" />
              <NativeSelect data={searchRangeOptions} />
            </Group>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={20} w={160}>
            <Text size="13px">{"Number of results per page"}</Text>
          </Table.Th>
          <Table.Td py={0}>
            <NativeSelect w={50} data={resultPerPageOptions} />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={20} w={160}>
            <Text size="13px">{"Sorting Order"}</Text>
          </Table.Th>
          <Table.Td py={0}>
            <NativeSelect w={200} data={sortByOptions} />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={20} w={160}>
            <Text size="13px">{"Search also similar word (Synonym)"}</Text>
          </Table.Th>
          <Table.Td py={0}>
            <Radio.Group defaultValue="Y">
              <Group gap="md">
                <Radio value="Y" label="Enable" size="xs" />
                <Radio value="N" label="Disable" size="xs" />
              </Group>
            </Radio.Group>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td colSpan={2} w={"100%"}>
            <Divider color="gray" size={"sm"} />
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th bg={"#BBE1E2"} h={20} w={160}>
            <Group gap={"xs"}>
              <Button type="submit" onClick={() => handleSearch()}>
                Search
              </Button>
              <Button type="button">Reset</Button>
            </Group>
          </Table.Th>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

export default Home;
