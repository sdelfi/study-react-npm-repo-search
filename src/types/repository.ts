export type IRepositoryPackage = {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  links: {
    repository: string;
  };
};

export type IRepository = {
  package: IRepositoryPackage;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
  final: number;
  searchScore: number;
};

export type NpmRepoGetResponse = {
  objects: IRepository[];
  time: string;
  total: number;
};
