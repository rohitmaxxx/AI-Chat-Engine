import { Model } from 'sequelize';

const getPagingData = (rows: Model[], count: number, page: number, limit: number) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);

  return {
    totalItems: count,
    records: rows,
    totalPages,
    currentPage,
  };
};

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export default {
  getPagingData,
  getPagination,
};
