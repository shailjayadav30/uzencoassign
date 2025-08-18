
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
  
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@mail.com", role: "User" },
  { id: 3, name: "Charlie", email: "charlie@mail.com", role: "Manager" },
  { id: 4, name: "Charlie", email: "charlie@mail.com", role: "Manager" },
  { id: 5, name: "Charlie", email: "charlie@mail.com", role: "Manager" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};
