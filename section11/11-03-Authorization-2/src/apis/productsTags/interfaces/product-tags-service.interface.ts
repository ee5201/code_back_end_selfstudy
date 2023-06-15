export interface IProductsTagsServiceBulkInsert {
  names: {
    name: string;
  }[];
}
export interface IProductTagsServiceFindBynames {
  tagnames: string[];
}
