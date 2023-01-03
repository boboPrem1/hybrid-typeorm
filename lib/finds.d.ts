import { Repository } from "typeorm";
export declare function likeGraphAll(body: any, repository: Repository<any>): Promise<any[]>;
export declare function likeGraphOne(body: any, id: any, repository: Repository<any>): Promise<any>;
