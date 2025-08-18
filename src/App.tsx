// import  { useState } from "react";
// import { InputField} from "./components/InputField/InputField";
// import { DataTable, type Column } from "./components/DataTable/DataTable";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// const columns: Column<User>[] = [
//   { key: "name", title: "Name", dataIndex: "name", sortable: true },
//   { key: "email", title: "Email", dataIndex: "email", sortable: true },
//   { key: "role", title: "Role", dataIndex: "role", sortable: true },
// ];

// const data: User[] = [
//   { id: 1, name: "Alice", email: "alice@mail.com", role: "Admin" },
//   { id: 2, name: "Bob", email: "bob@mail.com", role: "User" },
//   { id: 3, name: "Charlie", email: "charlie@mail.com", role: "Manager" },
// ];

// export default function App() {
//   const [value, setValue] = useState("");


//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">UI Components Demo</h1>

//       <InputField
//         label="Username"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Enter your username"
//         clearable
//       />
//      <h1 className="text-2xl font-bold mb-4">📊 User Data Table</h1>
//       <DataTable<User>
//         data={data}
//         columns={columns}
//         selectable
//         onRowSelect={(rows) => console.log("Selected Rows:", rows)}
//       />
//     </div>
//   );
// }
