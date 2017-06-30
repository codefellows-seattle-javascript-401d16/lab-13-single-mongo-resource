module.exports = (Resource, CustomError = Error, { sortOptions, pageLength }) => {
  return {
    create(resource) {
      return new Resource(resource)
        .save()
        .catch(err => {
          throw new CustomError(err);
        });
    },

    read(id) {
      return Resource.findById(id)
        .catch(err => {
          throw new CustomError(err);
        });
    },

    update(id, resource) {
      return Resource.findByIdAndUpdate(id, resource, { new: true })
        .catch(err => {
          throw new CustomError(err);
        });
    },

    destroy(id) {
      return Resource.findByIdAndRemove(id)
        .catch(err => {
          throw new CustomError(err);
        });
    },

    getPage(pageNumber) {
      return Resource.find({})
        .sort(sortOptions)
        .skip(Number(pageNumber) > 0 ? pageNumber - 1 : 0)
        .limit(pageLength)
        .catch(err => {
          throw new CustomError(err);
        });
    },

  };
};
