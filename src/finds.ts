import {Repository} from "typeorm";
import {BadRequestException} from "@nestjs/common";

async function findOne(r: Repository<any>, id: any) {
  return await r.findOne({
    where: {
      id: id,
    },
  });
}

async function find(r: Repository<any>) {
  return await r.find();
}

export async function likeGraphAll(body: any, repository: Repository<any>) {
  if (body) {
    let bruts = await find(repository);
    if (body.select) {
      const filterKeys = [...body.select];
      let brutKeys = Object.keys(bruts[0]);
      const netKeys = brutKeys.filter((key) => filterKeys.includes(key));
      let data :any[] = [];
      bruts.forEach((brut) => {
        data.push(
          netKeys.reduce((accumulator: any, key) => {
            accumulator[key] = brut[key];
            return accumulator;
          }, {})
        );
      });
      if (Object.keys(data[0]).length) {
        return data;
      } else {
        return bruts;
      }
    } else {
      return bruts;
    }
  } else {
    return await repository.find();
  }
}

export async function likeGraphOne(
  body: any,
  id: any,
  repository: Repository<any>
) {
  if (body) {
    let brut = await findOne(repository, id);
    if (body.select) {
      const filterKeys = [...body.select];
      let brutKeys = Object.keys(brut);
      const netKeys = brutKeys.filter((key) => filterKeys.includes(key));
      const data = netKeys.reduce((accumulator: any, key) => {
        accumulator[key] = brut[key];
        return accumulator;
      }, {});
      if (Object.keys(data).length) {
        return data;
      } else {
        return brut;
      }
    } else {
      return brut;
    }
  } else {
    return await repository.findOne({
      where: {
        id: id,
      },
    });
  }
}
