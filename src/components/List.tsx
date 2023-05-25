import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import DataService from "../services/DataService";
import { IList } from "../types/interfaces";

const List: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialListState = {
    id: null,
    name: "",
    items: []
  };

  const [currentList, setCurrentList] = useState<IList>(initialListState);
  const [message, setMessage] = useState<string>("");

  const getList = (id: string) => {
    DataService.getList(id)
      .then((response: any) => {
        setCurrentList(response.data.list);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentList({ ...currentList, [name]: value });
  };

  const updateList = () => {
    const data = {
      name: currentList.name
    }

    DataService.updateList(currentList.id, data)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The list was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteList = () => {
    DataService.removeList(currentList.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/lists");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getList(id);
  }, [id]);

  return (
    <div>
      {currentList ? (
        <div className="edit-form">
          <h4>List</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                defaultValue={currentList.name}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteList}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateList}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a list...</p>
        </div>
      )}
    </div>
  );
};

export default List;
