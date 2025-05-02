"use client";
import { useEffect, useState } from "react";

export default function BasicPagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [maxTodos, setMaxTodos] = useState(10);

  useEffect(() => {
    console.log("effect run", currentPage);
    fetch(`/api/todos?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetch("/api/todos?maxCount=1")
      .then((res) => res.json())
      .then((data) => setMaxTodos(parseInt(data.maxCount)))
      .catch((e) => console.log(e));
  });

  return (
    <div className="flex justify-center">
      <table className="w-full border table-fixed border-collapse">
        <caption>A summary of the UK's most famous punk bands</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[25%]">
              Title
            </th>
            <th scope="col" className="w-[50%]">
              Description
            </th>
            <th scope="col" className="w-[50%]">
              Done?
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((todo) => (
            <tr key={todo.id}>
              <th scope="row">{todo.title}</th>
              <td>{todo.description}</td>
              <td>{!!todo.done}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total Todos</th>
            <td>?</td>
            <td className="flex gap-3">
              <div>Page: </div>
              {[...Array(maxTodos / itemsPerPage).keys()].map((e) => {
                return (
                  <button
                    key={e}
                    className={
                      "text-black cursor-pointer " +
                      (currentPage === e + 1 ? "font-extrabold underline" : "")
                    }
                    onClick={() => {
                      setCurrentPage(e + 1);
                    }}
                  >
                    {e + 1}
                  </button>
                );
              })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
