import { useForm } from "react-hook-form";
import { useTasks } from "../Context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [apiErrors, setApiErrors] = useState([]);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    try {
      if (params.id) {
        await updateTask(params.id, dataValid);
      } else {
        await createTask(dataValid);
      }
      navigate("/tasks");
    } catch (error) {
      // Manejo de errores de la API
      if (error.response && error.response.data) {
        setApiErrors(error.response.data.errors || ["Ocurrió un error al guardar la tarea"]);
      } else {
        setApiErrors(["Error desconocido"]);
      }
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-ss-md">
      {/* Mostrar errores de la API */}
      {apiErrors.length > 0 && (
        <div className="bg-red-500 p-2 text-white text-center my-2">
          {apiErrors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "El título es requerido" })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500">{errors.title.message}</p>
        )}

        <label htmlFor="description">Descripcion</label>
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: "La descripción es requerida" })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          {...register("date", { required: "La fecha es requerida" })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.date && (
          <p className="text-red-500">{errors.date.message}</p>
        )}

        <button className="bg-indigo-500 px-2 py-2 rounded-md">Guardar</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
