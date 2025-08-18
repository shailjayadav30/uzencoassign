
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "This is a helper text",
    variant: "outlined",
    size: "md",
  },
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: "This field is required" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithPasswordToggle: Story = {
  args: { type: "password", placeholder: "Enter password" },
};

export const Loading: Story = {
  args: { loading: true },
};









