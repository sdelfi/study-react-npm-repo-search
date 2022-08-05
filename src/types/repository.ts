export interface IRepositoryPackage {
	name: string;
	scope: string;
	version: string;
	description: string;
	keywords: string[];
	links: {
		repository: string;
	}
}
export interface IRepository {
	package: IRepositoryPackage;
	detail: {
		quality: number;
		popularity: number;
		maintenance: number;
	};
	final: number;
	searchScore: number;
}

export interface NpmRepoGetResponse {
	objects: IRepository[];
	time: string;
	total: number;
}
