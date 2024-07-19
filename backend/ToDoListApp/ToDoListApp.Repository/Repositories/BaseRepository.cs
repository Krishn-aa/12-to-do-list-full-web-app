using ToDoListApp.Repository.Interfaces;
using ToDoListApp.Repository.Models;
namespace ToDoListApp.Repository.Repositories
{
    public class BaseRepository<T>(AppDbContext context) : IBaseRepository<T> where T : class
    {
        private readonly AppDbContext context = context;

        public List<T> GetAll()
        {
            return context.Set<T>().ToList();
        }

        public T Get(int id)
        {
            return context.Set<T>().Find(id);
        }

        public int Insert(T obj)
        {
            context.Add(obj);
            return context.SaveChanges();
        }

        public int Update(T obj)
        {
            context.Update(obj);
            return context.SaveChanges();
        }
        public int Delete(int id)
        {
            T entity = context.Set<T>().Find(id);
            context.Remove(entity);
            return context.SaveChanges();
        }
    }
}