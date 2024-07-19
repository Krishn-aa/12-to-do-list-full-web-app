namespace ToDoListApp.Repository.Interfaces
{
    public interface IBaseRepository<T> where T : class 
    {
        List<T> GetAll();
        T Get(int id);
        int Insert(T obj);
        int Update(T obj);
        int Delete(int id);
    }
}