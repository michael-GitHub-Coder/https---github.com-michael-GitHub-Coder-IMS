import React from 'react';
import { useGetMeQuery } from "../slices/usersAPISlice";
import Table from '../Components/Table';
import Table2 from '../Components/table2';
import Table3 from '../Components/Table3';


const TableLayout = () => {
  const { data: me } = useGetMeQuery({});
 console.log("me mee", me);
  return (
    <div>
      {me?.user?.role === "Admin" ? (
        <Table />
      ) : me?.user?.role === "Technician" ?  (
        <Table2 />
      ) : me?.user?.role === "Supervisor" ?  (
        <Table3 />
      ) : null}
    </div>
  );
}

export default TableLayout;
