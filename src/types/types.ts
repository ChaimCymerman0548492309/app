
export interface Item {
  readonly id: string;            
  name: string;
  description: string;             
  readonly createdAt: string;       
  updatedAt: string;
}


export type CreateItemDTO = {
  name?: string;                   
  description?: string;             
};

export type UpdateItemDTO = Partial<Pick<Item, "name" | "description">>;  


export interface Repository<T> {
  getAll(): Promise<ReadonlyArray<T>>;             
  getById(id: string): Promise<T | null>;
  create(data: CreateItemDTO): Promise<T>;
  update(id: string, data: UpdateItemDTO): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
