
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DataTable, type DataTableProps } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const columns: DataTableProps<User>["columns"] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

describe("DataTable", () => {
  it("renders table with data", () => {
    render(<DataTable<User> data={sampleData} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    render(<DataTable<User> data={[]} columns={columns} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<DataTable<User> data={[]} columns={columns} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("calls onRowSelect when row is clicked (single selection)", () => {
    const handleSelect = vi.fn();
    render(
      <DataTable<User>
        data={sampleData}
        columns={columns}
        selectable
        onRowSelect={handleSelect}
      />
    );

    const row = screen.getByText("Alice");
    fireEvent.click(row);

    expect(handleSelect).toHaveBeenCalled();
    expect(handleSelect.mock.calls[0][0]).toEqual([sampleData[0]]);
  });

  it("sorts column when header clicked", () => {
    render(<DataTable<User> data={sampleData} columns={columns} />);

    const ageHeader = screen.getByText("Age");
    fireEvent.click(ageHeader);

    // after sorting ascending: Alice (25) should come before Bob (30)
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Alice");
    expect(rows[2]).toHaveTextContent("Bob");
  });
});
