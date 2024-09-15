import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ModalComp from "./Modal";
import { deleteTodo, getAllTodos } from "./services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodos, setTodos } from "./store/reducer";

export default function App() {
  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const dispatch = useDispatch();
  const todolist = useSelector((state) => state.todos.items
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEditingTodo(null); 
    setOpen(false);
  };
  const getAllTodosFunc = async () => {
    try {
      const allTodos = await getAllTodos();
      console.log("Fetched todos:", allTodos);
      dispatch(setTodos(allTodos));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    getAllTodosFunc();
  }, []);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setOpen(true);

  };
  const handleDelete = async (todo) => {
    try {
      const response = await deleteTodo(todo);
      if (response?.data?.message === "Todo deleted successfully") {
        dispatch(deleteTodos(todo)); 
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: "linear-gradient(#fff, #5B7CE7FF)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "700px",
            minHeight: "70vh",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <Grid container sx={{ display: "flex", flexDirection: "column" }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                To-Do List
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                  backgroundColor: "#5B7CE7FF",
                }}
                onClick={handleOpen}
              >
                Add Todo
              </Button>
            </Grid>
            <Divider sx={{ height: "0.1px", backgroundColor: "grey" }} />
            {todolist?.map((todo) => {
              return (
                <Grid
                  key={todo?._id}
                  item
                  xs={12}
                  sx={{
                    background: "linear-gradient(#fff, #A2B6F9FF)",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography  sx={{fontSize:'20px',fontWeight:600}}>{todo?.title}</Typography>
                    <Typography variant="subtitle2">
                      {todo?.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <DeleteForeverIcon
                      onClick={() => handleDelete(todo?._id)}
                    />
                    <EditNoteIcon
                      onClick={() => handleEdit(todo)}
                      sx={{ fontSize: "30px" }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <ModalComp
        open={open}
        handleClose={handleClose}
        getAllTodosFunc={getAllTodosFunc} 
        editingTodo={editingTodo}
      />
    </>
  );
}
