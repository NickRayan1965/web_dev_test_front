import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
export default function UserTable({ onDelete, onEdit, fetchUsers }) {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const setDataImpl = useCallback(
    (data) => {
      // const relleno = Array.from(
      //   { length: totalRecords - data.length },
      //   (_, i) => ({ id: i })
      // );
      const prerelleno = Array.from(
        {
          length: (page - 1) * pageSize,
        },
        (_, i) => ({ id: i })
      );
      const postrelleno = Array.from(
        {
          length: totalRecords - data.length - prerelleno.length
        },
        (_, i) => ({ id: i })
      );
      
      setUsers([...prerelleno,...data, ...postrelleno]);
    },
    [page, pageSize, totalRecords]
  );
  const fetchData = useCallback(async () => {
    if (allUsers.some((item) => item.page === page)) {
      const { data } = allUsers.find((item) => item.page === page);
      setDataImpl(data);
      return;
    }
    try {
      setLoading(true);
      const { data, totalCount } = await fetchUsers({ page, pageSize });
      setTotalRecords(totalCount);
      setAllUsers((prev) => {
        return prev.concat({ page, data });
      });
      setDataImpl(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [allUsers, page, pageSize, setDataImpl, fetchUsers]);
  const onPageChange = async (event) => {
    const { page: pageOfTable, rows: pageSizeOfTable } = event;
    setPage(pageOfTable + 1);
    setPageSize(pageSizeOfTable);
    if (!allUsers.some((item) => item.page === page)) {
      await fetchData();
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, pageSize, fetchData]);
  const resetPages = () => {
    setUsers([]);
    setAllUsers([]);
    setPage(1);
    fetchData();
  };
  const optionsBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <Button
          icon="pi pi-pencil"
          className="p-button-text p-button-sm p-button-success"
          onClick={() => onEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-sm p-button-danger"
          onClick={() => {
            onDelete(rowData.id, resetPages);
          }}
        />
      </div>
    );
  };
  return (
    <DataTable
      totalRecords={totalRecords}
      paginator
      loading={loading}
      first={(page - 1) * pageSize}
      rows={pageSize}
      onPage={onPageChange}
      value={users}
      tableStyle={{ minWidth: '80%' }}
      style={{ fontSize: '11px' }}
    >
      <Column field="id" header="Id"></Column>
      <Column field="name" header="Nombres"></Column>
      <Column field="lastname" header="Apellidos"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="username" header="Nombre de Usuario"></Column>
      <Column body={optionsBodyTemplate} header="Opciones"></Column>
    </DataTable>
  );
}
UserTable.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  fetchUsers: PropTypes.func.isRequired,
};
