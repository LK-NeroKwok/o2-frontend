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
import search from "../mock-data/search.json";
import type { SelectOption } from "../types/SearchResult/types";

const SearchResult = () => {
  console.log(search);

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

  return (
    <>
      <Group bg={"gray"} justify="space-between">
        <TextInput w={350} />
        <Button>Help</Button>
      </Group>
      <Group gap={"xs"} mt={10}>
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
      <Group gap={"xs"} mt={10}>
        <NativeSelect />
      </Group>
    </>
  );
};

export default SearchResult;
