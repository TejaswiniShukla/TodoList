import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { createTodo, updateTodo } from "./services/apiServices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
function ModalComp({ open, handleClose, getAllTodosFunc, editingTodo }) {

  const handleAdd = async (values) => {
    try {
      if (editingTodo) {
        const data = {
          ...editingTodo,
          title: values?.title,
          description: values?.description,
          completed: false,
        };
        await updateTodo(editingTodo?._id, data);
        getAllTodosFunc();
      } else {
        const data = {
          title: values?.title,
          description: values?.description,
          completed: false,
        };
        const res = await createTodo(data);
        if (res?.message === "todo created successfully") {
          getAllTodosFunc();
        }
      }
      handleClose();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: editingTodo?.title || "",
      description: editingTodo?.description || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    },
  });
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2">
          Add New Todo
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            sx={{ marginBottom: "16px" }}
            id="title"
            name="title"
            label="Title"
            value={ formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            sx={{ width: "100%", marginBottom: "16px" }}
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#5B7CE7FF" }}
          >
            {editingTodo ? "Update" : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalComp;
