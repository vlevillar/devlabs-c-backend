import { Router, Request, Response } from "express";
import { z } from "zod";
import Todo from "../models/Todo";

const taskSchema = z.object({
  title: z.string().min(1, { message: "Task title is required" }).max(100, { message: "Task title cannot exceed 100 characters" }),
  userId: z.string().min(1, { message: "User ID is required" }), 
});

const router = Router();

// Ruta GET 
//@ts-ignore
router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  
  const result = taskSchema.safeParse({ userId });
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors[0].message });
  }
  
  try {
    const todos = await Todo.findAll({
      where: { userId },
      order: [["id", "ASC"]],
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
});

//@ts-ignore
router.post("/", async (req: Request, res: Response) => {
  const { title, userId } = req.body;
  
  const result = taskSchema.safeParse({ title, userId });
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors[0].message });
  }
  
  try {
    const todo = await Todo.create({ title, userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

//@ts-ignore
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }
    todo.title = title ?? todo.title;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

//@ts-ignore
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }
    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

export default router;
