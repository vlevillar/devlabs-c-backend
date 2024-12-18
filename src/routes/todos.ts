import { Router, Request, Response } from "express";
import Todo from "../models/Todo";

const router = Router();

// @ts-ignore
router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
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

// @ts-ignore
router.post("/", async (req: Request, res: Response) => {
  const { title, userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const todo = await Todo.create({ title, userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

// @ts-ignore
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

// @ts-ignore
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
