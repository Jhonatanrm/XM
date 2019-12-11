export interface IMetadata {
  pagination: any;
  sortedBy: any;
}

export class Metadata implements IMetadata {
  pagination: {
      currentPage,
      limit,
      nextOffset,
      offset,
      pageCount,
      previousOffset,
      totalCount
    };
  sortedBy: {
    field,
    order
    };




}
