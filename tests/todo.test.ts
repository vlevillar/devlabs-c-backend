import request from 'supertest';
import app from '../src/index'; // Cambia la ruta para que apunte a index.ts
import sequelize from '../src/database';
import Todo from '../src/models/Todo';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Todos API', () => {
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ title: 'Test Task', userId: 'user12' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Task');
    expect(response.body.userId).toBe('user12');
  });

  it('should retrieve all tasks for a user', async () => {
    await Todo.create({ title: 'Task 1', userId: 'user123' });
    await Todo.create({ title: 'Task 2', userId: 'user123' });
  
    const response = await request(app).get('/api/todos?userId=user123');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  
    expect(response.body[0].title).toBe('Task 1');
    expect(response.body[0].userId).toBe('user123');
    expect(response.body[1].title).toBe('Task 2');
    expect(response.body[1].userId).toBe('user123');
  });
  

  it('should update a task', async () => {
    const todo = await Todo.create({ title: 'Old Task', userId: 'user123' });

    const response = await request(app)
      .put(`/api/todos/${todo.id}`)
      .send({ title: 'Updated Task' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });

  it('should delete a task', async () => {
    const todo = await Todo.create({ title: 'Task to Delete', userId: 'user123' });

    const response = await request(app).delete(`/api/todos/${todo.id}`);
    expect(response.status).toBe(204);

    const deletedTodo = await Todo.findByPk(todo.id);
    expect(deletedTodo).toBeNull();
  });
});
