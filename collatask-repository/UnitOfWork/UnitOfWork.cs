using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collatask_repository.UnitOfWork
{
    internal class UOW<T>
    {
        private string LiteDBLocation { get; }
        private string CollectionName { get; }
        private IList<T> ToSave { get; set; } = new List<T>();
        private IList<T> ToModify { get; set; } = new List<T>();
        private IList<Guid> ToRemove { get; set; } = new List<Guid>();

        public UOW(string dbLocation, string collectionName)
        {
            LiteDBLocation = dbLocation;
            CollectionName = collectionName;
        }

        public void Add(T obj) => ToSave.Add(obj);
        public void Modify(T obj) => ToModify.Add(obj);
        public void Remove(Guid id) => ToRemove.Add(id);
        public void Drop()
        {
            using (LiteDatabase _liteDb = new LiteDatabase(LiteDBLocation))
            {
                _liteDb.DropCollection(CollectionName);
            }
        }

        public T Get(Guid id)
        {
            try
            {
                using (LiteDatabase _liteDb = new LiteDatabase(LiteDBLocation))
                {
                    var _collection = _liteDb.GetCollection<T>(CollectionName);
                    return _collection.IncludeAll().FindById(id);
                }
            }
            catch (Exception ex)
            { throw ex; }
        }

        public IList<T> GetAll()
        {
            try
            {
                using (LiteDatabase _liteDb = new LiteDatabase(LiteDBLocation))
                {
                    var _collection = _liteDb.GetCollection<T>(CollectionName);
                    return _collection.IncludeAll().FindAll().ToList();
                }
            }
            catch (Exception ex)
            { throw ex; }
        }

        public async Task Commit()
        {
            try
            {
                // For some odd reasons, current LiteDB version does not support transaction
                using (LiteRepository _liteRepo = new LiteRepository(LiteDBLocation))
                {
                    if (ToSave.Any() || ToModify.Any())
                    {
                        IList<T> _combinedList = ToSave.Concat(ToModify).ToList();
                        _liteRepo.Upsert<T>(_combinedList, CollectionName);
                    }
                    if (ToRemove.Any())
                        _liteRepo.Delete<T>(Query.Where("_id", id => ToRemove.Contains(id)), CollectionName);
                }
                await Task.Run(() =>
                {
                    ToSave.Clear();
                    ToModify.Clear();
                    ToRemove.Clear();
                });
            }
            catch (Exception ex)
            { throw ex; }
        }
    }
}
