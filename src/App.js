import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      console.log(response.data);
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      setRooms([...rooms, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      const newRoom = rooms.filter((room) => room.id !== id);
      setRooms([...newRoom]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <center>
          <Routes>
            <Route
              path="/room/:roomSlug"
              element={<ChatRoom rooms={rooms} />}
            />
            <Route
              exact
              path="/"
              element={
                <ChatRoomsList
                  rooms={rooms}
                  createRoom={createRoom}
                  deleteRoom={deleteRoom}
                />
              }
            />
          </Routes>
        </center>
      </div>
    </div>
  );
};

export default App;
